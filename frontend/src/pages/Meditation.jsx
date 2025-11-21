import React,{useEffect} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/experience-page.css'; // We will create this new CSS file

// === IMPORT YOUR "WOW" ASSETS ===
// You will need to find these and add them to your assets folder
import heroVideo from '../assets/videos/meditation-hero.mp4'; // Find a stunning, slow-motion drone video
import whyImage from '../assets/images/meditation-why.jpg'; // e.g., A serene temple or lake
import ctaImage from '../assets/images/cta-bg.jpg'; // e.g., A beautiful Himalayan sunset

// Import gallery images
import galleryImg1 from '../assets/images/gallery-01.jpg';
import galleryImg2 from '../assets/images/gallery-02.jpg';
import galleryImg3 from '../assets/images/gallery-03.jpg';
import galleryImg4 from '../assets/images/gallery-04.jpg';

const Meditation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                Find Your Stillness
              </h1>
              <p className="exp-hero-subtitle">
                Meditation in the Heart of the Himalayas
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
              <h2 className="exp-section-title">Escape the Noise. Discover Your Center.</h2>
              <p className="exp-lead">
                In a world that never stops, stillness is a luxury. We offer more than just a trip; we offer a sanctuary. Discover the profound peace of meditation in Uttarakhand, where ancient wisdom meets the majestic silence of the mountains.
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
                  Known as "Devbhoomi" or "Land of the Gods," Uttarakhand has been the spiritual home for sages and seekers for millennia. The air itself vibrates with a unique energy.
                </p>
                <ul>
                  <li>
                    <strong>Sacred Sanctuaries:</strong> Meditate in ancient temples, by the holy Ganges, or in secluded mountain caves.
                  </li>
                  <li>
                    <strong>Pure Nature:</strong> The pristine air, towering peaks, and lush forests create the perfect environment to disconnect and look inward.
                  </li>
                  <li>
                    <strong>Expert Guidance:</strong> Learn from local masters and guides who live and breathe the practice of mindfulness.
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
              <h2 className="exp-section-title">Moments of Peace</h2>
            </Col>
          </Row>
          <Row className="gallery-row">
            <Col lg="3" md="6" sm="6"><img src={galleryImg1} alt="Meditation spot 1" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg2} alt="Meditation spot 2" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg3} alt="Meditation spot 3" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg4} alt="Meditation spot 4" /></Col>
          </Row>
        </Container>
      </section>

      {/* ================= 5. CALL TO ACTION ================= */}
      <section className="exp-cta" style={{ backgroundImage: `url(${ctaImage})` }}>
        <div className="exp-hero-overlay" />
        <Container>
          <Row>
            <Col lg="8" className="mx-auto text-center">
              <h2>Begin Your Journey Within</h2>
              <p>
                We curate specialized meditation retreats and quiet remote stays.
                Let us help you plan your escape.
              </p>
              <Button tag={Link} to="/tours" className="exp-cta-btn">
                Explore Our Retreats
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default Meditation;