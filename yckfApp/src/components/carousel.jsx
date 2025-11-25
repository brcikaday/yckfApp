import React, { useState, useRef, useEffect } from "react";
import "../css/carousel.css"; // move styles here

const testimonials = [
  {
    text: "The workshops and training were essential to my understanding of cybersecurity. I now feel equipped to handle potential threats.",
    name: "Jane Smith",
    role: "IT Professional",
    img: "https://via.placeholder.com/60",
  },
  {
    text: "As a business owner, I feel more confident about my company's online security. Thanks to the foundation's workshops!",
    name: "John Doe",
    role: "Tech Entrepreneur",
    img: "https://via.placeholder.com/60",
  },
  {
    text: "The community-driven approach is what makes this foundation stand out. I gained so much insight into securing my online presence.",
    name: "Emily Davies",
    role: "Security Analyst",
    img: "https://via.placeholder.com/60",
  },
  {
    text: "The trainers were patient and explained concepts in a simple way. I recommend this to anyone starting in cybersecurity.",
    name: "Michael Lee",
    role: "Student",
    img: "https://via.placeholder.com/60",
  },
  {
    text: "This foundation gave me the tools to secure my company website and protect sensitive customer data.",
    name: "Sophia Brown",
    role: "Web Developer",
    img: "https://via.placeholder.com/60",
  },
];

const CommunityCarousel = () => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      const firstCard = trackRef.current.querySelector(".card");
      if (firstCard) setCardWidth(firstCard.getBoundingClientRect().width);
    }
    const handleResize = () => {
      if (trackRef.current) {
        const firstCard = trackRef.current.querySelector(".card");
        if (firstCard) setCardWidth(firstCard.getBoundingClientRect().width);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (index < testimonials.length - 3) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="testimonial-section">
      <h2>What Our Community Says</h2>
      <p>
        Hear from the cybersecurity professionals and students who have been
        part of our community
      </p>

      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={handlePrev}>
          &#10094;
        </button>
        <div
          className="carousel-track"
          ref={trackRef}
          style={{ transform: `translateX(-${index * cardWidth}px)` }}
        >
          {testimonials.map((item, i) => (
            <div className="card" key={i}>
              <div className="card-content">
                <div className="quote">❝</div>
                <p>{item.text}</p>
                <div className="profile">
                  <img src={item.img} alt={item.name} />
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-btn next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default CommunityCarousel;
