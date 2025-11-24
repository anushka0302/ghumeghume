import React, { useEffect } from 'react';

const StructuredData = ({ tour }) => {
  useEffect(() => {
    if (!tour) return;

    const scriptId = "structured-data-jsonld";
    
    // Prevent duplicate scripts
    let script = document.getElementById(scriptId);
    if (script) {
        document.head.removeChild(script);
    }

    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';

    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": tour.title,
      "image": [tour.photo],
      "description": tour.desc,
      "brand": {
        "@type": "Brand",
        "name": "Ghume Ghume"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": tour.price,
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": tour.avgRating || "4.5",
        "reviewCount": tour.reviews?.length || "10"
      }
    };

    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) document.head.removeChild(existingScript);
    }
  }, [tour]);

  return null;
};

export default StructuredData;