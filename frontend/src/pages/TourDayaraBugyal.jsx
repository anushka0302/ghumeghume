import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/tourDayaraBugyal.css";
import "../styles/tour-details.css"; 
import Booking from "../components/Booking/Booking";
// ✅ Correct import path based on your folder structure
import ComparisonFeature from "../components/ComparisonFeature/ComparisonFeature";

// ✅ Import centralized data
import trek from "../assets/data/trek";

import dayara_g1 from "../assets/images/dayara_g1.jpg";
import dayara_g2 from "../assets/images/dayara_g2.jpg";
import dayara_g3 from "../assets/images/dayara_g3.jpeg";
import dayara_g4 from "../assets/images/dayara_g4.png";
import dayara_g5 from "../assets/images/dayara_g5.jpg";
import dayara_g6 from "../assets/images/dayara_g6.jpg";
import dayara_g7 from "../assets/images/dayara_g7.jpg";
import dayara_g8 from "../assets/images/dayara_g8.jpg";
import dayara_g9 from "../assets/images/dayara_g9.jpg";
import dayara_g10 from "../assets/images/dayara_g10.jpg";

const TourDayaraBugyal = () => {
  // ✅ STATE: Pricing Toggle (Default: Group)
  const [isGroupPricing, setIsGroupPricing] = useState(true);

  // ✅ GET DATA: Find Dayara Bugyal (ID 1) from the centralized file
  // If ID 1 isn't found, fallback to the first item to prevent crash
  const tourData = trek.find(t => t.id === 1) || trek[0];

  // ✅ CALCULATION: Determine active price based on toggle
  const currentPrice = isGroupPricing ? tourData.priceGroup : tourData.priceSolo;
  const discountAmount = tourData.priceSolo - tourData.priceGroup;

  const avgRating = 0; 

  const handleBookScroll = () => {
    document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" });
  };

  const galleryImages = [
    dayara_g1, dayara_g2, dayara_g3, dayara_g4, dayara_g5,
    dayara_g6, dayara_g7, dayara_g8, dayara_g9, dayara_g10,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#dayara-gallery",
      children: ".gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <>
      {/* ✅ HERO */}
      <section className="tour-hero parallax-bg">
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
                Group (5+)
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
                Solo / Duo
              </label>
            </div>

            {/* ✅ DYNAMIC PRICE DISPLAY */}
            <div className="price-box" style={{ marginBottom: "20px" }}>
              {isGroupPricing ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ textDecoration: "line-through", color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginBottom: "-5px" }}>
                    ₹{tourData.priceSolo}
                  </span>
                  <h3 style={{ fontSize: "2.5rem", margin: "0", color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
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

          <div className="stats-row">
            <div><strong>Altitude</strong><br />12,000 ft</div>
            <div><strong>Best Season</strong><br />Dec – May</div>
            <div><strong>Difficulty</strong><br />Easy–Moderate</div>
          </div>
        </div>
      </section>

      {/* ✅ Two-column layout */}
      <section className="section-light">
        <Container>
          <Row>
            {/* === Main Content Column === */}
            <Col lg="8">
              {/* ✅ WHY THIS TREK */}
              <div className="tour-content"> 
                <h2 className="section-title">Why Dayara Bugyal?</h2>
                
                {/* ✅ COMPARISON FEATURE */}
                <div style={{ marginBottom: "25px" }}>
                  <ComparisonFeature imageSrc={dayara_g1} />
                </div>

                <p className="section-desc">
                  {tourData.desc}
                </p>
                <ul className="checklist">
                  <li>One of the most scenic meadows of Uttarakhand</li>
                  <li>Ideal for beginners and first snow experience</li>
                  <li>Views of Bandarpoonch & Gangotri range</li>
                  <li>Safe winter trek with beautiful campsites</li>
                  <li>Easy travel access from Dehradun/Rishikesh</li>
                </ul>
              </div>

              {/* ✅ PHOTO GALLERY */}
              <div className="tour-content"> 
                <h2 className="section-title text-center">Photo Gallery</h2>
                <p className="gallery-tagline">Click to view fullscreen • Zoom enabled</p>
                <div id="dayara-gallery" className="gallery-grid">
                  {galleryImages.map((img, i) => (
                    <a
                      href={img}
                      data-pswp-width="1500"
                      data-pswp-height="1000"
                      className="gallery-item"
                      key={i}
                    >
                      <img src={img} alt="Dayara Bugyal" />
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            {/* === Booking Form Column === */}
            <Col lg="4">
              <div id="booking-form"> 
                {/* Pass updated data with CURRENT effective price to booking */}
                <Booking 
                  tour={{ ...tourData, price: currentPrice }} 
                  avgRating={avgRating} 
                  tourId="dayara-bugyal" 
                />
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
              <h4>Day 1: Dehradun → Raithal</h4>
              <p>
                Early morning departure from Dehradun for a scenic drive via Mussoorie, Uttarkashi and Bhagirathi valley.
                Reach Raithal by afternoon and check into homestay/guesthouse. Enjoy sunset views, trek briefing and
                acclimatization walk. Overnight stay in Raithal.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 2: Raithal → Gui (Guhi)</h4>
              <p>
                After breakfast, start trekking towards Gui through oak and rhododendron forests (5 km, 3–4 hrs). Reach
                campsite by afternoon, enjoy peaceful surroundings and stunning sunset. Overnight camping at Gui.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 3: Gui → Dayara Bugyal → Back to Gui</h4>
              <p>
                Early morning trek towards Dayara Bugyal (6 km, ascent 3–4 hrs). Explore the massive alpine meadows with
                panoramic views of Bandarpoonch and Garhwal peaks. Packed lunch and leisure time on the Bugyal. Return to
                Gui by evening for bonfire and group activities. Overnight stay in tents.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 4: Gui → Raithal → Uttarkashi</h4>
              <p>
                Trek downhill to Raithal (5 km, 2–3 hrs). Drive to Uttarkashi (33 km, ~2 hrs). Enjoy water sports like
                rafting or kayaking (optional), and visit local attractions like Vishwanath temple, NIM and market area.
                Overnight stay in Uttarkashi.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 5: Uttarkashi → Dehradun</h4>
              <p>
                After breakfast, depart for Dehradun (6–7 hrs). Reach by evening and trip ends with beautiful memories of
                Dayara Bugyal.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ TREK HIGHLIGHTS */}
      <section className="highlights-section">
        <Container>
          <h2 className="section-title text-center">Trek Highlights</h2>
          <ul className="highlight-list">
            <li><strong>Raithal:</strong> Cultural village stay with valley views</li>
            <li><strong>Gui:</strong> Calm forest campsite for meditation & group fun</li>
            <li><strong>Dayara Bugyal:</strong> Giant alpine meadows & Bandarpoonch views</li>
            <li><strong>Uttarkashi:</strong> Water sports + spiritual & mountaineering spots</li>
            <li>Perfect beginner-friendly Himalayan trek</li>
          </ul>
        </Container>
      </section>
      
      {/* ✅ CTA */}
      <section className="cta-section">
        <Container className="text-center">
          <h2>Ready to book your trek?</h2>
          <p>Snowy meadows • Beginner friendly • Easy travel access</p>
          <button className="book-btn-hero" onClick={handleBookScroll}>
            Pay Now ₹{currentPrice}
          </button>
        </Container>
      </section>
    </>
  );
};

export default TourDayaraBugyal;