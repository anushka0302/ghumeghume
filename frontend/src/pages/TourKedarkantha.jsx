import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/tourDayaraBugyal.css"; 
import "../styles/tour-details.css";
import Booking from "../components/Booking/Booking";
import ComparisonFeature from "../components/ComparisonFeature/ComparisonFeature";
import { Helmet } from 'react-helmet-async'; 

// ✅ Import centralized data
import trek from "../assets/data/trek";

// ⚠️ REPLACE THESE WITH YOUR KEDARKANTHA IMAGES LATER
import k1 from "../assets/images/kedar_g1.webp"; 
import k2 from "../assets/images/kedar_g2.webp";
import k3 from "../assets/images/kedar_g3.webp";
import k4 from "../assets/images/kedar_g4.webp";
import k5 from "../assets/images/kedar_g5.webp";
import k6 from "../assets/images/kedar_g6.webp";
import k7 from "../assets/images/kedar_g7.webp";
import k8 from "../assets/images/kedar_g8.webp";
import k9 from "../assets/images/kedar_g9.webp";
import k10 from "../assets/images/kedar_g10.webp";
import k11 from "../assets/images/kedar_g11.webp";
import k12 from "../assets/images/kedar_g12.webp";
import k13 from "../assets/images/kedar_g13.webp";
import k14 from "../assets/images/kedar_g14.webp";
import k15 from "../assets/images/kedar_g15.webp";
import k16 from "../assets/images/kedar_g16.webp";
import k17 from "../assets/images/kedar_g17.webp";
import k18 from "../assets/images/kedar_g18.webp";
import k19 from "../assets/images/kedar_g19.webp";
import k20 from "../assets/images/kedar_g20.webp";
import k21 from "../assets/images/kedar_g21.webp";
import k22 from "../assets/images/kedar_g22.webp";
import k23 from "../assets/images/kedar_g23.webp";
import k24 from "../assets/images/kedar_g24.webp";

