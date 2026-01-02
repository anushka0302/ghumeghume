import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/tourDayaraBugyal.css"; 
import Booking from "../components/Booking/Booking";
import { Helmet } from 'react-helmet-async';
import kumaonHero from "../assets/images/Adobe-Nainital.webp"; 

// ✅ Import Gallery Images (Using Dayara placeholders as per previous pattern, replace with Kumaon images)
import k1 from "../assets/images/kum1.webp";
import k2 from "../assets/images/kum2.webp";
import k3 from "../assets/images/kum3.webp";
import k4 from "../assets/images/kum4.webp";
import k5 from "../assets/images/kum5.webp";
import k6 from "../assets/images/kum6.webp";
import k7 from "../assets/images/kum7.webp";
import k8 from "../assets/images/kum8.webp";
import k9 from "../assets/images/kum9.webp";

const TourKumaon1 = () => {
  const [isGroupPricing, setIsGroupPricing] = useState(true);

  const tourData = {
    id: 5,
    title: "Kumaon Darshan",
    days: "2 days / 1 night",
    difficulty: "Spiritual",
    city: "Kathgodam, Uttarakhand",
    priceGroup: 8500,
    priceSolo: 10500,
    altitude: "7,119 ft",
    bestSeason: "Oct – June",
    desc: "A premium spiritual recovery circuit covering Kainchi Dham, Jageshwar Dham, and Kasar Devi with 5-star comfort."
  };

  const currentPrice = isGroupPricing ? tourData.priceGroup : tourData.priceSolo;
  const discountAmount = tourData.priceSolo - tourData.priceGroup;

  const galleryImages = [k1, k2, k3, k4, k5, k6, k7, k8, k9];

  useEffect(() => {
    window.scrollTo(0, 0);
    // ✅ Initialize Photo Gallery
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#kumaon-gallery",
      children: ".gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  const handleBookScroll = () => {
    document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>{tourData.title} | Luxury Spiritual Retreat</title>
        <meta name="description" content={tourData.desc} />
      </Helmet>

      {/* ✅ HERO SECTION */}
      <section
        className="tour-hero parallax-bg"
        style={{
          background: `url(${kumaonHero}) center/cover no-repeat`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="tour-hero-overlay"></div>
        
        <div className="tour-hero-content">
          <h1>{tourData.title.toUpperCase()}</h1>
          <p>{tourData.days} • {tourData.difficulty} • {tourData.city}</p>

          <div className="hero-action-wrap">
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "15px", alignItems: "center" }}>
              <label style={{ 
                cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                background: isGroupPricing ? "#faa935" : "rgba(255,255,255,0.2)",
                color: "white", padding: "10px 20px", borderRadius: "50px",
                border: "2px solid #faa935", fontWeight: "bold", transition: "all 0.3s", fontSize: "0.95rem",
                boxShadow: isGroupPricing ? "0 0 15px rgba(250, 169, 53, 0.5)" : "none"
              }}>
                <input type="radio" name="pricing_hero" checked={isGroupPricing} onChange={() => setIsGroupPricing(true)} style={{ accentColor: "#fff", width: "16px", height: "16px" }} />
                Group (3 or more)
                <span style={{ fontSize: "0.7em", background: "#ef4444", color: "white", padding: "2px 6px", borderRadius: "4px", marginLeft: "6px", textTransform: "uppercase" }}>Sale</span>
              </label>

              <label style={{ 
                cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                background: !isGroupPricing ? "#faa935" : "rgba(255,255,255,0.2)",
                color: "white", padding: "10px 20px", borderRadius: "50px",
                border: "2px solid #faa935", fontWeight: "bold", transition: "all 0.3s", fontSize: "0.95rem"
              }}>
                <input type="radio" name="pricing_hero" checked={!isGroupPricing} onChange={() => setIsGroupPricing(false)} style={{ accentColor: "#fff", width: "16px", height: "16px" }} />
                Solo / Duo 1–2 People
              </label>
            </div>

            <div className="price-box">
              {isGroupPricing ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ textDecoration: "line-through", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
                    ₹{tourData.priceSolo}
                  </span>
                  <h3 style={{ fontSize: "2.5rem", margin: "0", color: "#fff" }}>
                    ₹{tourData.priceGroup}
                  </h3>
                  <span style={{ background: "rgba(34, 197, 94, 0.2)", border: "1px solid rgba(34, 197, 94, 0.5)", color: "#4ade80", padding: "4px 10px", borderRadius: "20px", fontSize: "0.85rem", marginTop: "8px", fontWeight: "600" }}>
                    You Save ₹{discountAmount} per person
                  </span>
                </div>
              ) : (
                <h3 style={{ fontSize: "2.5rem", margin: "0" }}>₹{tourData.priceSolo}</h3>
              )}
              <span style={{ marginTop: "10px", display: "block", fontSize: "0.9rem", opacity: 0.9 }}>Per Person • Limited Batch Size</span>
            </div>

            <button className="book-btn-hero" onClick={handleBookScroll}>
              Book & Pay Now
            </button>
          </div>

          <div className="stats-pill">
            <div className="stat-item">
              <span className="stat-label">Altitude</span>
              <span className="stat-value">{tourData.altitude}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Best Season</span>
              <span className="stat-value">{tourData.bestSeason}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Difficulty</span>
              <span className="stat-value">{tourData.difficulty}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ WHY KUMAON DARSHAN SECTION */}
      <section className="section-light" style={{padding: '60px 0'}}>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour-content">
                <h2 className="section-title">Why Kumaon Darshan?</h2>
                <p className="section-desc">{tourData.desc}</p>
                
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px', marginBottom: '40px'}}>
                    <div style={{background: '#fff9f0', padding: '30px', borderRadius: '15px', textAlign: 'center', border: '1px solid #fee2b3'}}>
                        <i className="ri-hotel-star-line" style={{fontSize: '2.5rem', color: '#faa935'}}></i>
                        <h6 style={{fontWeight: '700', marginTop: '15px'}}>5-Star Luxury</h6>
                        <p style={{fontSize: '0.9rem', color: '#666'}}>Stay at the finest properties in Jageshwar/Almora.</p>
                    </div>
                    <div style={{background: '#fff9f0', padding: '30px', borderRadius: '15px', textAlign: 'center', border: '1px solid #fee2b3'}}>
                        <i className="ri-restaurant-line" style={{fontSize: '2.5rem', color: '#faa935'}}></i>
                        <h6 style={{fontWeight: '700', marginTop: '15px'}}>Gourmet Meals</h6>
                        <p style={{fontSize: '0.9rem', color: '#666'}}>Daily healthy & delicious breakfast included.</p>
                    </div>
                    <div style={{background: '#fff9f0', padding: '30px', borderRadius: '15px', textAlign: 'center', border: '1px solid #fee2b3'}}>
                        <i className="ri-roadster-line" style={{fontSize: '2.5rem', color: '#faa935'}}></i>
                        <h6 style={{fontWeight: '700', marginTop: '15px'}}>Luxury SUV</h6>
                        <p style={{fontSize: '0.9rem', color: '#666'}}>Comfortable private transport for the whole circuit.</p>
                    </div>
                </div>

                {/* ✅ PHOTO GALLERY SECTION */}
                <h2 className="section-title text-center mt-5">Photo Gallery</h2>
                <p className="gallery-tagline text-center">Click to view fullscreen • Zoom enabled</p>
                <div id="kumaon-gallery" className="gallery-grid">
                  {galleryImages.map((img, i) => (
                    <a href={img} data-pswp-width="1500" data-pswp-height="1000" className="gallery-item" key={i}>
                      <img src={img} alt="Kumaon Darshan" loading="lazy" />
                    </a>
                  ))}
                </div>
              </div>
            </Col>
            
            <Col lg="4">
              <div id="booking-form">
                <Booking tour={{ ...tourData, price: currentPrice }} avgRating={5} tourId="kumaon-darshan" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ✅ DETAILED ITINERARY SECTION */}
      <section className="section-dark itinerary">
        <Container>
          <h2 className="section-title">Detailed Itinerary</h2>
          <div className="timeline">
            <div className="timeline-item">
              <h4>Day 1: Arrival & Spiritual Awakening</h4>
              <p>
                Pick up from Kathgodam and drive to <strong>Kainchi Dham</strong>. Take morning bath then Darshan and arti (Neem Karoli Baba Ashram). Soak in the spiritual energy before heading to <strong>Kasar Devi</strong> for meditation and sunset Himalayan views. Overnight stay in 5-star comfort near Almora/Jageshwar.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 2: Heritage Darshan & Nature Trek</h4>
              <p>
                Early morning <strong>Himalayan Sunrise Darshan</strong>. Visit the 8th-century <strong>Jageshwar Dham</strong> temple complex and early morning Shiv Arti. Visit <strong>Mukteshwar Temple</strong> where you can also buy fresh apples from local farms. Conclude with a scenic mini-trek to <strong>Bhalugad Waterfall</strong> before returning to Kathgodam railways or Bus Stand by evening.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ PACKAGE INCLUSIONS SECTION */}
      <section className="highlights-section">
        <Container>
          <h2 className="section-title text-center">Package Inclusions</h2>
          <ul className="highlight-list">
            <li><strong>Stay:</strong> 1 Night in a 5-Star Luxury Resort/Property.</li>
            <li><strong>Transport:</strong> Kathgodam to Kathgodam via Private Luxury SUV.</li>
            <li><strong>Meals:</strong> Daily Gourmet Breakfast included.</li>
            <li><strong>Activities:</strong> Guided Darshan at Kainchi & Jageshwar + Waterfall Trek.</li>
            <li><strong>Expertise:</strong> Experienced Spiritual Guide & Driver.</li>
          </ul>
        </Container>
      </section>
    </>
  );
};

export default TourKumaon1;