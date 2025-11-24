import { useEffect } from 'react';

const SeoData = ({ title, description }) => {
  useEffect(() => {
    // 1. Update the Browser Tab Title
    document.title = `${title} | Ghume Ghume`;

    // 2. Update the Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    
    // If <meta name="description"> doesn't exist, create it
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    
    // Set the new description content
    metaDesc.setAttribute("content", description);

    // Cleanup: Reset title when leaving the page (Optional)
    return () => {
       // document.title = "Ghume Ghume | Trekking & Spiritual Tours";
    };
  }, [title, description]);

  return null; // Renders nothing visibly
};

export default SeoData;