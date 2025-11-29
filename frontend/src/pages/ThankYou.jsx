import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/thank-you.css';
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

const ThankYou = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Booking Confirmed | Ghume Ghume</title>
        <meta name="description" content="Thank you for booking your trek with Ghume Ghume. Your adventure awaits!" />
        <meta name="robots" content="noindex" /> {/* Prevent search engines from indexing the thank you page */}
      </Helmet>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='pt-5 text-center'>
              <div className='thank__you'>
                {/* Fixed 'class' to 'className' for React */}
                <span><i className="ri-checkbox-circle-line"></i></span>
                <h1 className='mb-3 fw-semibold'>Thank You</h1>
                <h3 className='mb-4'>your tour is booked.</h3>

                <Button className='btn primary__btn w-25'>
                  <Link to='/home'>Back to Home</Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default ThankYou;