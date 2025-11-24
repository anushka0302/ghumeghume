import React, { useEffect } from 'react';

const CacheBuster = () => {
  useEffect(() => {
    // Check for new version every 1 minute
    const interval = setInterval(() => {
      checkVersion();
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  const checkVersion = () => {
    fetch('/meta.json', { cache: "no-store" })
      .then((response) => response.json())
      .then((meta) => {
        const latestVersionDate = meta.metaDate;
        const currentVersionDate = localStorage.getItem('appVersionDate');

        if (latestVersionDate && currentVersionDate && latestVersionDate > currentVersionDate) {
          // New version found!
          console.log("New version found. Refreshing...");
          localStorage.setItem('appVersionDate', latestVersionDate);
          
          // Force hard reload
          window.location.reload(true); 
        } else if (!currentVersionDate) {
          // First load, set the version
          localStorage.setItem('appVersionDate', latestVersionDate);
        }
      })
      .catch((err) => {
        console.error('Error checking version:', err);
      });
  };

  return null; // This component renders nothing
};

export default CacheBuster;