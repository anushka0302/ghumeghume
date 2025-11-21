import React, { useState,useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { faqData } from '../assets/data/faqData';
import '../styles/faq.css';

const FAQ = () => {
  // State to track which accordion is open
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if already open
    } else {
      setOpenIndex(index); // Open new one
    }
  };
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (

<section className="faq-section">
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know before you go.</p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg="8">
            <div className="faq-list">
              {faqData.map((item, index) => (
                <div 
                  className={`faq-item ${openIndex === index ? 'active' : ''}`} 
                  key={index}
                  onClick={() => toggle(index)}
                >
                  <div className="faq-question">
                    <h5>{item.question}</h5>
                    <span className="faq-icon">
                      {openIndex === index ? '-' : '+'}
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FAQ;