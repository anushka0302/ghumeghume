import React, { useEffect, useRef, useState, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';

import calculateAvgRating from '../utils/AvgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

// ✅ FIXED IMPORTS (Correct path: One level up)
import SeoData from '../components/SEO/SeoData';
import StructuredData from '../components/SEO/StructuredData';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  
  const email = "ghumeghume@proton.me";
  const subject = "Interested in your travel services";
  const body = "Hello, I found your contact information on the website and would like to know more about your services. Please get back to me at your earliest convenience.";

  // Fetch data from database
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  // Destructure properties from tour object with safe defaults
  const {
    photo = "",
    title = "",
    desc = "",
    price = "",
    address = "",
    reviews = [],
    city = "",
    distance = "",
    maxGroupSize = ""
  } = tour || {};

  // Format data
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert('Please sign in');
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
      // Optional: reload or update state to show new review immediately
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className='text-center pt-5'>Loading...</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          
          {!loading && !error && (
            <Row>
              <Col lg='8'>
                <div className='tour__content'>
                  <img src={photo} alt="" />
                  <div className='tour__info'>
                    <h2>{title}</h2>
                    <div className='d-flex align-items-center gap-5'>
                      <span className='tour__rating d-flex align-items-center gap-1'>
                        <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-line"></i>{address}
                      </span>
                    </div>
                    <div className='tour__extra-details'>
                      <span>
                        <i className="ri-map-pin-line"></i>{city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>₹{price}/ per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>{distance} k/m
                      </span>
                      <span>
                        <i className="ri-group-line"></i>{maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>

                    <strong>
                      <span className="button-wrapper">
                        For more details and price compensation contact us
                        <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} className='email-button'>
                          Here
                        </a>
                      </span>
                    </strong>
                  </div>

                  {/*================= Tour Reviews Section =============================== */}
                  <div className='tour__reviews mt-4'>
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                        <span onClick={() => setTourRating(1)}>
                          1 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i className="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i className="ri-star-fill"></i>
                        </span>
                      </div>
                      <div className='review__input'>
                        <input type='text' ref={reviewMsgRef} placeholder='share your thoughts' required />
                        <button className='btn primary__btn text-white' type='submit'>
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className='user__reviews'>
                      {reviews?.filter(Boolean).map((review, index) => (
                        <div className='review__item' key={index}>
                          <img src={avatar} alt='' />
                          <div className='w-100'>
                            <div className='d-flex align-items-center justify-content-between'>
                              <div>
                                <h5>{review?.username || "Anonymous"}</h5>
                                <p>
                                  {review?.createdAt
                                    ? new Date(review.createdAt).toLocaleDateString("en-US", options)
                                    : ""}
                                </p>
                              </div>
                              <span className='d-flex align-items-center'>
                                {review?.rating} <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review?.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>

                    {/* ✅ SEO COMPONENTS (Using safe destructured variables) */}
                    <SeoData 
                      title={title} 
                      description={desc ? desc.substring(0, 160) : `Book ${title} tour package.`} 
                    />
                    <StructuredData tour={{...tour, avgRating, reviews}} />

                  </div>
                  {/*================= Tour Reviews Section End =============================== */}
                </div>
              </Col>
              
              <Col lg='4'>
                 {/* ✅ Added tourId={id} which is required */}
                <Booking tour={tour} avgRating={avgRating} tourId={id} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;