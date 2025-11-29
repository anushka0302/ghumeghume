import React,{useEffect} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/experience-page.css';
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

// === IMPORT YOUR "WOW" ASSETS ===
import heroVideo from '../assets/videos/meditation-hero.mp4';
import whyImage from '../assets/images/meditation-why.jpg';
import ctaImage from '../assets/images/cta-bg.jpg';

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
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Meditation Retreats in Uttarakhand | Ghume Ghume</title>
        <meta name="description" content="Escape the noise and discover your center. Join Ghume Ghume for specialized meditation retreats in the heart of the Himalayas, Uttarakhand." />
        <meta property="og:title" content="Meditation Retreats in Uttarakhand | Find Your Stillness" />
        <meta property="og:description" content="Discover the profound peace of meditation in Uttarakhand, where ancient wisdom meets the majestic silence of the mountains." />
        <meta property="og:image" content={whyImage} />
      </Helmet>

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
                {/* ✅ Added loading="lazy" */}
                <img src={whyImage} alt="Spiritual Uttarakhand" loading="lazy" />
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
            {/* ✅ Added loading="lazy" to all gallery images */}
            <Col lg="3" md="6" sm="6"><img src={galleryImg1} alt="Meditation spot 1" loading="lazy" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg2} alt="Meditation spot 2" loading="lazy" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg3} alt="Meditation spot 3" loading="lazy" /></Col>
            <Col lg="3" md="6" sm="6"><img src={galleryImg4} alt="Meditation spot 4" loading="lazy" /></Col>
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