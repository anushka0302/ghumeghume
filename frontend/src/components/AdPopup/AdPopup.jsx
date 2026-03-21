import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './adpopup.css';

const AdPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show the ad after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="mini-ad-popup">
            <button className="close-ad" onClick={() => setIsVisible(false)}>&times;</button>
            <div className="ad-inner">
                <div className="ad-img-container">
                    <img 
                        src="https://img.icons8.com/color/96/pagoda.png" 
                        alt="Temple Icon" 
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                    />
                </div>
                <div className="ad-text">
                    <h6>New Tours Added!</h6>
                    <p>Check out our latest group departures.</p>
                    <Link title="Explore Tours" to="/tours" onClick={() => setIsVisible(false)}>
                        Explore Now <i className="ri-arrow-right-s-line"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdPopup;