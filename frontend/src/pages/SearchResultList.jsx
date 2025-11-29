import React, { useState, useEffect } from 'react';
import CommomSection from './../shared/CommomSection';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import TourCard from './../shared/TourCard';
import Newsletter from './../shared/Newsletter';
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Search Results | Ghume Ghume</title>
        <meta name="description" content="Explore the trekking tours matching your search. Plan your perfect adventure with Ghume Ghume." />
        <meta name="robots" content="noindex" /> {/* Search results pages usually shouldn't be indexed */}
      </Helmet>

      <CommomSection title={'Tour Search Result'} />
      <section>
        <Container>
          <Row>
            {
              !data || data.length === 0 ? (
                <h4 className='text-center'>No tour found</h4>
              ) : (
                data?.map(tour => (
                  <Col lg='3' className='mb-4' key={tour._id}>
                    <TourCard tour={tour} />
                  </Col>
                ))
              )
            }
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default SearchResultList;