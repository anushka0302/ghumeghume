import React from 'react';
import Slider from 'react-slick';
import './testimonials.css'; // Import the new CSS file

import ava01 from '../../assets/images/ava-1.jpg';
import ava02 from '../../assets/images/ava-2.jpg';
import ava03 from '../../assets/images/ava-3.jpg';
import ava04 from '../../assets/images/ava-4.jpg';

const Testimonals = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 3000, // Slightly slower for better readability
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="testimonial-slider">
      
      {/* Testimonial 1 */}
      <div className="testimonial-item">
        <div className="testimonial-card">
          <p className="testimonial-text">
            "Honestly, I was a bit nervous about traveling solo, but the team at Ghume Ghume made me feel like family. From the cozy homestays to the chai breaks with local guides, every detail was filled with warmth. It didn't feel like a tour; it felt like visiting old friends in the mountains!"
          </p>
          <div className="customer-info">
            <img src={ava01} alt="Customer" className="customer-img" />
            <div>
              <h6 className="customer-name">Ayush</h6>
              <p className="customer-role">Solo Traveler</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="testimonial-item">
        <div className="testimonial-card">
          <p className="testimonial-text">
            "We wanted a trip that wasn't just sightseeing but actually *connecting*. The team understood that perfectly. We ended up having dinner with a local family in Raithal and learning to cook local dishes. Those small, kind moments are what I'll treasure forever. Thank you for the magic!"
          </p>
          <div className="customer-info">
            <img src={ava02} alt="Customer" className="customer-img" />
            <div>
              <h6 className="customer-name">Sara ali khan</h6>
              <p className="customer-role">Nature Lover</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="testimonial-item">
        <div className="testimonial-card">
          <p className="testimonial-text">
            "Planning a trek can be overwhelming, but speaking with the guides here put me at ease instantly. They were patient with my endless questions and genuinely cared about my safety. Standing at the summit of Dayara Bugyal, I felt so supported and empowered. Best adventure ever!"
          </p>
          <div className="customer-info">
            <img src={ava03} alt="Customer" className="customer-img" />
            <div>
              <h6 className="customer-name">Aryan</h6>
              <p className="customer-role">First-Time Trekker</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 4 (Duplicate for better sliding effect if needed) */}
       <div className="testimonial-item">
        <div className="testimonial-card">
          <p className="testimonial-text">
             "The food was incredible, the views were stunning, but the kindness of the staff stole the show. When I felt a bit altitude sick, the guide stayed by my side and adjusted our pace without making me feel bad. That level of care is rare. I'm already planning my next trip!"
          </p>
          <div className="customer-info">
            <img src={ava04} alt="Customer" className="customer-img" />
            <div>
              <h6 className="customer-name">Simran</h6>
              <p className="customer-role">Adventure Seeker</p>
            </div>
          </div>
        </div>
      </div>

    </Slider>
  );
};

export default Testimonals;