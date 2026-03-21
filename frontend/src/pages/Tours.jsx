import React, { useState, useEffect } from 'react';
import CommomSection from '../shared/CommomSection';
import '../styles/tour.css';
import TourCard from '../shared/TourCard';
import SearchBar from '../shared/SearchBar';
import Newsletter from '../shared/Newsletter';
import SpinWheel from '../components/SpinWheel/SpinWheel'; 
import { Container, Row, Col } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { Helmet } from 'react-helmet-async';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [showSpinWheel, setShowSpinWheel] = useState(false);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);

    // Show wheel once per session after 3 seconds
    const alreadySpun = sessionStorage.getItem('has_spun_wheel');
    if (!alreadySpun) {
      const timer = setTimeout(() => setShowSpinWheel(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [page, tourCount]);

  return (
    <>
      <Helmet>
        <title>All Tours | Ghume Ghume</title>
        <meta name="description" content="Explore our CharDham and Trekking packages." />
      </Helmet>

      <CommomSection title={"All Tours"} />
      
      {/* <section className="pt-4">
        <Container>
          <Row>
            <SearchBar /> 
          </Row>
        </Container>
      </section> */}

      {showSpinWheel && (
        <SpinWheel 
          onClose={() => {
            setShowSpinWheel(false);
            sessionStorage.setItem('has_spun_wheel', 'true');
          }} 
        />
      )}

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
                    <span 
                      key={number} 
                      onClick={() => setPage(number)} 
                      className={page === number ? 'active__page' : ''}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;