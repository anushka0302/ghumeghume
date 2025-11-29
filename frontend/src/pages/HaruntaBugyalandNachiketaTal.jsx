import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/tourDayaraBugyal.css";
import "../styles/tour-details.css";
import Booking from "../components/Booking/Booking";
// ✅ Import ComparisonFeature only once
import ComparisonFeature from "../components/ComparisonFeature/ComparisonFeature";
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

// ✅ Import centralized data
import trek from "../assets/data/trek";

import h1 from "../assets/images/harunta_1.jpg";
import h2 from "../assets/images/harunta_2.jpg";
import h3 from "../assets/images/harunta_3.jpg";
import h4 from "../assets/images/harunta_4.jpg";
import h5 from "../assets/images/harunta_5.jpg";
import h6 from "../assets/images/harunta_6.jpg";

const HaruntaBugyalandNachiketaTal = () => {
  // ✅ STATE: Pricing Toggle (Default: Group)
  const [isGroupPricing, setIsGroupPricing] = useState(true);

  // ✅ GET DATA: Find Harunta Bugyal (ID 2) from the centralized file
  // Note: If your trek.js uses a different ID for this trek, update the '2' below
  const tourData = trek.find((t) => t.id === 2) || trek[1] || trek[0];

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

  const galleryImages = [h1, h2, h3, h4, h5, h6];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#harunta-gallery",
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
        <title>{tourData.title} | Offbeat Trek Uttarakhand</title>
        <meta name="description" content={tourData.desc} />
        <meta property="og:title" content={`${tourData.title} - Book Now`} />
        <meta property="og:description" content="Explore the hidden gem of Harunta Bugyal and the serene Nachiketa Tal. Perfect for peace seekers." />
        <meta property="og:image" content={h1} />
      </Helmet>

      {/* ✅ HERO */}
      <section
        className="tour-hero parallax-bg"
        style={{
          background: `url(${h1}) center/cover no-repeat`,
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

          {/* ✅ NEW STATS PILL (Matches your image) */}
              <div className="stats-pill">
                <div className="stat-item">
                  <span className="stat-label">Altitude</span>
                  <span className="stat-value">10,200 ft</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Best Season</span>
                  <span className="stat-value">Oct – Jun</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Difficulty</span>
                  <span className="stat-value">Easy–Moderate</span>
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
                <h2 className="section-title">Why Harunta Bugyal & Nachiketa Tal?</h2>

                {/* ✅ COMPARISON FEATURE */}
                <div style={{ marginBottom: "25px" }}>
                  <ComparisonFeature imageSrc={h1} />
                </div>

                <p className="section-desc">
                  {tourData.desc}
                </p>
                <ul className="checklist">
                  <li>Velvet alpine meadows with snow peaks</li>
                  <li>Serene Nachiketa Tal and Nag Devta Temple</li>
                  <li>Forests of oak, rhododendron and pine</li>
                  <li>Rafting & adventure sports in Uttarkashi</li>
                  <li>Beginner friendly & family suitable</li>
                </ul>
              </div>

              {/* ✅ PHOTO GALLERY */}
              <div className="tour-content">
                <h2 className="section-title text-center">Photo Gallery</h2>
                <p className="gallery-tagline">Click to view fullscreen • Zoom enabled</p>
                <div id="harunta-gallery" className="gallery-grid">
                  {galleryImages.map((img, i) => (
                    <a
                      href={img}
                      data-pswp-width="1500"
                      data-pswp-height="1000"
                      className="gallery-item"
                      key={i}
                    >
                      {/* ✅ Lazy Loading added */}
                      <img src={img} alt="Harunta Bugyal Nachiketa Tal" loading="lazy" />
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
                  tourId="harunta-bugyal"
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
              <h4>Day 1: Dehradun → Uttarkashi</h4>
              <p>
                Drive from Dehradun to Uttarkashi (6–8 hrs). Scenic valleys and
                river views. Check-in at hotel/guesthouse. Optional visit to
                Kashi Vishwanath Temple and evening riverside walk. Overnight in
                Uttarkashi.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 2: Uttarkashi → Harunta Bugyal</h4>
              <p>
                After breakfast, drive to trek starting point. Trek 7–8 km (3–4
                hrs) through Banj, Buransh & Oak forests. Wide meadows with
                Himalayan peaks. Camping/homestay near Bugyal. Overnight stay.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 3: Trek to Nachiketa Tal</h4>
              <p>
                Breakfast at camp. Descend to Chaurangi Khal and continue to
                Nachiketa Tal (3–6 km; 2–4 hrs). Visit the serene lake and Nag
                Devta temple. Packed lunch at lakeside. Drive back to Uttarkashi
                by evening. Overnight stay.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 4: Uttarkashi • Rafting & Sightseeing</h4>
              <p>
                Whitewater rafting on Bhagirathi/Assi Ganga (grade 2–4). Optional
                angling, cycling or local sightseeing: NIM, temples and markets.
                Overnight in Uttarkashi.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 5: Uttarkashi → Dehradun</h4>
              <p>
                Breakfast and drive back to Dehradun (6–8 hrs). Trip ends.
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
            <li>Scenic Bugyal meadows and snow peaks</li>
            <li>Nachiketa Tal – peaceful sacred lake</li>
            <li>Forest trails perfect for beginners</li>
            <li>Rafting & adventure activities in Uttarkashi</li>
            <li>Family-friendly and beginner-friendly</li>
          </ul>
        </Container>
      </section>

      {/* ✅ CTA */}
      <section className="cta-section">
        <Container className="text-center">
          <h2>Ready to explore Harunta Bugyal & Nachiketa Tal?</h2>
          <p>Nature • Peaceful forest trails • Perfect beginner trek</p>
          <button className="book-btn-hero" onClick={handleBookScroll}>
            Pay Now ₹{currentPrice}
          </button>
        </Container>
      </section>
    </>
  );
};

export default HaruntaBugyalandNachiketaTal;