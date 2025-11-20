import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../styles/tourDayaraBugyal.css"; 
import "../styles/tour-details.css";
import Booking from "../components/Booking/Booking";

import dodital_1 from "../assets/images/dodital_1.jpg";
import dodital_2 from "../assets/images/dodital_2.jpg";
import dodital_3 from "../assets/images/dodital_3.jpg";
import dodital_4 from "../assets/images/dodital_4.jpg";
import dodital_5 from "../assets/images/dodital_5.jpg";
import dodital_6 from "../assets/images/dodital_6.jpg";
import dodital_7 from "../assets/images/dodital_7.jpg";
import dodital_8 from "../assets/images/dodital_8.jpg";

const TourDoditalDarwa = () => {
  const tour = {
    title: "Dodital – Darwa Pass Trek",
    price: 12500,
    reviews: [], 
  };
  const avgRating = 0; 

  const handleBookScroll = () => {
    document.getElementById("booking-form").scrollIntoView({ behavior: "smooth" });
  };

  const galleryImages = [
    dodital_1,
    dodital_2,
    dodital_3,
    dodital_4,
    dodital_5,
    dodital_6,
    dodital_7,
    dodital_8,
  ];

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
          <h1>Dodital – Darwa Pass Trek</h1>
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
            <div><strong>Altitude</strong><br />13,450 ft</div>
            <div><strong>Best Season</strong><br />Nov – Mar & Apr – Jun</div>
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
                <h2 className="section-title">Why Dodital – Darwa Pass?</h2>
                <p className="section-desc">
                  A calm Himalayan lake tucked deep inside cedar and pine forests,
                  Dodital is considered the birthplace of Lord Ganesha. As you trek
                  further to Darwa Pass, the forest trail opens into high snow fields
                  with grand 360° views of Bandarpoonch, Kala Nag, and the Swargarohini
                  range. It’s a perfect mix of peaceful camping, frozen lake views, and
                  a proper winter summit push.
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
                      <img src={img} alt="Dodital Darwa Pass" />
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            {/* === Booking Form Column === */}
            <Col lg="4">
              <div id="booking-form"> 
                {/* Pass the correct tourId */}
                <Booking tour={tour} avgRating={avgRating} tourId="dodital-darwa" />
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
            Pay Now ₹{tour.price}
          </button>
        </Container>
      </section>
    </>
  );
};

export default TourDoditalDarwa;