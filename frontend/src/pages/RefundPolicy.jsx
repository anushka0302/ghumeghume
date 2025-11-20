import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/policy.css';

const RefundPolicy = () => {
  return (
    <section className="policy-page">
      <Container>
        <Row>
          <Col lg="10" className="m-auto">
            <div className="policy-container">
              <h1>Cancellation & Refund Policy</h1>
              <p>Last updated: November 17, 2025</p>
              
              <p>At Ghume Ghume, we understand that plans change. Our cancellation policy is designed to be fair to both our travelers and our local partners.</p>

              <h3>1. Cancellation Charges</h3>
              <ul>
                <li><strong>15+ days prior to trip:</strong> 15% deduction (Processing fee + GST)</li>
                <li><strong>14 to 8 days prior to trip:</strong> 35% deduction</li>
                <li><strong>7 to 3 days prior to trip:</strong> 55% deduction</li>
                <li><strong>Less than 2 days prior:</strong> 100% deduction (No Refund)</li>
              </ul>

              <h3>2. Refund Process</h3>
              <p>Refunds will be processed within <strong>5-7 business days</strong> after the cancellation request is approved. The amount will be credited back to the original payment method used during booking.</p>

              <h3>3. Force Majeure</h3>
              <p>In case of cancellations due to natural calamities (landslides, heavy rain, etc.) or government restrictions, we will offer a credit note for the full amount, valid for 1 year.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RefundPolicy;