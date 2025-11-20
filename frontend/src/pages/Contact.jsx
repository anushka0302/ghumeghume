import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/policy.css';

const Contact = () => {
  return (
    <section className="policy-page">
      <Container>
        <Row>
          <Col lg="10" className="m-auto">
            <div className="policy-container">
              <h1>Contact Us</h1>
              
              <p>We are here to help you with your travel plans. Reach out to us via any of the methods below.</p>

              <h3>Registered Office Address</h3>
              <p>
                Ghume Ghume Pvt Ltd.<br />
                Dharampur, Dehradun,<br />
                Uttarakhand, India - 248001
              </p>

              <h3>Contact Information</h3>
              <ul>
                <li><strong>Email:</strong> ghumeghume@proton.me</li>
                <li><strong>Phone:</strong> +91 8920831772</li>
              </ul>

              <h3>Operating Hours</h3>
              <p>Monday to Sunday: 9:00 AM - 7:00 PM</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;