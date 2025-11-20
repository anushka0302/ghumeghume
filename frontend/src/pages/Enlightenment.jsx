import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/experience-page.css'; // Uses the same CSS as the Meditation page

// === IMPORT YOUR "WOW" ASSETS ===
// Find new assets for this page
import heroVideo from '../assets/videos/enlightenment-hero.mp4'; // Find a video of temples, Ganges, or mountain peaks
import whyImage from '../assets/images/enlightenment-why.png'; // e.g., A sadhu, a monastery, or Badrinath
import ctaImage from '../assets/images/cta-bg-2.png'; // e.g., A beautiful Himalayan sunset

// Import gallery images
import galleryImg1 from '../assets/images/gallery-01.jpg';
import galleryImg2 from '../assets/images/gallery-02.jpg';
import galleryImg3 from '../assets/images/gallery-03.jpg';
import galleryImg4 from '../assets/images/gallery-04.jpg';

const Enlightenment = () => {
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
                Seek Your Truth
              </h1>
              <p className="exp-hero-subtitle">
                A Spiritual Journey to Enlightenment in Uttarakhand
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
              <h2 className="exp-section-title">Go Beyond Travel. Embark on a Pilgrimage.</h2>
              <p className="exp-lead">
                Enlightenment is not a destination, but a path. We curate profound spiritual journeys in Uttarakhand, the "Land of the Gods," designed to help you connect with ancient wisdom and your own inner self.
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
                <img src={whyImage} alt="Spiritual Uttarakhand" />
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="exp-why-content">
                <h2 className="exp-section-title">Why Uttarakhand?</h2>
                <p>
                  For millennia, this land has been the cradle of Sanatana Dharma. The energy (vibration) of this place, charged by countless masters, provides a powerful aid to spiritual seekers.
                </p>
                <ul>
                  <li>
                    <strong>Sacred Lineage:</strong> Follow the footsteps of ancient rishis and yogis, visiting the same temples and ashrams they established.
                  </li>
                  <li>
                    <strong>Energy Centers:</strong> Visit powerful "Shakti Peethas" and "Jyotirlingas" that serve as potent centers for spiritual growth.
                  </li>
                  <li>
                    <strong>Learned Guides:</strong> Travel with knowledgeable guides who can share the deep history, philosophy, and stories of this holy land.
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
              <h2 className="exp-section-title">Visions of Devbhoomi</h2>
            </Col>
          </Row>
          <Row className="gallery-row">
            <Col lg="3" md="6" sm="6"><img src={galleryImg1} alt="Pilgrimage 1" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg2} alt="Pilgrimage 2" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg3} alt="Pilgrimage 3" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg4} alt="Pilgrimage 4" /></Col>
          </Row>
        </Container>
      </section>

      {/* ================= 5. CALL TO ACTION ================= */}
      <section className="exp-cta" style={{ backgroundImage: `url(${ctaImage})` }}>
        <div className="exp-hero-overlay" />
        <Container>
          <Row>
            <Col lg="8" className="mx-auto text-center">
              <h2>Ready to Begin Your Path?</h2>
              <p>
                We design custom pilgrimages and spiritual tours.
                Speak with our team to plan your sacred journey.
              </p>
              <Button tag={Link} to="/tours" className="exp-cta-btn">
                Explore Pilgrimages
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default Enlightenment;