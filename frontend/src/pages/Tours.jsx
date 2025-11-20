import React, { useState, useEffect } from 'react';
import CommomSection from '../shared/CommomSection';
import '../styles/tour.css';
import TourCard from '../shared/TourCard';
import SearchBar from '../shared/SearchBar';
import Newsletter from '../shared/Newsletter';
import Popup from '../components/Popup/Popup.js'; // Make sure this component is correctly imported
import { Container, Row, Col } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  // Assuming `isLoggedIn` will be replaced by your actual authentication check
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);

    // Placeholder for an authentication check. You would replace this with your actual logic.
    const checkLoginStatus = () => {
      const userIsLoggedIn = true; // Placeholder; replace with actual login check
      setIsLoggedIn(userIsLoggedIn);
      if (!userIsLoggedIn) {
        setShowLoginPopup(true);
      }
    };

    checkLoginStatus();
  }, [page, tourCount, tours]);

  return (
    <>
      <CommomSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {isLoggedIn ? (
        <section className='pt-0'>
          <Container>
            {loading && <h4 className='text-center pt-5'>Loading...</h4>}
            {error && <h4 className='text-center pt-5'>{error}</h4>}
            {!loading && !error && (
              <Row>
                {tours?.map((tour) => (
                  <Col lg='3' md='6' sm='6' className="mb-4" key={tour._id}>
                    <TourCard tour={tour} />
                  </Col>
                ))}
                <Col lg='12'>
                  <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                    {[...Array(pageCount).keys()].map((number) => (
                      <span key={number} onClick={() => setPage(number)} className={page === number ? 'active__page' : ''}>
                        {number + 1}
                      </span>
                    ))}
                  </div>
                </Col>
              </Row>
            )}
          </Container>
        </section>
      ) : (
        <Popup isOpen={showLoginPopup} closePopup={() => setShowLoginPopup(false)}>
          {/* Implement your login message or form here */}
          <p>Please log in to view tours.</p>
        </Popup>
      )}
      <Newsletter />
    </>
  );
};

export default Tours;