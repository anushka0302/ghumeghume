import React,{useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { gearCategories } from '../assets/data/gearData';
import '../styles/gear-list.css';
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

const GearList = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Essential Trekking Gear List | Ghume Ghume</title>
        <meta name="description" content="Prepare for your adventure with our comprehensive trekking gear checklist. Ensure you pack the right equipment for a safe and comfortable trip." />
        <meta property="og:title" content="Essential Trekking Gear List | Ghume Ghume" />
        <meta property="og:description" content="Complete checklist for trekking in the Himalayas. From clothing to accessories, know exactly what to pack." />
      </Helmet>

      <section className="gear-section">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section-title">Essential Gear List</h2>
              <p className="section-subtitle">
                Packing right is the first step to a successful adventure. Use this checklist to prepare.
              </p>
            </Col>
          </Row>

          <Row>
            {gearCategories.map((category, index) => (
              <Col lg="4" md="6" className="mb-4" key={index}>
                <div className="gear-card">
                  <div className="gear-header">
                    <span className="gear-icon">{category.icon}</span>
                    <h3>{category.title}</h3>
                  </div>
                  <ul className="gear-items">
                    {category.items.map((item, i) => (
                      <li key={i}>
                        <span className="check-icon">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default GearList;