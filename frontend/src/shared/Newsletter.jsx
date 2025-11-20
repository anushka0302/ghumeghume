import React, { useState } from 'react';
import './Newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';
import emailjs from 'emailjs-com';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Replace these placeholders with your actual EmailJS credentials
    const serviceID = 'service_2xekge8';
    const templateID = 'template_5qj7z8t';
    const publicKey = 'ItFe68uW5tcHisaIe';

    const templateParams = {
      user_email: email, 
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setMessage('Subscribed successfully! Thank you.');
        setEmail(''); 
      }, (err) => {
        console.log('FAILED...', err);
        setMessage('Failed to subscribe. Please try again later.');
      });
  };

  return (
    <section className='newsletter'>
      <Container>
        {/* Added g-0 to remove gutters for seamless background */}
        <Row className="g-0 align-items-center">
          <Col lg='6'>
            <div className='newsletter__content'>
              <div className="newsletter__badge">Subscribe Now</div>
              <h2>Unlock Exclusive Travel Tips & Hidden Gems</h2>
              <p>Join our community of explorers. Get the latest updates on unseen destinations, trekking guides, and special offers directly in your inbox.</p>

              <form onSubmit={sendEmail} className='newsletter__input'>
                <input 
                  type='email' 
                  placeholder='Enter your email address' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className='btn newsletter__btn'>Subscribe</button>
              </form>

              {message && <p className="newsletter__message">{message}</p>}
            </div>
          </Col>
          <Col lg='6'>
            <div className='newsletter__img'>
              <img src={maleTourist} alt='Traveler' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Newsletter;