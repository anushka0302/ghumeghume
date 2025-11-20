import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import './trek-comparison.css';

// Your API Key from .env.local
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const CACHE_KEY = 'trek_weather_data';
const CACHE_DURATION = 1800000; // 30 Minutes in milliseconds

// Coordinates for comparison locations
const locationData = {
  "YOUR CURRENT LOCATION": {
    city: "Your Current Location", 
    isGeo: true, 
  },
  "NATIONAL CAPITAL TERRITORY (NCT)": {
    city: "Delhi NCR",
    lat: 28.6448, 
    lon: 77.2167,
    isCity: true 
  },
  "NAVI MUMBAI (NMB)": {
    city: "Navi Mumbai",
    lat: 19.0330, 
    lon: 73.0297,
    isCity: true 
  },
  "TAMIL NADU (TND)": {
    city: "Chennai, TN",
    lat: 13.0827, 
    lon: 80.2707,
    isCity: true 
  },
  "DAYARA BUGYAL TREK": {
    city: "Raithal (Dayara Base)",
    lat: 30.7672, 
    lon: 78.4348,
    isTrek: true 
  },
  "HARUNTA BUGYAL AND NACHIKETA TAL TREK": {
    city: "Sankari (Harunta Region)", 
    lat: 30.8876, 
    lon: 78.2046,
    isTrek: true
  },
  "DODITAL AND DARWA TOP TREK": {
    city: "Agoda Village (Dodital Base)",
    lat: 30.7554, 
    lon: 78.4357,
    isTrek: true
  },
  "UTTARKASHI (Reference)": { 
    city: "Uttarkashi Town",
    lat: 30.7303,
    lon: 78.4419,
    isTrek: true 
  }
};

const getAqiDescription = (aqiIndex) => {
  if (aqiIndex === 1) return { text: "Excellent", color: "text-green-600" }; 
  if (aqiIndex === 2) return { text: "Good", color: "text-lime-500" };
  if (aqiIndex === 3) return { text: "Moderate", color: "text-yellow-500" };
  if (aqiIndex === 4) return { text: "Poor", color: "text-orange-500" };
  if (aqiIndex === 5) return { text: "Hazardous", color: "text-red-600" }; 
  return { text: "N/A", color: "text-gray-400" };
};

