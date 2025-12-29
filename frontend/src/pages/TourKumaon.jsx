import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "photoswipe/style.css";
import "../styles/tour-details.css";
import Booking from "../components/Booking/Booking";
import { Helmet } from 'react-helmet-async';
import Subtitle from "../shared/Subtitle";
import Newsletter from "../shared/Newsletter";

// ✅ Import centralized data
import trek from "../assets/data/trek";
import experienceImg from "../assets/images/Kainchidham.png";

const TourKumaon = () => {
  // ✅ GET DATA: Find Kumaon Circuit (ID 5)
  const tourData = trek.find((t) => t.id === 5) || {
    title: "Kumaon Spiritual Circuit",
    days: "2 Days",
    city: "Kathgodam",
  };

  // ✅ Finalized Business Logic
  const totalSUVPrice = 15000;
  const onlineToken = 7761; 
  const balanceOffline = 8000; 
  const perPersonCost = Math.floor(totalSUVPrice / 8);

  const handleBookScroll = () => {
    const bookingSection = document.getElementById("booking-form");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{tourData.title} | Burnout Recovery Ghume Ghume</title>
        <meta name="description" content="Cheaper than your Delhi commute! A 2-day spiritual burnout recovery trip to Kumaon." />
      </Helmet>

      {/* ✅ HERO SECTION */}
      <section
        className="tour-hero parallax-bg"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${experienceImg}) center/cover no-repeat`,
          backgroundAttachment: "fixed",
          padding: "100px 0"
        }}
      >
        <div className="tour-hero-content text-center">
          <h1 className="text-white display-3 fw-bold">{tourData.title}</h1>
          <p className="text-white-50 fs-4">
            Friday Office Exit • Monday Morning DSM Recovery • No Booking Date Required
          </p>

          <div className="commute-banner mt-4 mx-auto" style={{
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: '15px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h4 className="text-white mb-0">
              Only <span style={{color: '#faa935'}}>₹{perPersonCost}/Person</span> for 2 Days!
            </h4>
            <p className="text-light small mb-0">
              Cheaper than your Delhi to Noida or Gurugram office commute
            </p>
          </div>
        </div>
      </section>

      <section className="section-light pt-5">
        <Container>
          <Row>
            {/* === Main Content === */}
            <Col lg="8">
              <div className="tour-content">
                <Subtitle subtitle={'Cheaper Than Your Commute'} />
                <h2 className="section-title">Recover from Office Burnout</h2>
                <p className="section-desc">
                  This tour is <strong>always open</strong>. No booking dates required—just book and go. 
                  Specifically designed for teams of 7-9 people to reset before the Monday DSM meeting.
                </p>

                <div className="highlight-grid d-flex gap-4 flex-wrap my-4">
                  <div className="h-box p-3 bg-white shadow-sm rounded border-top border-warning border-3">
                    <h6 className="fw-bold"><i className="ri-leaf-line text-success"></i> Scenic Edge</h6>
                    <p className="small mb-0">Bhhalugad Waterfall: More peaceful and scenic than Nainital.</p>
                  </div>
                  <div className="h-box p-3 bg-white shadow-sm rounded border-top border-warning border-3">
                    <h6 className="fw-bold"><i className="ri-sun-line text-warning"></i> Himalayan Views</h6>
                    <p className="small mb-0">Stunning sunrise darshan at Jageshwar & Mukteshwar.</p>
                  </div>
                  <div className="h-box p-3 bg-white shadow-sm rounded border-top border-warning border-3">
                    <h6 className="fw-bold"><i className="ri-group-line text-primary"></i> Flexible Grouping</h6>
                    <p className="small mb-0">SUV capacity for 7, 8, or 9 people.</p>
                  </div>
                </div>

                <h3 className="mt-5 mb-4">Detailed Itinerary</h3>
                <div className="itinerary-timeline">
                  <div className="day-card p-4 mb-4 bg-white shadow-sm rounded border-start border-warning border-5">
                    <h5 className="fw-bold text-warning">Day 1: The Spiritual Circuit</h5>
                    <p className="mb-1"><strong>Route:</strong> Kathgodam (Haldwani) → Kainchi Dham → Kakrighat → Almora → Jageshwar Dham.</p>
                    <p className="small text-muted">Includes Neem Karoli Baba Ashram, Kasar Devi, and Chitai Golu Devta Temple. Night stay at Jageshwar.</p>
                  </div>

                  <div className="day-card p-4 bg-white shadow-sm rounded border-start border-warning border-5">
                    <h5 className="fw-bold text-warning">Day 2: Burnout Recovery</h5>
                    <p className="mb-1"><strong>Route:</strong> Jageshwar → Dol Ashram → Mukteshwar → Bhhalugad Waterfall → Kathgodam (Haldwani).</p>
                    <p className="small text-muted">Morning Darshan, Himalayan views, and a trek to the peaceful Bhhalugad waterfall before returning to base.</p>
                  </div>
                </div>

                {/* ✅ ADDED: INCLUSIONS SECTION */}
                <div className="inclusions-section mt-5">
                   <h3 className="mb-4">Package Inclusions</h3>
                   <Row>
                      <Col md="6">
                        <ul className="list-unstyled">
                          <li className="mb-2"><i className="ri-checkbox-circle-line text-success me-2"></i> Dedicated SUV (Bolero/Innova)</li>
                          <li className="mb-2"><i className="ri-checkbox-circle-line text-success me-2"></i> Fuel and Driver Charges</li>
                          <li className="mb-2"><i className="ri-checkbox-circle-line text-success me-2"></i> All Toll and State Taxes</li>
                        </ul>
                      </Col>
                      <Col md="6">
                        <ul className="list-unstyled">
                          <li className="mb-2"><i className="ri-checkbox-circle-line text-success me-2"></i> Himalayan Sightseeing</li>
                          <li className="mb-2"><i className="ri-checkbox-circle-line text-success me-2"></i> Spiritual Temple Darshans</li>
                          <li className="mb-2"><i className="ri-checkbox-circle-line text-success me-2"></i> Bhhalugad Waterfall Trek</li>
                        </ul>
                      </Col>
                   </Row>
                </div>
              </div>
            </Col>

            {/* === Sidebar === */}
            <Col lg="4">
              <div id="booking-form">
                <Booking 
                  tour={{ 
                    ...tourData, 
                    price: totalSUVPrice, 
                    isSUV: true,
                    onlineToken: onlineToken,
                    balance: balanceOffline 
                  }} 
                  tourId="kumaon-spiritual-circuit" 
                />
                
                <div className="p-4 mt-3 rounded bg-white shadow-sm border border-warning">
                  <h5 className="fw-bold mb-3">Booking Instructions</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Online Booking:</span>
                    <span className="fw-bold text-success">₹7,761</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Offline (On Arrival):</span>
                    <span className="fw-bold">₹8,000</span>
                  </div>
                  <hr />
                  <p className="text-muted x-small mb-0">
                    <i className="ri-calendar-check-line"></i> **No Date Required:** Book anytime. Tour is always open for groups of up to 8-9 people.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourKumaon;