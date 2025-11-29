import React from 'react';
// Adjust these imports based on your actual file locations
import Header from '../components/Header/Header'; 
import Footer from '../components/Footer/Footer'; 
import Hero2026 from '../components/Campaign/Hero2026';
import UttarakhandCollection from '../components/Campaign/UttarakhandCollection';
import Newsletter from '../shared/Newsletter';
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import


const Trend2026 = () => {
  return (
    <>
      {/* ✅ SEO Metadata via Helmet */}
      <Helmet>
        <title>Indian Himalayas: #1 Global Travel Trend 2026 | Ghume Ghume</title>
        <meta name="description" content="The Indian Himalayas are the top travel destination for 2026. Beat the crowd and book exclusive spiritual treks to Kasar Devi, Dunagiri, and Adi Kailash with Ghume Ghume." />
        <meta property="og:title" content="Indian Himalayas: #1 Global Travel Trend 2026" />
        <meta property="og:description" content="The Indian Himalayas are the top travel destination for 2026. Beat the crowd and book exclusive spiritual treks to Kasar Devi, Dunagiri, and Adi Kailash with Ghume Ghume." />
      </Helmet>

      <Header />
      <Hero2026 />
      <UttarakhandCollection />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Trend2026;
