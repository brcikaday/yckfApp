import "../css/cards.css";
import {
  FaClock,
  FaPlay,
  FaDownload,
  FaBookReader,
  FaBullhorn,
  FaShieldAlt,
  FaGraduationCap,
  FaHandsHelping,
  FaUsers,
  FaGlobe,
  FaChalkboardTeacher,
} from "react-icons/fa";

export function Card1({ title, content }) {
  return (
    <div className="card1">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export function Card2({ title, content }) {
  const getIcon = (title, content) => {
    // Use the content (label) to pick the icon when the title is numeric (e.g. "1000+").
    const key = /\d/.test(String(title)) ? content : title;
    switch (key) {
      case "Cybersecurity Education":
        return <FaBookReader className="icon blue" />;
      case "Public Awareness Campaigns":
        return <FaBullhorn className="icon yellow" />;
      case "Policy Advocacy":
        return <FaShieldAlt className="icon green" />;
      case "Youth Programs & School Outreach":
        return <FaGraduationCap className="icon purple" />;
      case "Community Training":
        return <FaHandsHelping className="icon pink" />;
      case "Individuals Trained":
        return <FaUsers className="icon blue" />;
      case "Workshops Conducted":
        return <FaChalkboardTeacher className="icon green" />;
      case "Communities Reached":
        return <FaGlobe className="icon yellow" />;
      default:
        return null;
    }
  };

  return (
    <div className="impact-card-content">
      <div className="icon-container">{getIcon(title, content)}</div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

import React from "react";

export function CourseCard({
  cors_title,
  time,
  level,
  description,
  tags,
  video_url,
  video_pdf,
  is_premium,
}) {
  return (
    <div className="course-card">
      <h3 className="course-title">{cors_title}</h3>

      <div className="course-meta">
        <span className="course-time">
          <FaClock /> {time}
        </span>
        <span className="course-level">{level}</span>
      </div>

      <p className="course-desc">{description}</p>

      <div className="course-subtitle">What you'll learn:</div>

      <div className="tags">
        <span>{tags}</span>
        <span>{tags}</span>
        <span>{tags}</span>
        <span>{tags}</span>
      </div>

      <div className="buttons">
        <button className="btn primary" onClick={video_url}>
          <FaPlay /> Watch Video
        </button>
        <button className="btn secondary" onClick={video_pdf}>
          <FaDownload /> Download PDF
        </button>
      </div>

      <div className="footer">
        <span className="free-access">
          {is_premium ? "Premium Access" : "Free Access"}
        </span>
        <span className="no-reg">No registration required</span>
      </div>
    </div>
  );
}

// export function Card3({im})
