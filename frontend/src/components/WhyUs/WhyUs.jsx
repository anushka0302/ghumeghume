// File: src/components/WhyUs/WhyUs.jsx

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { whyUsData } from '../../assets/data/whyUsData'; // Import our new data
import './why-us.css'; // We will create this CSS file next

const WhyUs = () => {
  return (
    <section className="why-us-section">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section-title">Why Choose Ghume Ghume?</h2>
            <p className="section-subtitle">
              We're more than just a travel company; we're your partners in adventure.
            </p>
          </Col>
        </Row>

        <Row>
          {whyUsData.map((item, index) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
              <div className="why-us-card">
                <div className="why-us-icon">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default WhyUs;