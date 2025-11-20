import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { gearCategories } from '../assets/data/gearData';
import '../styles/gear-list.css';

const GearList = () => {
  return (
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
  );
};

export default GearList;