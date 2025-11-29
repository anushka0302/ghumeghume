import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import blogs from '../assets/data/blogs';
import '../styles/blog.css';
import { Helmet } from 'react-helmet-async'; // ✅ Import Helmet for SEO/Speed

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find(blog => blog.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return <div className="text-center py-5"><h3>Blog not found</h3></div>
  }

  // Current URL for sharing
  const currentUrl = window.location.href;
  const shareText = encodeURIComponent(`Check out this amazing trek: ${blog.title}`);

  return (
    <>
      {/* ✅ SEO & Performance Metadata */}
      <Helmet>
        <title>{blog.title} - Ghume Ghume</title>
        <meta name="description" content={blog.desc} />
        {/* These tags help social media apps load previews faster if they support dynamic scraping */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.desc} />
        <meta property="og:image" content={blog.imgUrl} />
        <meta property="og:url" content={currentUrl} />
      </Helmet>

      <section className="blog-details-section">
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="blog__details">
                {/* ✅ Added loading="lazy" for speed */}
                <img 
                  src={blog.imgUrl} 
                  alt={blog.title} 
                  className="blog__details-img" 
                  loading="lazy" 
                />
                
                <h2 className="blog__details-title">{blog.title}</h2>
                
                <div className="blog__meta">
                  <span><i className="ri-user-line"></i> {blog.author}</span>
                  <span><i className="ri-calendar-line"></i> {blog.date}</span>
                </div>

                {/* Blog Content */}
                <div 
                  className="blog__details-body"
                  dangerouslySetInnerHTML={{__html: blog.content}}
                ></div>

                {/* Social Share Buttons */}
                <div className="blog__share-area mt-5">
                  <h5>Share this post:</h5>
                  <div className="d-flex gap-3 mt-3 flex-wrap">
                    <a 
                      href={`https://api.whatsapp.com/send?text=${shareText} ${currentUrl}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="share-btn whatsapp"
                    >
                      <i className="ri-whatsapp-line"></i> WhatsApp
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="share-btn facebook"
                    >
                      <i className="ri-facebook-circle-fill"></i> Facebook
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="share-btn twitter"
                    >
                      <i className="ri-twitter-x-line"></i> Twitter
                    </a>
                  </div>
                </div>

                {/* Book Now CTA */}
                <div className="blog__cta-box mt-5 p-4 text-center">
                  <h3>Ready to experience this?</h3>
                  <p>Secure your spot for <strong>{blog.title}</strong> today.</p>
                  <Link to={blog.trekLink}>
                    <Button className="btn primary__btn mt-3" style={{ padding: '12px 35px', fontSize: '1.1rem' }}>
                      Book This Trek Now
                    </Button>
                  </Link>
                </div>

              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogDetails;