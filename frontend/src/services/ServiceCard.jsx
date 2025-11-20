import React, { useState } from 'react';
import './service-card.css';
import { Spinner, Modal, ModalHeader, ModalBody } from 'reactstrap';

// This reads the API key you set in your .env.local file
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// 1. MAP TREK NAMES TO CENTRAL BASE CAMP COORDINATES
const trekCoordinates = {
  "DAYARA BUGYAL TREK": { 
    name: "Dayara Bugyal Base (Raithal)", 
    lat: 30.7303, 
    lon: 78.4357 
  },
  "HARUNTA BUGYAL AND NACHIKETA TAL TREK": { 
    name: "Nachiketa Tal/Harunta Region", 
    lat: 30.7634, 
    lon: 78.5027 
  },
  "DODITAL AND DARWA TOP TREK": { 
    name: "Dodital Base Camp", 
    lat: 30.8258, 
    lon: 78.4550 
  },
  // Include your generic weather check coordinates as a fallback
  "CALCULATE WEATHER": { 
    name: "Current Location", 
    isGeo: true // Flag to use browser geolocation
  }
};


// NEW: Helper function to format UNIX timestamps to readable time (e.g., 6:30 AM)
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ServiceCard = ({ item }) => {
  // Normalize title to uppercase to match the lookup table
  const normalizedTitle = item.title.toUpperCase(); 

  const { imgUrl, title, desc } = item;
  const [loading, setLoading] = useState(false);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLocation, setWeatherLocation] = useState('');

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleWeatherClick = () => {
    if (!API_KEY) {
      alert("Weather API key is not configured. Please add it to your .env.local file.");
      return;
    }

    setLoading(true);

    const trekInfo = trekCoordinates[normalizedTitle];
    
    // Function to fetch weather using specific lat/lon
    const fetchWeather = async (lat, lon, locationName) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Could not fetch weather data. Check your API key or coordinates.");
        
        const data = await res.json();
        
        setWeatherData(data);
        setWeatherLocation(locationName);
        setModalOpen(true);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (trekInfo && trekInfo.isGeo) {
      // Logic for generic "Calculate Weather" button (uses browser location)
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        setLoading(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude, "Your Current Location");
        },
        (err) => {
          alert("Unable to retrieve your location. Please allow location access.");
          setLoading(false);
        }
      );
    } else if (trekInfo && trekInfo.lat) {
      // Logic for TREK-SPECIFIC weather check
      fetchWeather(trekInfo.lat, trekInfo.lon, `${title} Base Camp`);
    } else {
      // Fallback for non-weather cards
      setLoading(false);
    }
  };

  const handleClick = () => {
    // Check if the card title exists in our lookup table (either a trek or the generic button)
    if (trekCoordinates[normalizedTitle]) {
      handleWeatherClick();
    }
  };

  return (
    <>
      <div 
        className='service__item' 
        onClick={handleClick}
        data-action={trekCoordinates[normalizedTitle] ? "weather" : ""}
      >
        {loading ? (
          <div className="service__loader">
            <Spinner color="warning" />
            <p>Fetching weather...</p>
          </div>
        ) : (
          <>
            <div className='service__img'>
              <img src={imgUrl} alt={title} />
            </div>
            <h5>{title}</h5>
            <p>{desc}</p>
          </>
        )}
      </div>

      {/* === EXPANDED MODERN WEATHER MODAL === */}
      <Modal isOpen={modalOpen} toggle={toggleModal} centered className="weather-modal">
        {weatherData && (
          <>
            <ModalHeader toggle={toggleModal} className="weather-modal-header">
              Weather for {weatherLocation || weatherData.name}
            </ModalHeader>
            <ModalBody className="weather-modal-body">
              
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt="weather icon"
                className="weather-icon"
              />
              
              <div className="weather-main-info">
                <div className="weather-temp">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="weather-desc">
                  {weatherData.weather[0].description}
                </div>
              </div>

              {/* === NEW: All weather details === */}
              <div className="weather-details-grid">
                
                <div className="weather-detail-item">
                  <span>Feels Like</span>
                  <strong>{Math.round(weatherData.main.feels_like)}°C</strong>
                </div>

                <div className="weather-detail-item">
                  <span>Humidity</span>
                  <strong>{weatherData.main.humidity}%</strong>
                </div>

                <div className="weather-detail-item">
                  <span>Wind Speed</span>
                  <strong>{weatherData.wind.speed} m/s</strong>
                </div>

                <div className="weather-detail-item">
                  <span>Temp Min/Max</span>
                  <strong>
                    {Math.round(weatherData.main.temp_min)}° / {Math.round(weatherData.main.temp_max)}°
                  </strong>
                </div>

                <div className="weather-detail-item">
                  <span>Sunrise</span>
                  <strong>{formatTime(weatherData.sys.sunrise)}</strong>
                </div>

                <div className="weather-detail-item">
                  <span>Sunset</span>
                  <strong>{formatTime(weatherData.sys.sunset)}</strong>
                </div>

              </div>
            </ModalBody>
          </>
        )}
      </Modal>
    </>
  );
}

export default ServiceCard;