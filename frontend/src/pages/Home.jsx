import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

import ServiceList from "../services/ServiceList";
import experinceImg from "../assets/images/experience.png";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonals from "../components/Testimonals/Testimonals";
import Newsletter from "../shared/Newsletter";
import Subtitle from "../shared/Subtitle";
import VideoCarousel from "../components/Carousel/VideoCarousel";
import TrekComparison from '../components/Weather/TrekComparison';

// ✅ Import Centralized Data
import trek from "../assets/data/trek";

const Home = () => {
  // ✅ STATE: Toggle between 'group' and 'solo' pricing
  const [pricingMode, setPricingMode] = useState('group'); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ CONFIGURATION: Map IDs to specific Home Page Links
  const featuredToursConfig = [
    { id: 1, link: "/tour/dayara-bugyal" },
    { id: 2, link: "/tour/harunta-bugyal-nachiketa-tal" },
    { id: 3, link: "/tour/dodital-darwa-pass" },
  ];

  // ✅ MERGE: Combine config with centralized data
  const featuredTours = featuredToursConfig.map((config) => {
    const data = trek.find((t) => t.id === config.id) || {};
    // 'data' contains img, title, altitude, included, etc. from trek.js
    return { ...data, ...config }; 
  });

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Ghume Ghume | Best Trekking & Expeditions in India</title>
        <meta name="description" content="Book the best trekking packages in Uttarakhand. Join Ghume Ghume for Dayara Bugyal, Harunta Bugyal, Dodital, and more. Safe, affordable, and unforgettable." />
        <meta property="og:title" content="Ghume Ghume | Trekking Adventures" />
        <meta property="og:image" content={featuredTours[0]?.img} />
      </Helmet>

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-content">
          <Container>
            <Row className="align-items-center text-center">
              <Col lg="12">
                <div className="hero__content">
                  <h1>
                    Your Journey Begins with{" "}
                    <span className="highlight">Ghume Ghume</span>
                  </h1>
                  <p className="hero__text">
                    Book your dream destination, explore hidden gems, and travel
                    stress-free.
                  </p>
                </div>

                {/* FEATURED TOURS */}
                <section className="featured-tours">
                  <Container>
                    <Row className="text-center">
                      <Col lg="12">
                        <Subtitle subtitle="Explore" />
                        <h2 className="featured__tour-title">
                          Popular Packages
                        </h2>

                        {/* ✅ RESPONSIVE TOGGLE BUTTONS */}
                        <div className="pricing-toggle-container">
                          
                          {/* Group Option */}
                          <label 
                            className={`pricing-toggle-btn ${pricingMode === 'group' ? 'active' : 'inactive'}`}
                          >
                            <input
                              type="radio"
                              name="pricing"
                              checked={pricingMode === "group"}
                              onChange={() => setPricingMode("group")}
                              style={{ display: 'none' }} 
                            />
                            Group (6+ Pax)
                            <span className="sale-badge">SALE</span>
                          </label>

                          {/* Solo Option */}
                          <label 
                            className={`pricing-toggle-btn ${pricingMode === 'solo' ? 'active' : 'inactive'}`}
                          >
                            <input
                              type="radio"
                              name="pricing"
                              checked={pricingMode === "solo"}
                              onChange={() => setPricingMode("solo")}
                              style={{ display: 'none' }} 
                            />
                            Solo / Duo
                          </label>

                        </div>
                      </Col>
                    </Row>

                    <Row className="tour-card-row">
                      {featuredTours.map((tour) => (
                        <Col lg="4" md="6" sm="12" key={tour.id}>
                          <div className="tour-card">
                            <div className="tour-card-image-wrapper">
                              {/* ✅ Lazy Load Image */}
                              <img src={tour.img} alt={tour.title} loading="lazy" />
                              <h5 className="tour-title">{tour.title}</h5>
                              <span className="tour-trek-badge">TREK</span>
                            </div>

                            <div className="tour-info">
                              {/* ✅ DYNAMIC PRICE DISPLAY */}
                              <div
                                className="tour-price"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                }}
                              >
                                {pricingMode === "group" ? (
                                  <>
                                    {/* Cut Price */}
                                    <span
                                      style={{
                                        textDecoration: "line-through",
                                        color: "#999",
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      ₹ {tour.priceSolo}
                                    </span>
                                    {/* Discounted Price */}
                                    <span
                                      style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "bold",
                                        color: "#faa935",
                                      }}
                                    >
                                      ₹ {tour.priceGroup}{" "}
                                      <span
                                        style={{
                                          fontSize: "0.8rem",
                                          color: "#555",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        / Person
                                      </span>
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "0.8rem",
                                        color: "green",
                                      }}
                                    >
                                      (Save ₹{tour.priceSolo - tour.priceGroup})
                                    </span>
                                  </>
                                ) : (
                                  // Standard Price
                                  <span
                                    style={{
                                      fontSize: "1.2rem",
                                      fontWeight: "bold",
                                      color: "#faa935",
                                    }}
                                  >
                                    ₹ {tour.priceSolo}{" "}
                                    <span
                                      style={{
                                        fontSize: "0.8rem",
                                        color: "#555",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      / Person
                                    </span>
                                  </span>
                                )}
                              </div>

                              {/* ✅ ADDED ALTITUDE & DAYS ROW (New Attractive Layout) */}
                              <div 
                                className="d-flex justify-content-between align-items-center mt-3 mb-2 py-2 px-2" 
                                style={{ 
                                  background: "#f8f9fa", 
                                  borderRadius: "8px", 
                                  fontSize: '0.85rem', 
                                  color: '#555', 
                                  fontWeight: '600' 
                                }}
                              >
                                <span className="d-flex align-items-center gap-1">
                                  <i className="ri-calendar-line" style={{color:'#faa935', fontSize: '1rem'}}></i> 
                                  {tour.days}
                                </span>
                                <span className="d-flex align-items-center gap-1">
                                  <i className="ri-mountain-line" style={{color:'#faa935', fontSize: '1rem'}}></i> 
                                  {tour.altitude}
                                </span>
                              </div>

                              <div className="tour-includes-wrapper">
                                <h6>Included:</h6>
                                <ul className="tour-includes-list">
                                  {tour.included.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <Link to={tour.link}>
                                <button className="book-btn">Book Now</button>
                              </Link>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </section>
                {/* <SearchBar /> */}
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">Premium Travel Services</h2>
            </Col>
            <ServiceList />
            <TrekComparison />
          </Row>
        </Container>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="experience">
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle="Experience" />
                <h2>Travel with comfort & confidence</h2>
                <p>Everything you need to make your trip memorable.</p>
              </div>

              <div className="counter__wrapper">
                <div className="counter__box">
                  <span>1k+</span>
                  <h6>Successful Trips</h6>
                </div>
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Happy Travelers</h6>
                </div>
                <div className="counter__box">
                  <span>5+</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="experience__img">
                <img src={experinceImg} alt="experience" loading="lazy" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <Subtitle subtitle="Gallery" />
              <h2 className="gallery__title">Traveler Memories</h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* VIDEO */}
      <div className="hero__video-wrapper">
        <VideoCarousel />
      </div>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <Subtitle subtitle="Fans Love" />
              <h2 className="testimonal__title">What our customers say</h2>
            </Col>
            <Col lg="12">
              <Testimonals />
            </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Home;