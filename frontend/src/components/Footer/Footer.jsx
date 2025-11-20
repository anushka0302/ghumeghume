import React from 'react';
import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const quick_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About Us'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
  // {
  //   path: '/our-team',
  //   display: 'Our Team'
  // }
];

// === UPDATED: These links are required for Razorpay Verification ===
const quick_links2 = [
  {
    path: '/privacy-policy',
    display: 'Privacy Policy'
  },
  {
    path: '/terms',
    display: 'Terms & Conditions'
  },
  {
    path: '/refund-policy',
    display: 'Cancellation & Refund'
  },
  {
    path: '/shipping-policy',
    display: 'Shipping Policy'
  },
  {
    path: '/contact',
    display: 'Contact Us'
  }
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <Container>
        <Row>
          {/* === COLUMN 1: LOGO & SOCIALS === */}
          <Col lg='3' className='mb-4'>
            <div className='logo'>
              <img src={logo} alt='Ghume Ghume Logo' />
              <p>Improve your travel experience with expert guides and curated adventures in the Himalayas.</p>
              
              <div className='social__links d-flex align-items-center gap-3'>
                <a href="https://www.youtube.com/@GhumeGhume" target="_blank" rel="noopener noreferrer">
                  <i className="ri-youtube-line"></i>
                </a>
                <a href="https://twitter.com/ghumeghume" target="_blank" rel="noopener noreferrer">
                  <i className="ri-twitter-line"></i>
                </a>
                <a href="https://www.facebook.com/ghumeghume" target="_blank" rel="noopener noreferrer">
                  <i className="ri-facebook-circle-line"></i>
                </a>
                <a href="https://www.instagram.com/ghume__ghume/" target="_blank" rel="noopener noreferrer">
                  <i className="ri-instagram-line"></i>
                </a>
              </div>
            </div>
          </Col>

          {/* === COLUMN 2: DISCOVER === */}
          <Col lg='3' className='mb-4'>
            <h5 className='footer__link-title'>Discover</h5>
            <ListGroup className='footer__quick-links'>
              {quick_links.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {/* === COLUMN 3: LEGAL & POLICIES (Critical for Razorpay) === */}
          <Col lg='3' className='mb-4'>
            <h5 className='footer__link-title'>Policies</h5>
            <ListGroup className='footer__quick-links'>
              {quick_links2.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {/* === COLUMN 4: CONTACT INFO === */}
          <Col lg='3' className='mb-4'>
            <h5 className='footer__link-title'>Contact</h5>
            <ListGroup className='footer__quick-links'>
              
              <ListGroupItem className='ps-0 border-0 d-flex align-items-start gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-map-pin-line"></i></span>
                  Address:
                </h6>
                <p className='mb-0'>Dharampur, Dehradun, Uttarakhand</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-mail-line"></i></span>
                  Email:
                </h6>
                <a href="mailto:ghumeghume@proton.me" className='contact-link'>ghumeghume@proton.me</a>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-phone-line"></i></span>
                  Phone:
                </h6>
                <a href="tel:+918920831772" className='contact-link'>+91 89208 31772</a>
              </ListGroupItem>

            </ListGroup>
          </Col>

          <Col lg='12' className='text-center pt-4 mt-4 border-top'>
            <p className='copyright'>
              Copyright © {year}, Design & Developed by <strong>Hoursdev</strong>. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>

    </footer>
  );
}

export default Footer;