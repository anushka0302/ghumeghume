import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import blogs from '../assets/data/blogs';
import '../styles/blog.css';

const Blogs = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ✅ FIX: Added marginTop: '80px' to push it below the fixed header */}
      {/* ✅ Removed className="common__section" to prevent style conflicts */}
      <section 
        className="blog-header-section"
        style={{ 
          marginTop: '80px', 
          background: '#f8f9fa', 
          padding: '60px 0', 
          textAlign: 'center' 
        }}
      >
        <Container>
          <Row>
            <Col lg="12">
              <h1 style={{ fontWeight: '800', color: '#0b2727', marginBottom: '10px' }}>Travel & Trekking Blogs</h1>
              <p style={{ color: '#777', fontSize: '1.1rem' }}>Tips, guides, and stories from the mountains</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-5">
        <Container>
          <Row>
            {blogs.map((item) => (
              <Col lg="4" md="6" sm="12" className="mb-4" key={item.id}>
                <div className="blog__item">
                  <div className="blog__img">
                    <img src={item.imgUrl} alt={item.title} />
                  </div>
                  <div className="blog__content">
                    <span className="blog__date"><i className="ri-calendar-line"></i> {item.date}</span>
                    <h5 className="blog__title">
                      <Link to={`/blogs/${item.id}`}>{item.title}</Link>
                    </h5>
                    <p className="blog__desc">{item.desc}</p>
                    <Link to={`/blogs/${item.id}`} className="read__more-btn">
                      Read More <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Blogs;