const TourKedarkantha = () => {
  const [isGroupPricing, setIsGroupPricing] = useState(true);

  // ✅ GET DATA: Find Kedarkantha (ID 4)
  const tourData = trek.find((t) => t.id === 1) || trek[0];

  const currentPrice = isGroupPricing ? tourData.priceGroup : tourData.priceSolo;
  const discountAmount = tourData.priceSolo - tourData.priceGroup;
  const avgRating = 0; 

  const handleBookScroll = () => {
    const bookingSection = document.getElementById("booking-form");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const galleryImages = [k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12, k13, k14, k15, k16, k17, k18, k19, k20, k21, k22, k23, k24];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#kedarkantha-gallery",
      children: ".gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <>
      <Helmet>
        <title>{tourData.title} | Queen of Winter Treks</title>
        <meta name="description" content={tourData.desc} />
        <meta property="og:title" content={`${tourData.title} - Book Now`} />
        <meta property="og:image" content={k1} />
      </Helmet>

      {/* ✅ HERO */}
      <section
        className="tour-hero parallax-bg"
        style={{
          background: `url(${k1}) center/cover no-repeat`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="tour-hero-overlay"></div>
        <div className="tour-hero-content">
          <h1>{tourData.title}</h1>
          <p>{tourData.days} • Easy–Moderate • {tourData.city}</p>

          <div className="hero-action-wrap">
            
            {/* ✅ PRICING TOGGLE BUTTONS */}
            <div style={{ 
              marginBottom: "20px", 
              display: "flex", 
              justifyContent: "center", 
              gap: "15px",
              alignItems: "center"
            }}>
              {/* Group Option */}
              <label style={{ 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                background: isGroupPricing ? "#faa935" : "rgba(255,255,255,0.2)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "50px",
                border: "2px solid #faa935",
                fontWeight: "bold",
                transition: "all 0.3s",
                fontSize: "0.95rem",
                boxShadow: isGroupPricing ? "0 0 15px rgba(250, 169, 53, 0.5)" : "none"
              }}>
                <input 
                  type="radio" 
                  name="pricing_hero" 
                  checked={isGroupPricing} 
                  onChange={() => setIsGroupPricing(true)}
                  style={{ accentColor: "#fff", width: "16px", height: "16px" }}
                />
                Group (3 or more)
                <span style={{ fontSize: "0.7em", background: "#ef4444", color: "white", padding: "2px 6px", borderRadius: "4px", marginLeft: "6px", textTransform: "uppercase", letterSpacing: "0.5px"}}>Sale</span>
              </label>

              {/* Solo Option */}
              <label style={{ 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                background: !isGroupPricing ? "#faa935" : "rgba(255,255,255,0.2)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "50px",
                border: "2px solid #faa935",
                fontWeight: "bold",
                transition: "all 0.3s",
                fontSize: "0.95rem"
              }}>
                <input 
                  type="radio" 
                  name="pricing_hero" 
                  checked={!isGroupPricing} 
                  onChange={() => setIsGroupPricing(false)}
                  style={{ accentColor: "#fff", width: "16px", height: "16px" }}
                />
                Solo / Duo 1–2 People
              </label>
            </div>

            <div className="price-box" style={{ marginBottom: "20px" }}>
              {isGroupPricing ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ textDecoration: "line-through", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
                    ₹{tourData.priceSolo}
                  </span>
                  <h3 style={{ fontSize: "2.5rem", margin: "0", color: "#fff" }}>
                    ₹{tourData.priceGroup}
                  </h3>
                  <span style={{ background: "rgba(34, 197, 94, 0.2)", border: "1px solid rgba(34, 197, 94, 0.5)", color: "#4ade80", padding: "4px 10px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "600" }}>
                    You Save ₹{discountAmount} per person
                  </span>
                </div>
              ) : (
                <h3 style={{ fontSize: "2.5rem", margin: "0" }}>₹{tourData.priceSolo}</h3>
              )}
            </div>

            <button className="book-btn-hero" onClick={handleBookScroll}>
              Book & Pay Now
            </button>
          </div>

          <div className="stats-pill">
            <div className="stat-item">
              <span className="stat-label">Altitude</span>
              <span className="stat-value">12,500 ft</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Best Season</span>
              <span className="stat-value">Dec – Apr</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Difficulty</span>
              <span className="stat-value">Easy–Moderate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ CONTENT */}
      <section className="section-light">
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour-content">
                <h2 className="section-title">Why Kedarkantha Trek?</h2>
                
                <div style={{ marginBottom: "25px" }}>
                  <ComparisonFeature imageSrc={k1} />
                </div>

                <p className="section-desc">{tourData.desc}</p>
                
                <ul className="checklist">
                  <li>Queen of Winter Treks: Famous for its snowy summit climb.</li>
                  <li>360° Summit Views: Spot Swargarohini, Bandarpoonch, and Black Peak.</li>
                  <li>Juda Ka Talab: A frozen high-altitude lake with mythological significance.</li>
                  <li>Beginner Friendly: Perfect introduction to Himalayan trekking.</li>
                  <li>Stargazing: Clear night skies perfect for telescopes.</li>
                </ul>
              </div>

              <div className="tour-content">
                <h2 className="section-title text-center">Photo Gallery</h2>
                <div id="kedarkantha-gallery" className="gallery-grid">
                  {galleryImages.map((img, i) => (
                    <a href={img} data-pswp-width="1500" data-pswp-height="1000" className="gallery-item" key={i}>
                      <img src={img} alt="Kedarkantha Trek" loading="lazy" />
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            <Col lg="4">
              <div id="booking-form">
                <Booking tour={{ ...tourData, price: currentPrice }} avgRating={avgRating} tourId="kedarkantha-trek" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ✅ ITINERARY */}
      <section className="section-dark itinerary">
        <Container>
          <h2 className="section-title">Detailed Itinerary</h2>
          <div className="timeline">
            <div className="timeline-item">
              <h4>Day 1: Reach Sankri Village (6,400 ft)</h4>
              <p>
                Journey begins from Dehradun to Sankri (approx 8-9 hrs drive). Witness the glory of Swargrohini peak. 
                Stay in luxurious wooden cottages, enjoy local cuisine, and listen to mountain stories.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 2: Sankri to Juda ka Talab (9,100 ft)</h4>
              <p>
                <strong>Trek: 4 km | 4-5 hrs.</strong><br/>
                Walk through dense pine and oak forests. The trail is a mix of gentle and steep ascents. 
                Arrive at Juda Ka Talab, a stunning lake that freezes in winter. Overnight camping under the stars.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 3: Juda ka Talab to Base Camp (11,250 ft)</h4>
              <p>
                <strong>Trek: 4 km | 3-4 hrs.</strong><br/>
                Trek through forests opening into wide clearings with views of snow-capped peaks (Swargrohini, Bandarpoonch). 
                Reach the base camp by afternoon. Evening acclimatization activities and early dinner for the big summit day.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 4: Summit Push & Back to Hargaon (12,500 ft)</h4>
              <p>
                <strong>Trek: 12 km | 7-8 hrs.</strong><br/>
                Start at 3 AM to catch the sunrise from the summit. Witness 360° views of 13 Himalayan peaks glowing in the sun. 
                Visit the Shiva temple at the top. Descend back to Base Camp for lunch, then proceed to Hargaon campsite.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 5: Hargaon to Sankri & Depart</h4>
              <p>
                <strong>Trek: 4 km | 2-3 hrs.</strong><br/>
                Descend through well-marked stone paths with views of Har Ki Dun valley. Reach Sankri by afternoon. 
                Drive back to Dehradun (reach by late evening/night). Trip ends with beautiful memories.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ CTA */}
      <section className="cta-section">
        <Container className="text-center">
          <h2>Ready for the Summit?</h2>
          <p>Snow • Summit Views • Adventure</p>
          <button className="book-btn-hero" onClick={handleBookScroll}>
            Pay Now ₹{currentPrice}
          </button>
        </Container>
      </section>
    </>
  );
};

export default TourKedarkantha;