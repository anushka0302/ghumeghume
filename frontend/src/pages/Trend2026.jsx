import React from 'react';
// Adjust these imports based on your actual file locations
import Header from '../components/Header/Header'; 
import Footer from '../components/Footer/Footer'; 
import Hero2026 from '../components/Campaign/Hero2026';
import UttarakhandCollection from '../components/Campaign/UttarakhandCollection';
import Newsletter from '../shared/Newsletter';

// 1. Import your SEO Component
import SeoData from '../components/SEO/SeoData';

const Trend2026 = () => {
  return (
    <>
      {/* 2. Inject the SEO Keywords specifically for this Campaign */}
      <SeoData 
        title="Indian Himalayas: #1 Global Travel Trend 2026" 
        description="The Indian Himalayas are the top travel destination for 2026. Beat the crowd and book exclusive spiritual treks to Kasar Devi, Dunagiri, and Adi Kailash with Ghume Ghume." 
      />

      <Header />
      <Hero2026 />
      <UttarakhandCollection />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Trend2026;