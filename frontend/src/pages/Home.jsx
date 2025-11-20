import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";

import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import experinceImg from "../assets/images/experience.png";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonals from "../components/Testimonals/Testimonals";
import Newsletter from "../shared/Newsletter";
import Subtitle from "../shared/Subtitle";
import VideoCarousel from "../components/Carousel/VideoCarousel";
import TrekComparison from '../components/Weather/TrekComparison';

import { Link } from "react-router-dom";
// REMOVED: import ghumeLogo from "../assets/images/logo.png";

const sampleTours = [
  {
    id: 1,
    title: "DAYARA BUGYAL", // ALL CAPS for style
    price: "₹ 10500 Per Person",
    days: "4 days / 3 nights",
    included: [
      "Boating",
      "Water sport",
      "Stay",
      "Campsite",
      "Breakfast, Lunch & Dinner",
    ],
    img: "https://trekthehimalayas.com/images/DayaraBugyalTrek/GalleryDesktop/Winter/fa0b8d9c-5950-4e8d-855e-3a1e888ef6ba_Dayara-Bugyal-6.webp",
    link: "/tour/dayara-bugyal",
  },
  {
    id: 2,
    title: "HARUNTA BUGYAL AND NACHIKETA TAL", // ALL CAPS for style
    price: "₹ 10500 Per Person",
    days: "4 days / 3 nights",
    included: [
      "Boating",
      "Water sport",
      "Stay",
      "Campsite",
      "Breakfast, Lunch & Dinner",
    ],
    img: "https://www.greatadventure.in/wp-content/uploads/2022/06/Harunta-Bugyal-4.jpeg.webp",
    link: "/tour/harunta-bugyal-nachiketa-tal",
  },
  {
    id: 3,
    title: "DODITAL AND DARWA TOP", // ALL CAPS for style
    price: "₹ 12500 Per Person",
    days: "5 days / 4 nights",
    included: [
      "Boating",
      "Water sport",
      "Stay",
      "Campsite",
      "Breakfast, Lunch & Dinner",
    ],
    img: "https://www.tataneu.com/pages/travel/_next/image?url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Ftntravel%2Fblogimages%2FTawang-de665488-97bf-4e3d-8d06-7ba8c5f367a4.webp&w=3840&q=75",
    link: "/tour/dodital-darwa-pass",
  },
];



const Home = () => {
  return (
    <>
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
                      </Col>
                    </Row>

                    <Row className="tour-card-row">
                      {sampleTours.map((tour) => (
                        <Col lg="4" md="6" sm="12" key={tour.id}>
                          <div className="tour-card">
                            <div className="tour-card-image-wrapper">
                              <img src={tour.img} alt={tour.title} />
                              
                              {/* REMOVED the logo <img> tag that was here */}
                              
                              <h5 className="tour-title">{tour.title}</h5>
                              {/* NEW: "TREK" badge */}
                              <span className="tour-trek-badge">TREK</span>
                            </div>

                            <div className="tour-info">
                              <p className="tour-price">{tour.price}</p>
                              <p className="tour-duration">{tour.days}</p>

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
                <img src={experinceImg} alt="experience" />
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