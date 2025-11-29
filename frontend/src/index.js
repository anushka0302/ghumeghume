import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { HelmetProvider } from 'react-helmet-async'; // ✅ For SEO & Speed
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // ✅ For Offline/PWA

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider> {/* ✅ Wrap everything for Head management */}
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// ✅ Register Service Worker to cache assets (faster load times)
serviceWorkerRegistration.register();