import React,{useEffect} from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import '../styles/about.css';

// We'll use a common hero image, or you can import a specific one
import aboutHeroImg from '../assets/images/tour-img01.jpg'; 
import storyImg from '../assets/images/gallery-04.jpg';

// Icons for our values
import { BsFlag, BsShieldCheck, BsGlobe } from 'react-icons/bs';

// Data for the cancellation policy (cleaner than hard-coding)
const cancellationPolicy = [
  {
    days: "Cancellation more than 15 days prior",
    deduction: "15% deduction (incl. GST)"
  },
  {
    days: "Cancellation 14 to 8 days prior",
    deduction: "35% deduction (incl. GST)"
  },
  {
    days: "Cancellation 7 to 3 days prior",
    deduction: "55% deduction (incl. GST)"
  },
  {
    days: "Cancellation less than 2 days prior",
    deduction: "100% deduction"
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-page">
      
      {/* ================= HERO SECTION ================= */}
      <section className="about-hero" style={{ backgroundImage: `url(${aboutHeroImg})` }}>
        <div className="hero-overlay">
          <Container>
            <Row>
              <Col lg="12">
                <h1>About Ghume Ghume</h1>
                <p className="hero-subtitle">Our story is one of passion, exploration, and the joy of wandering.</p>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* ================= OUR STORY SECTION ================= */}
      <section className="about-story">
        <Container>
          <Row className="align-items-center">
            <Col lg="6" md="12">
              <div className="about-story-content">
                <h2 className="section-title">Our Story</h2>
                <h3>The Joy of "Ghume Ghume"</h3>
                <p>
                  In Hindi, <strong>“Ghume”</strong> means “to roam” or “to wander.” Repeating it creates <strong>“Ghume Ghume”</strong> — a phrase that captures the carefree, playful joy of exploring. It's not just about travel; it's about a mindset of freedom, discovery, and living in the moment.
                </p>
                <p>
                  <strong>Ghume Ghume</strong> was founded on this very principle. We believe that in a world that moves too fast, the soul heals when we take time to wander. We're a team of passionate travelers who wanted to share that feeling, curating authentic experiences that go beyond the typical tourist trail.
                </p>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="about-story-image">
                <img src={storyImg} alt="Our Team" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= OUR VALUES SECTION ================= */}
      <section className="about-values">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">What We Believe In</h2>
              <p className="section-subtitle">Our commitment to you, every step of the way.</p>
            </Col>
          </Row>
          <Row>
            {/* Value 1 */}
            <Col lg="4" md="6" className="mb-4">
              <div className="value-card">
                <div className="value-icon"><BsFlag /></div>
                <h3>Authentic Experiences</h3>
                <p>We craft journeys that immerse you in the local culture, connecting you with the heart of each destination.</p>
              </div>
            </Col>
            {/* Value 2 */}
            <Col lg="4" md="6" className="mb-4">
              <div className="value-card">
                <div className="value-icon"><BsShieldCheck /></div>
                <h3>Safety & Comfort</h3>
                <p>Your well-being is our top priority. We partner with vetted guides and ensure the highest standards of safety.</p>
              </div>
            </Col>
            {/* Value 3 */}
            <Col lg="4" md="6" className="mb-4">
              <div className="value-card">
                <div className="value-icon"><BsGlobe /></div>
                <h3>Responsible Travel</h3>
                <p>We're dedicated to sustainable tourism that respects local communities and protects the environments we explore.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= POLICIES SECTION ================= */}
      <section className="about-policies">
        <Container>
          <Row>
            {/* Cancellation Policy */}
            <Col lg="6" md="12" className="mb-4">
              <div className="policy-box">
                <h3 className="policy-title">Cancellation Policy</h3>
                <ListGroup flush>
                  {cancellationPolicy.map((item, index) => (
                    <ListGroupItem key={index}>
                      <span>{item.days}</span>
                      <strong className="policy-value">{item.deduction}</strong>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </Col>

            {/* Terms & Conditions */}
            <Col lg="6" md="12" className="mb-4">
              <div className="policy-box">
                <h3 className="policy-title">Terms and Conditions</h3>
                <p>
                  Full payment is required in advance for reservations. Room tariffs are inclusive of GST — 
                  12% for rooms priced between ₹1,001 to ₹7,500 and 18% for rooms priced above ₹7,500.
                </p>
                <p>
                  All rates are subject to applicable laws, regulations, and any changes from the government.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;