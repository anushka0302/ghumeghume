import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import '../../styles/campaign.css'; // Import the CSS

const Hero2026 = () => {
  return (
    <div className="hero-container">
      {/* Background Image */}
      <div 
        className="hero-bg"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518002171953-a080ee802312?q=80&w=2070&auto=format&fit=crop')" }}
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
  );
};

export default Hero2026;