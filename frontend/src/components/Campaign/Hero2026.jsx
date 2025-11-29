import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import '../../styles/campaign.css'; // Import the CSS
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

const Hero2026 = () => {
  // Image URL constant for SEO usage
  const bgImage = "https://images.unsplash.com/photo-1518002171953-a080ee802312?q=80&w=2070&auto=format&fit=crop";

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Indian Himalayas: #1 Global Travel Trend 2026 | Ghume Ghume</title>
        <meta name="description" content="The World is Coming to Devbhoomi Uttarakhand. The Himalayas are the top trending destination for 2026. Beat the crowds with Ghume Ghume." />
        <meta property="og:title" content="Indian Himalayas: #1 Global Travel Trend 2026" />
        <meta property="og:description" content="Experience the magnetic mystery of Kasar Devi, the silence of Dunagiri, and the power of Adi Kailash now." />
        <meta property="og:image" content={bgImage} />
      </Helmet>

      <div className="hero-container">
        {/* Background Image */}
        <div 
          className="hero-bg"
          style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>
        <div className="hero-overlay"></div>

        {/* Content */}
        <div className="hero-content">
          <div className="trend-badge">
            <TrendingUp size={16} />
            <span>#1 Global Trend 2026</span>
          </div>

          <h1 className="hero-title">
            The World is Coming to <br />
            <span className="highlight-text">
              Devbhoomi Uttarakhand.
            </span>
          </h1>

          <p className="hero-subtitle">
            The Himalayas are the top trending destination for 2026. 
            <strong> Beat the crowds.</strong> Experience the magnetic mystery of Kasar Devi, the silence of Dunagiri, and the power of Adi Kailash now.
          </p>

          <a href="#featured-treks" className="cta-button">
            Explore 2026 Packages
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero2026;