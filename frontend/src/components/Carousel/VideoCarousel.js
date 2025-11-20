import React, { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import "./VideoCarousel.css";

import vid1 from "../../assets/images/hero-video01.mp4";
import vid2 from "../../assets/images/hero-video02.mp4";
import vid3 from "../../assets/images/hero-video03.mp4";
import vid4 from "../../assets/images/hero-video04.mp4";
import vid5 from "../../assets/images/hero-video05.mp4";
import vid6 from "../../assets/images/hero-video06.mp4";
import vid7 from "../../assets/images/hero-video07.mp4";
import vid8 from "../../assets/images/hero-video08.mp4";

const VideoCarousel = () => {
  const slides = [
    { id: 1, title: "Nanital", credit: "City of Lakes", src: vid1 },
    { id: 2, title: "Haridwar", credit: "HariDashan HarkiPauri", src: vid2 },
    { id: 3, title: "Kedar Valley", credit: "Kedarnath Yatra", src: vid3 },
    { id: 4, title: "Srinagar", credit: "On Alaknanda River", src: vid4 },
    { id: 5, title: "Rishikesh Rafting", credit: "Experience of a lifetime", src: vid5 },
    { id: 6, title: "Chopta", credit: "Way to Tungnath", src: vid6 },
    { id: 7, title: "Landour, Mussoorie", credit: "The fairer princess", src: vid7 },
    { id: 8, title: "Uttarkashi", credit: "Water Sports", src: vid8 },
  ];

  const [index, setIndex] = useState(0);

  // ✅ useCallback prevents re-creation of function
  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // ✅ Now dependency is correct & no warning
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="video-slider">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`video-slide ${i === index ? "active" : ""}`}
        >
          <ReactPlayer
            url={slide.src}
            playing={i === index}
            loop
            muted
            width="100%"
            height="100%"
          />

          <div className="slide-text">
            <h2>{slide.title}</h2>
            <p>{slide.credit}</p>
          </div>
        </div>
      ))}

      <button className="arrow left" onClick={prevSlide}>❮</button>
      <button className="arrow right" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default VideoCarousel;
