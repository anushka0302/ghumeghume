import React,{useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/policy.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="policy-page">
      <Container>
        <Row>
          <Col lg="10" className="m-auto">
            <div className="policy-container">
              <h1>Privacy Policy</h1>
              
              <h3>1. Information We Collect</h3>
              <p>We collect information such as your name, email address, phone number, and payment details when you book a trip with us.</p>

              <h3>2. How We Use Your Information</h3>
              <p>We use your data to process bookings, send booking confirmations, and improve our services. We do not sell your data to third parties.</p>

              <h3>3. Data Security</h3>
              <p>We implement strict security measures to protect your personal information. All payment transactions are encrypted via secure gateways.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PrivacyPolicy;