import React from 'react';
import { MapPin, Calendar, Mountain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/campaign.css'; // Import the CSS
import { spiritualTreks } from '../../assets/data/tourData';

const UttarakhandCollection = () => {
  return (
    <section id="featured-treks" className="collection-section">
      <div className="container"> {/* Using Bootstrap container class */}
        
        <div className="section-header">
          <h2 className="section-title">The Untold Himalayas</h2>
          <p className="hero-subtitle" style={{ color: '#666' }}>
            Beyond the tourist traps. We focus on Spiritual Energy Centers and Raw Adventure.
          </p>
        </div>

        <div className="trek-grid">
          {spiritualTreks.map((trek) => (
            <div key={trek.id} className="trek-card">
              
              <div className="card-image-wrapper">
                <img src={trek.image} alt={trek.title} className="card-img" />
                <div className="district-badge">
                  <MapPin size={12} />
                  {trek.district}
                </div>
              </div>

              <div className="card-content">
                <span className="trek-tag">{trek.tag}</span>
                <h3 className="trek-title">{trek.title}</h3>
                <p className="trek-desc">{trek.description}</p>

                <div className="trek-meta">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={14} />
                    <span>{trek.days}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Mountain size={14} />
                    <span>{trek.difficulty}</span>
                  </div>
                </div>

                <div className="trek-footer">
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#999' }}>Starting from</span>
                    <div className="price-tag">{trek.price}</div>
                  </div>
                  <Link to={`/tours/${trek.id}`} className="arrow-btn">
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UttarakhandCollection;