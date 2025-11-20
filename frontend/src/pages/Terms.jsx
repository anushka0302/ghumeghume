import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/policy.css';

const Terms = () => {
  return (
    <section className="policy-page">
      <Container>
        <Row>
          <Col lg="10" className="m-auto">
            <div className="policy-container">
              <h1>Terms and Conditions</h1>
              
              <h3>1. Introduction</h3>
              <p>Welcome to Ghume Ghume. By accessing our website and booking our services, you agree to be bound by these terms and conditions.</p>

              <h3>2. Booking & Payments</h3>
              <p>Full payment is required in advance to confirm your reservation. Rates are subject to change based on availability and government regulations.</p>

              <h3>3. User Responsibilities</h3>
              <p>Travelers are responsible for their own safety and belongings. Ghume Ghume is not liable for any loss or damage to personal property during the trip.</p>

              <h3>4. Governing Law</h3>
              <p>These terms shall be governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in Dehradun, Uttarakhand.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Terms;