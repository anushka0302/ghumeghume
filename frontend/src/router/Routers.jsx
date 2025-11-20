import React, { Suspense } from 'react'; // Added Suspense
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';

// === 1. Lazy Import All Pages ===

// Main Pages
const Home = React.lazy(() => import('../pages/Home'));
const Tours = React.lazy(() => import('../pages/Tours'));
const TourDetails = React.lazy(() => import('../pages/TourDetails'));
const SearchResultList = React.lazy(() => import('../pages/SearchResultList'));
const About = React.lazy(() => import('../pages/About'));
const WhyUs = React.lazy(() => import('../components/WhyUs/WhyUs'));
const Contact = React.lazy(() => import('../pages/Contact'));
const FAQ = React.lazy(() => import('../pages/FAQ'));
const GearList = React.lazy(() => import('../pages/GearList'));

// Auth & System
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const ThankYou = React.lazy(() => import('../pages/ThankYou'));

// Specific Trek Routes
const TourDayaraBugyal = React.lazy(() => import('../pages/TourDayaraBugyal'));
const TourDoditalDarwa = React.lazy(() => import('../pages/TourDoditalDarwa'));
const HaruntaBugyalandNachiketaTal = React.lazy(() => import("../pages/HaruntaBugyalandNachiketaTal"));

// Expedition Types
const Meditation = React.lazy(() => import('../pages/Meditation'));
const Enlightenment = React.lazy(() => import('../pages/Enlightenment'));
const RemoteWorkplace = React.lazy(() => import('../pages/RemoteWorkplace'));

// Policies (Perfect for lazy loading as they are rarely visited)
const RefundPolicy = React.lazy(() => import('../pages/RefundPolicy'));
const Terms = React.lazy(() => import('../pages/Terms'));
const PrivacyPolicy = React.lazy(() => import('../pages/PrivacyPolicy'));
const ShippingPolicy = React.lazy(() => import('../pages/ShippingPolicy'));

// Simple Loading Component for the Suspense Fallback
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center w-100" style={{ height: '50vh' }}>
    {/* You can replace this text with a real <Spinner> component if using Reactstrap */}
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const Routers = () => {
  return (
    <AuthProvider>
      {/* === 2. Wrap Routes in Suspense === */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />

          {/* ✅ Direct Static Page */}
          <Route path="/tour/dayara-bugyal" element={<TourDayaraBugyal />} />
          <Route path="/tour/harunta-bugyal-nachiketa-tal" element={<HaruntaBugyalandNachiketaTal />} />
          <Route path="/tour/dodital-darwa-pass" element={<TourDoditalDarwa />} />
          <Route path="/tour/:id" element={<TourDetails />} />

          <Route path="/tours" element={<Tours />} />
          <Route path="/about" element={<About />} />
          
          {/* WhyUs Route */}
          <Route path="/why-us" element={<WhyUs />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/expeditions/meditation" element={<Meditation />} />
          <Route path="/expeditions/enlightenment" element={<Enlightenment />} />
          <Route path="/expeditions/remote-workplace" element={<RemoteWorkplace />} />

          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/tours/search" element={<SearchResultList />} />
          
          {/* POLICY ROUTES */}
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