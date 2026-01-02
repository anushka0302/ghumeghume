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

// ✅ 1. Import Google OAuth and Analytics
import { GoogleOAuthProvider } from "@react-oauth/google"; // Added for Google Login
import ReactGA from "react-ga4";

// ✅ 2. Initialize Google Analytics
ReactGA.initialize("G-Z0CHQ22GEK");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* ✅ 3. Wrap everything with GoogleOAuthProvider */}
    {/* Replace the string below with your actual Client ID from Google Console */}
    <GoogleOAuthProvider clientId="594281146028-nlloe70ov5pbfduqkv0nhfjckkendtvc.apps.googleusercontent.com">
      <HelmetProvider> 
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// ✅ Register Service Worker
serviceWorkerRegistration.register();

// ✅ 4. Send initial page view
ReactGA.send({ hitType: "pageview", page: window.location.pathname });