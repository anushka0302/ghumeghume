import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/tourDayaraBugyal.css";
import "../styles/tour-details.css"; 
import Booking from "../components/Booking/Booking";

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
  const tour = {
    title: "Dayara Bugyal Trek",
    price: 10500,
    reviews: [], 
  };
  const avgRating = 0; 

  const handleBookScroll = () => {
    document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" });
  };

  const galleryImages = [
    dayara_g1, dayara_g2, dayara_g3, dayara_g4, dayara_g5,
    dayara_g6, dayara_g7, dayara_g8, dayara_g9, dayara_g10,
  ];

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
          <h1>Dayara Bugyal Trek</h1>
          <p>4 Days • Easy–Moderate • Uttarkashi, Uttarakhand</p>
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
                <p className="section-desc">
                  Dayara Bugyal is one of India’s most beautiful alpine meadows. In winter,
                  these large grasslands turn into huge snow fields with 180° views of
                  Bandarpoonch, Srikanth, Black Peak and Gangotri range. The trek is short,
                  scenic, and perfect for beginners as well as families.
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
                <Booking tour={tour} avgRating={avgRating} tourId="dayara-bugyal" />
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
          {/* <div className="text-center mt-4">
            <button className="book-btn-hero" onClick={handleBookScroll}>
              Book Now ₹{tour.price}
            </button>
          </div> */}
        </Container>
      </section>
      
      {/* ✅ CTA */}
      <section className="cta-section">
        <Container className="text-center">
          <h2>Ready to book your trek?</h2>
          <p>Snowy meadows • Beginner friendly • Easy travel access</p>
          <button className="book-btn-hero" onClick={handleBookScroll}>
            Pay Now ₹{tour.price}
          </button>
        </Container>
      </section>
    </>
  );
};

export default TourDayaraBugyal;