import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/experience-page.css'; // Uses the same CSS as the Meditation page

// === IMPORT YOUR "WOW" ASSETS ===
// Find new assets for this page
import heroVideo from '../assets/videos/remote-work-hero.mp4'; // Find a video of someone on a laptop with a mountain view
import whyImage from '../assets/images/remote-work-why.jpg'; // e.g., A cozy cafe or homestay with good Wi-Fi
import ctaImage from '../assets/images/cta-bg-3.jpg'; // e.g., A beautiful Himalayan sunset

// Import gallery images
import galleryImg1 from '../assets/images/gallery-01.jpg';
import galleryImg2 from '../assets/images/gallery-02.jpg';
import galleryImg3 from '../assets/images/gallery-03.jpg';
import galleryImg4 from '../assets/images/gallery-04.jpg';

const RemoteWorkplace = () => {
  return (
    <div className="experience-page">

      {/* ================= 1. VIDEO HERO SECTION ================= */}
      <section className="exp-hero">
        <video src={heroVideo} autoPlay loop muted playsInline className="exp-hero-video" />
        <div className="exp-hero-overlay" />
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h1 className="exp-hero-title">
                Your Office. Reimagined.
              </h1>
              <p className="exp-hero-subtitle">
                Work Remotely from the Inspiring Landscapes of Uttarakhand
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= 2. INTRO SECTION ================= */}
      <section className="exp-intro">
        <Container>
          <Row>
            <Col lg="8" className="mx-auto text-center">
              <h2 className="exp-section-title">Upgrade Your "Work from Home"</h2>
              <p className="exp-lead">
                Swap your city skyline for mountain peaks. Ghume Ghume curates premium "workcation" experiences in Uttarakhand, blending productivity with profound peace. Find your focus where the air is clear and the Wi-Fi is strong.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= 3. "WHY UTTARAKHAND?" SECTION ================= */}
      <section className="exp-why-section">
        <Container>
          <Row className="align-items-center">
            <Col lg="6" md="12">
              <div className="exp-why-image">
                <img src={whyImage} alt="Workcation in Uttarakhand" />
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="exp-why-content">
                <h2 className="exp-section-title">Why Uttarakhand?</h2>
                <p>
                  Discover the perfect work-life balance in a land that inspires. We partner with locations that understand the needs of a modern remote professional.
                </p>
                <ul>
                  <li>
                    <strong>Reliable Connectivity:</strong> We've vetted co-working spaces and homestays with high-speed internet and power backups.
                  </li>
                  <li>
                    <strong>Inspiring Environment:</strong> Boost your creativity and reduce burnout with majestic views and a tranquil atmosphere.
                  </li>
                  <li>
                    <strong>Work-Life Balance:</strong> Log off from your laptop and immediately step onto a hiking trail, visit a local cafe, or simply relax by a river.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= 4. PHOTO GALLERY ================= */}
      <section className="exp-gallery">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="exp-section-title">The New Corner Office</h2>
            </Col>
          </Row>
          <Row className="gallery-row">
            <Col lg="3" md="6" sm="6"><img src={galleryImg1} alt="Remote work spot 1" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg2} alt="Remote work spot 2" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg3} alt="Remote work spot 3" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg4} alt="Remote work spot 4" /></Col>
          </Row>
        </Container>
      </section>

      {/* ================= 5. CALL TO ACTION ================= */}
      <section className="exp-cta" style={{ backgroundImage: `url(${ctaImage})` }}>
        <div className="exp-hero-overlay" />
        <Container>
          <Row>
            <Col lg="8" className="mx-auto text-center">
              <h2>Ready to Change Your Scenery?</h2>
              <p>
                We arrange long-stay packages at verified properties with everything
                you need to stay productive and peaceful.
              </p>
              <Button tag={Link} to="/tours" className="exp-cta-btn">
                Find Your Workstation
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default RemoteWorkplace;