import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/tourDayaraBugyal.css"; 
import "../styles/tour-details.css"; 
import Booking from "../components/Booking/Booking";

import h1 from "../assets/images/harunta_1.jpg";
import h2 from "../assets/images/harunta_2.jpg";
import h3 from "../assets/images/harunta_3.jpg";
import h4 from "../assets/images/harunta_4.jpg";
import h5 from "../assets/images/harunta_5.jpg";
import h6 from "../assets/images/harunta_6.jpg";

const HaruntaBugyalandNachiketaTal = () => {
  const tour = {
    title: "Harunta Bugyal & Nachiketa Tal Trek",
    price: 10500,
    reviews: [], 
  };
  const avgRating = 0; 

  const handleBookScroll = () => {
    document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" });
  };

  const galleryImages = [h1, h2, h3, h4, h5, h6];

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
          <h1>Harunta Bugyal & Nachiketa Tal Trek</h1>
          <p>5 Days • Easy–Moderate • Uttarkashi, Uttarakhand</p>
          <div className="hero-action-wrap">
            <div className="price-box">
              <h3>₹{tour.price}</h3>
              <span>Per Person • Limited Batch Size</span>
            </div>
            <button className="book-btn-hero" onClick={handleBookScroll}>
              Book & Pay Now
            </button>
          </div>
          <div className="stats-row">
            <div><strong>Altitude</strong><br />≈ 3,100 m</div>
            <div><strong>Best Season</strong><br />Oct – Jun</div>
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
                <h2 className="section-title">Why Harunta Bugyal & Nachiketa Tal?</h2>
                <p className="section-desc">
                  A peaceful Himalayan trek featuring forest trails, alpine meadows,
                  a sacred lake, and Uttarkashi adventure activities. Perfect for
                  beginners, families and nature lovers who want both trekking and
                  sightseeing without high altitude difficulty.
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
                      <img src={img} alt="Harunta Bugyal Nachiketa Tal" />
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            {/* === Booking Form Column === */}
            <Col lg="4">
              <div id="booking-form"> 
                <Booking tour={tour} avgRating={avgRating} tourId="harunta-bugyal" />
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
                Kashi Vishwanath Temple and evening riverside walk.
                Overnight in Uttarkashi.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 2: Uttarkashi → Harunta Bugyal</h4>
              <p>
                After breakfast, drive to trek starting point. Trek 7–8 km
                (3–4 hrs) through Banj, Buransh & Oak forests. Wide meadows
                with Himalayan peaks. Camping/homestay near Bugyal.
                Overnight stay.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 3: Trek to Nachiketa Tal</h4>
              <p>
                Breakfast at camp. Descend to Chaurangi Khal and continue to
                Nachiketa Tal (3–6 km; 2–4 hrs). Visit the serene lake and Nag
                Devta temple. Packed lunch at lakeside. Drive back to
                Uttarkashi by evening. Overnight stay.
              </p>
            </div>
            <div className="timeline-item">
              <h4>Day 4: Uttarkashi • Rafting & Sightseeing</h4>
              <p>
                Whitewater rafting on Bhagirathi/Assi Ganga (grade 2–4).
                Optional angling, cycling or local sightseeing: NIM,
                temples and markets. Overnight in Uttarkashi.
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
            Pay Now ₹{tour.price}
          </button>
        </Container>
      </section>
    </>
  );
};

export default HaruntaBugyalandNachiketaTal;