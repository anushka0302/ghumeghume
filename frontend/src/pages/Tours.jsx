import React, { useState, useEffect } from 'react';
import CommomSection from '../shared/CommomSection';
import '../styles/tour.css';
import TourCard from '../shared/TourCard';
import SearchBar from '../shared/SearchBar';
import Newsletter from '../shared/Newsletter';
import Popup from '../components/Popup/Popup.js'; 
import { Container, Row, Col } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);

    // Placeholder for an authentication check.
    const checkLoginStatus = () => {
      // In a real app, check localStorage or AuthContext
      const token = localStorage.getItem('token') || localStorage.getItem('user'); 
      const userIsLoggedIn = !!token; // Simple check if token exists
      
      // For now, based on your previous code which had "true" hardcoded or logic
      // I will keep it as per your previous logic but ensure it works.
      // If you want it always true for testing, set userIsLoggedIn = true;
      setIsLoggedIn(true); // Assuming you want tours visible for now based on your previous 'true' placeholder
      
      if (!true) { // Logic based on the placeholder above
        setShowLoginPopup(true);
      }
    };

    checkLoginStatus();
  }, [page, tourCount, tours]);

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>All Trekking Tours | Ghume Ghume</title>
        <meta name="description" content="Browse our complete list of trekking packages in Uttarakhand. From beginner-friendly walks to challenging summits." />
      </Helmet>

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
                    {/* ✅ Passed down logic inside TourCard for lazy loading if supported, or handled by browser */}
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
          <p>Please log in to view tours.</p>
        </Popup>
      )}
      <Newsletter />
    </>
  );
};

export default Tours;