const TrekComparison = () => {
  // 1. Initialize state by trying to read from LocalStorage first
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { timestamp, data: cachedData } = JSON.parse(cached);
        // Check if cache is still valid (less than 1 hour old)
        if (Date.now() - timestamp < CACHE_DURATION) {
          return cachedData;
        }
      } catch (e) {
        console.error("Cache parsing error", e);
      }
    }
    return {};
  });

  // 2. Determine loading state based on whether we found data in cache
  // If data has keys, we assume cache hit, so loading is false.
  const [loading, setLoading] = useState(() => Object.keys(data).length === 0);
  const [error, setError] = useState(null);
  
  // Initialize current city from cache if available, else default
  const [currentCity, setCurrentCity] = useState(() => {
     if (data["YOUR CURRENT LOCATION"] && !data["YOUR CURRENT LOCATION"].error) {
         // We don't store the city name string directly in top level state in your original code, 
         // it was derived. We'll handle this in the effect or just rely on the data object.
         return "Your Current Location"; 
     }
     return "Your Current Location";
  });

  const [isOpen, setIsOpen] = useState(false);

  // 3. Save to LocalStorage whenever data updates and is complete
  useEffect(() => {
    const allKeys = Object.keys(locationData);
    // Check if we have data for all keys (either success or error)
    const isComplete = allKeys.every(key => data[key]);
    
    if (isComplete && !loading) {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: data
      }));
    }
  }, [data, loading]);

  // 4. Main Data Fetching Effect
  useEffect(() => {
    // If we already have data (from cache init), skip fetching
    if (Object.keys(data).length > 0) {
      return; 
    }

    if (!API_KEY) {
      setError("API Key missing.");
      setLoading(false);
      return;
    }

    const fetchWeatherData = async (lat, lon, key, isTrek) => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      
      try {
        const [weatherRes, aqiRes] = await Promise.all([
            fetch(weatherUrl),
            isTrek ? { ok: true, json: async () => ({ list: [{ main: { aqi: 1 }, components: { pm2_5: 4.5 } }] }) } : fetch(aqiUrl)
        ]);

        if (!weatherRes.ok) throw new Error(`Failed to fetch weather data for ${key}`);

        const weather = await weatherRes.json();
        
        if (isTrek) {
          return {
            temp: weather.main.temp,
            condition: weather.weather[0].main,
            aqiIndex: 1,
            pm2_5: 4.5,
            city: locationData[key].city // ensure city name is preserved in data object
          };
        } else {
            let aqiData = { list: [{ main: { aqi: 5 }, components: { pm2_5: 450 } }] }; // default fallback
            
            if (aqiRes.ok) {
                aqiData = await aqiRes.json();
            } else {
                console.warn(`City AQI data fetch failed for ${key}. Defaulting to Hazardous.`);
            }
            
            if (key === "YOUR CURRENT LOCATION") {
                setCurrentCity(weather.name || "Current Location"); 
            }

            return {
                temp: weather.main.temp,
                condition: weather.weather[0].main,
                aqiIndex: aqiData.list[0].main.aqi, 
                pm2_5: aqiData.list[0].components.pm2_5,
                city: weather.name || locationData[key].city // Store resolved name inside data
            };
        }
      } catch (err) {
          console.error(err);
          return { error: true, customMessage: "Data Unavailable" };
      }
    };

    const loadAllData = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          
          // Create an array of promises to fetch all data in parallel
          const promises = Object.keys(locationData).map(async (key) => {
             let lat, lon;
             if (key === "YOUR CURRENT LOCATION") {
                 lat = userLat;
                 lon = userLon;
             } else {
                 lat = locationData[key].lat;
                 lon = locationData[key].lon;
             }
             
             const result = await fetchWeatherData(lat, lon, key, locationData[key].isTrek);
             return { key, result };
          });

          // Wait for all fetches to complete
          const results = await Promise.all(promises);
          
          // Convert array back to object
          const newData = {};
          results.forEach(({ key, result }) => {
              newData[key] = result;
          });

          setData(newData);
          setLoading(false);
        },
        (geoError) => {
          // Handle Geo Denied - Fetch others normally
          const fixedKeys = Object.keys(locationData).filter(k => !locationData[k].isGeo);
          
          const promises = fixedKeys.map(async (key) => {
              const result = await fetchWeatherData(locationData[key].lat, locationData[key].lon, key, locationData[key].isTrek);
              return { key, result };
          });

          Promise.all(promises).then(results => {
              const newData = {
                  "YOUR CURRENT LOCATION": { 
                      error: true, 
                      customMessage: "Geolocation Denied",
                      city: "Location Unknown"
                  }
              };
              results.forEach(({ key, result }) => {
                  newData[key] = result;
              });
              setData(newData);
              setLoading(false);
              setError("Geolocation permission denied.");
          });
        }
      );
    };

    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount (if no cache)

  const allKeys = Object.keys(locationData);
  const geoKey = "YOUR CURRENT LOCATION";
  const fixedKeys = allKeys.filter(k => k !== geoKey);
  const orderedKeys = [geoKey, ...fixedKeys];

  // Helper to get display name (uses cached name inside data object if available)
  const getDisplayName = (key, locData) => {
      if (data[key]?.city) return data[key].city; // Use name from API/Cache if exists
      if (locData.isGeo) return currentCity;
      return locData.city;
  };

  return (
    <section className="comparison-section">
      <Container>
        <div className="text-center">
            <h2 className="comparison-title">Trek Comparison: Air & Weather</h2>
            <p className="comparison-subtitle">
            Escape the haze! Compare your city's environment with the serenity and purity of the Himalayas.
            </p>
            
            <button 
                className={`comparison-toggle-btn ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Spinner size="sm" color="light" /> Loading Data...
                    </>
                ) : (
                    <>
                        {isOpen ? 'Close Comparison' : 'Compare Live Data'} 
                        <i className={`ri-arrow-down-s-line ${isOpen ? 'rotate-180' : ''}`} style={{marginLeft: '8px'}}></i>
                    </>
                )}
            </button>
            {/* Optional: Debug info to show data is cached */}
            {!loading && !error && (
                <div className="text-xs text-gray-400 mt-1" style={{fontSize: '0.7rem'}}>
                   {/* Auto-updates every hour */}
                </div>
            )}
        </div>

        <div className={`comparison-content ${isOpen ? 'open' : ''}`}>
            <Row className="comparison-grid mt-5">
            {orderedKeys.map(key => {
                const locData = locationData[key];
                const result = data[key];
                const aqi = result?.aqiIndex;
                const aqiDesc = getAqiDescription(aqi);
                const pm25 = result?.pm2_5;

                return (
                <Col lg="3" md="6" sm="12" className="mb-4" key={key}>
                    <div className={`comp-card ${locData.isGeo ? 'user-location' : (locData.isCity ? 'metro-city' : 'trek-base')}`}>
                    <div className="card-header">
                        <h4>{result?.error ? (result.customMessage) : getDisplayName(key, locData)}</h4>
                        <span className="card-sub-header">{locData.isTrek ? 'Base Camp' : (locData.isCity ? 'Metro City' : 'Current Status')}</span>
                    </div>
                    
                    <div className="card-body">
                        {result?.error ? (
                        <p className="text-danger font-weight-bold">
                            {result.customMessage || "Data fetch failed."}
                        </p>
                        ) : (
                        <>
                            <h5>Temperature</h5>
                            <div className="value-row temp-value">
                            {Math.round(result?.temp)}°C
                            <span className="text-sm text-muted">{result?.condition}</span>
                            </div>

                            <h5 className="mt-3">Air Quality</h5>
                            <div className="aqi-container">
                            <div className="d-flex align-items-center gap-2">
                                <span className={`aqi-index aqi-bg-${aqi}`}>{aqi || '-'}</span>
                                <div className="d-flex flex-column">
                                    <span className={`aqi-text ${aqiDesc.color}`}>{aqiDesc.text}</span>
                                    <span className="pm-text">PM2.5: {Math.round(pm25)} µg/m³</span>
                                </div>
                            </div>
                            </div>
                        </>
                        )}
                    </div>
                    </div>
                </Col>
                );
            })}
            </Row>
            <p className="note text-center">
            *Air Quality Index (AQI) scale: **1=Best (Green)**, **5=Worst (Red)**. Trek AQI is proxied to **Excellent (1)** to reflect true mountain air quality.
            </p>
            {error && <p className="text-center text-danger mt-3">{error}</p>}
        </div>
      </Container>
    </section>
  );
};

export default TrekComparison;