import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { HelmetProvider } from 'react-helmet-async'; 
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; 

// ✅ 1. Import Google Analytics Library
import ReactGA from "react-ga4";

// ✅ 2. Initialize Google Analytics with your Measurement ID
ReactGA.initialize("G-Z0CHQ22GEK");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider> 
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// ✅ Register Service Worker
serviceWorkerRegistration.register();

// ✅ 3. Optional: Send initial page view (to catch the first load)
ReactGA.send({ hitType: "pageview", page: window.location.pathname });