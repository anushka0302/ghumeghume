import React,{useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/policy.css';
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

const ShippingPolicy = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Shipping & Delivery Policy | Ghume Ghume</title>
        <meta name="description" content="Understand our shipping and delivery policy. As a travel service provider, Ghume Ghume does not ship physical products." />
      </Helmet>

      <section className="policy-page">
        <Container>
          <Row>
            <Col lg="10" className="m-auto">
              <div className="policy-container">
                <h1>Shipping & Delivery Policy</h1>
                
                <p>Last updated: November 17, 2025</p>

                <h3>1. Service Delivery</h3>
                <p>Ghume Ghume provides travel and tourism services. <strong>We do not ship any physical products.</strong></p>

                <h3>2. Confirmation</h3>
                <p>Upon successful booking, you will receive a booking confirmation via email and SMS immediately. This email serves as your proof of purchase/delivery.</p>

                <h3>3. No Physical Shipping</h3>
                <p>Since our services are experiential in nature, there are no shipping charges or delivery times associated with our bookings.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ShippingPolicy;