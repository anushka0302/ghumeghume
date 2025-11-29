import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/tourDayaraBugyal.css"; 
import "../styles/tour-details.css";
import Booking from "../components/Booking/Booking";
// ✅ Import ComparisonFeature
import ComparisonFeature from "../components/ComparisonFeature/ComparisonFeature";
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

// ✅ Import centralized data
import trek from "../assets/data/trek";

import dodital_1 from "../assets/images/dodital_1.jpg";
import dodital_2 from "../assets/images/dodital_2.jpg";
import dodital_3 from "../assets/images/dodital_3.jpg";
import dodital_4 from "../assets/images/dodital_4.jpg";
import dodital_5 from "../assets/images/dodital_5.jpg";
import dodital_6 from "../assets/images/dodital_6.jpg";
import dodital_7 from "../assets/images/dodital_7.jpg";
import dodital_8 from "../assets/images/dodital_8.jpg";

const TourDoditalDarwa = () => {
  // ✅ STATE: Pricing Toggle (Default: Group)
  const [isGroupPricing, setIsGroupPricing] = useState(true);

  // ✅ GET DATA: Find Dodital (Assuming ID 3 - Update if different in your trek.js)
  const tourData = trek.find((t) => t.id === 3) || trek[2] || trek[0];

  // ✅ CALCULATION: Determine active price based on toggle
  const currentPrice = isGroupPricing ? tourData.priceGroup : tourData.priceSolo;
  const discountAmount = tourData.priceSolo - tourData.priceGroup;

  const avgRating = 0; 

  const handleBookScroll = () => {
    const bookingSection = document.getElementById("booking-form");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const galleryImages = [
    dodital_1, dodital_2, dodital_3, dodital_4,
    dodital_5, dodital_6, dodital_7, dodital_8,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#dodital-gallery",
      children: ".gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>{tourData.title} | Lake Trek Uttarakhand</title>
        <meta name="description" content={tourData.desc} />
        <meta property="og:title" content={`${tourData.title} - Book Now`} />
        <meta property="og:description" content="Trek to the emerald Dodital Lake, believed to be Lord Ganesha's birthplace. A divine and scenic journey." />
        <meta property="og:image" content={dodital_1} />
      </Helmet>

      {/* ✅ HERO */}
      <section
        className="tour-hero parallax-bg"
        style={{
          background: `url(${dodital_1}) center/cover no-repeat`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="tour-hero-overlay"></div>
        <div className="tour-hero-content">
          <h1>{tourData.title}</h1>
          <p>{tourData.days} • Easy–Moderate • {tourData.city}</p>

          <div className="hero-action-wrap">
            {/* ✅ PRICING TOGGLE BUTTONS */}
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                alignItems: "center",
              }}
            >
              {/* Group Option */}
              <label
                style={{
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
                  boxShadow: isGroupPricing
                    ? "0 0 15px rgba(250, 169, 53, 0.5)"
                    : "none",
                }}
              >
                <input
                  type="radio"
                  name="pricing_hero"
                  checked={isGroupPricing}
                  onChange={() => setIsGroupPricing(true)}
                  style={{ accentColor: "#fff", width: "16px", height: "16px" }}
                />
                Group (6+)
                <span
                  style={{
                    fontSize: "0.7em",
                    background: "#ef4444",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    marginLeft: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Sale
                </span>
              </label>

              {/* Solo Option */}
              <label
                style={{
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
                  fontSize: "0.95rem",
                }}
              >
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
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "1.1rem",
                      marginBottom: "-5px",
                    }}
                  >
                    ₹{tourData.priceSolo}
                  </span>
                  <h3
                    style={{
                      fontSize: "2.5rem",
                      margin: "0",
                      color: "#fff",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    ₹{tourData.priceGroup}
                  </h3>
                  <span
                    style={{
                      background: "rgba(34, 197, 94, 0.2)",
                      border: "1px solid rgba(34, 197, 94, 0.5)",
                      color: "#4ade80",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      marginTop: "8px",
                      fontWeight: "600",
                    }}
                  >
                    You Save ₹{discountAmount} per person
                  </span>
                </div>
              ) : (
                <h3 style={{ fontSize: "2.5rem", margin: "0" }}>₹{tourData.priceSolo}</h3>
              )}
              <span style={{ marginTop: "10px", display: "block", fontSize: "0.9rem", opacity: 0.9 }}>
                Per Person • Limited Batch Size
              </span>
            </div>

            <button className="book-btn-hero" onClick={handleBookScroll}>
              Book & Pay Now
            </button>
          </div>

          <div className="stats-row">
            <div>
              <strong>Altitude</strong>
              <br />13,615 ft
            </div>
            <div>
              <strong>Best Season</strong>
              <br />Nov – Mar & Apr – Jun
            </div>
            <div>
              <strong>Difficulty</strong>
              <br />Easy–Moderate
            </div>
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
                <h2 className="section-title">Why Dodital – Darwa Pass?</h2>
                
                {/* ✅ COMPARISON FEATURE */}
                <div style={{ marginBottom: "25px" }}>
                  <ComparisonFeature imageSrc={dodital_1} />
                </div>

                <p className="section-desc">
                  {tourData.desc}
                </p>
                <ul className="checklist">
                  <li>Frozen Dodital Lake in winter</li>
                  <li>Darwa Pass viewpoint with massive snow peaks</li>
                  <li>Beginner friendly + great for first snow experience</li>
                  <li>Pine, Oak and Deodar forest trails</li>
                  <li>Night camping beside the lake – amazing star views</li>
                </ul>
              </div>

              {/* ✅ PHOTO GALLERY */}
              <div className="tour-content"> 
                <h2 className="section-title text-center">Photo Gallery</h2>
                <p className="gallery-tagline">Click to view fullscreen • Zoom enabled</p>
                <div id="dodital-gallery" className="gallery-grid">
                  {galleryImages.map((img, i) => (
                    <a
                      href={img}
                      data-pswp-width="1500"
                      data-pswp-height="1000"
                      className="gallery-item"
                      key={i}
                    >
                      {/* ✅ Lazy Loading Added */}
                      <img src={img} alt="Dodital Darwa Pass" loading="lazy" />
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
                  tourId="dodital-darwa" 
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
              <h4>Day 1: Dehradun → Agoda Village</h4>
              <p>
                Morning departure from Dehradun and drive towards Agoda Village. Reach by afternoon and check
                into homestay/guesthouse. Evening orientation walk, acclimatization and village exploration.
                Overnight stay in Agoda.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 2: Agoda → Manjhi</h4>
              <p>
                Enjoy breakfast and trek briefing before starting the hike to Manjhi (10 km, 5–6 hrs). The trail 
                takes you through dense forest and riverside paths with a chance to spot Himalayan birds.
                Packed lunch on the way. Reach Manjhi campsite by afternoon and relax. Overnight camping.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 3: Manjhi → Dodital</h4>
              <p>
                Start early and trek towards Dodital Lake (6 km, 3 hrs, moderate ascent). Explore the pristine
                lake, temple and surrounding snow-covered hills. Hot lunch at lakeside campsite. Optional hike
                to Ganesh Temple or Darwa Top (weather/time permitting). Overnight stay at Dodital.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 4: Dodital → Manjhi</h4>
              <p>
                Morning visit to the lake for sunrise views or meditation. Trek back to Manjhi (6 km, 2–3 hrs).
                Relax, enjoy group activities, or interact with locals. Overnight camping at Manjhi.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 5: Manjhi → Agoda Village</h4>
              <p>
                Trek downwards to Agoda Village (10 km, 4–5 hrs). Reach by afternoon, freshen up and spend time 
                sharing trek stories and relaxing. Farewell dinner at homestay. Overnight in Agoda.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 6: Agoda → Dehradun</h4>
              <p>
                Early morning departure from Agoda. Stop at Joshiyara boating point for views and fun pictures.
                Drive back to Dehradun (6–7 hrs) and reach by evening. Trip ends with beautiful memories.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ HIGHLIGHTS */}
      <section className="section-light">
        <Container>
          <h2 className="section-title text-center">Trek Highlights</h2>
          <ul className="checklist">
            <li>Himalayan village life and homestay experience at Agoda</li>
            <li>Forest trails, riverside walks and bird watching areas</li>
            <li>Calm & scenic Dodital Lake surrounded by mountains</li>
            <li>Optional yoga/meditation in peaceful sites</li>
            <li>Slow-paced itinerary for comfort and acclimatization</li>
          </ul>
        </Container>
      </section>

      {/* ✅ CTA */}
      <section className="cta-section">
        <Container className="text-center">
          <h2>Ready to book your trek?</h2>
          <p>Snow views • Peaceful camping • Beginner friendly</p>
          <button className="book-btn-hero" onClick={handleBookScroll}>
            Pay Now ₹{currentPrice}
          </button>
        </Container>
      </section>
    </>
  );
};

export default TourDoditalDarwa;