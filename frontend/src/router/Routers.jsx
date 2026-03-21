import React, { Suspense } from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
const AdPopup = React.lazy(() => import('../components/AdPopup/AdPopup'));

// === 1. Lazy Import All Pages ===

// Main Pages
const Home = React.lazy(() => import('../pages/Home'));
const Tours = React.lazy(() => import('../pages/Tours'));
const TourDetails = React.lazy(() => import('../pages/TourDetails'));
const Trend2026 = React.lazy(() => import('../pages/Trend2026'));
const SearchResultList = React.lazy(() => import('../pages/SearchResultList'));
const About = React.lazy(() => import('../pages/About'));
const WhyUs = React.lazy(() => import('../components/WhyUs/WhyUs'));
const Contact = React.lazy(() => import('../pages/Contact'));
const FAQ = React.lazy(() => import('../pages/FAQ'));
const GearList = React.lazy(() => import('../pages/GearList'));

// Blog Pages
const Blogs = React.lazy(() => import('../pages/Blogs'));
const BlogDetails = React.lazy(() => import('../pages/BlogDetails'));

// Auth & System
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const ThankYou = React.lazy(() => import('../pages/ThankYou'));

// Specific Trek Routes
const TourDayaraBugyal = React.lazy(() => import('../pages/TourDayaraBugyal'));
const TourDoditalDarwa = React.lazy(() => import('../pages/TourDoditalDarwa'));
const HaruntaBugyalandNachiketaTal = React.lazy(() => import("../pages/HaruntaBugyalandNachiketaTal"));
// ✅ Added Kedarkantha Page Import
const TourKedarkantha = React.lazy(() => import('../pages/TourKedarkantha'));

// Expedition Types
const Meditation = React.lazy(() => import('../pages/Meditation'));
const Enlightenment = React.lazy(() => import('../pages/Enlightenment'));
const RemoteWorkplace = React.lazy(() => import('../pages/RemoteWorkplace'));

// Policies
const RefundPolicy = React.lazy(() => import('../pages/RefundPolicy'));
const Terms = React.lazy(() => import('../pages/Terms'));
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'));
const ShippingPolicy = React.lazy(() => import('../pages/ShippingPolicy'));

const TourKumaon = React.lazy(() => import('../pages/TourKumaon')); // ✅ Add this
const TourKumaon1 = React.lazy(() => import('../pages/TourKumaon1')); // ✅ Add this

// Loading Spinner
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '50vh' }}>
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const Routers = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
      <AdPopup />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          
          

          {/* ✅ Trek Routes */}
          <Route path="/tour/dayara-bugyal" element={<TourDayaraBugyal />} />
          <Route path="/tour/harunta-bugyal-nachiketa-tal" element={<HaruntaBugyalandNachiketaTal />} />
          <Route path="/tour/dodital-darwa-pass" element={<TourDoditalDarwa />} />
          <Route path="/tour/kedarkantha-trek" element={<TourKedarkantha />} />

          <Route path="/tour/kumaon-spiritual-circuit" element={<TourKumaon />} /> 
          <Route path="/tour/kumaon-luxury-experience" element={<TourKumaon1 />} />

          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path='/himalayas-2026' element={<Trend2026 />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-us" element={<WhyUs />} />

          {/* ✅ Blog Routes */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/expeditions/meditation" element={<Meditation />} />
          <Route path="/expeditions/enlightenment" element={<Enlightenment />} />
          <Route path="/expeditions/remote-workplace" element={<RemoteWorkplace />} />

          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/tours/search" element={<SearchResultList />} />
          
          {/* Policy Routes */}
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/gear-list" element={<GearList />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default Routers;