"use client";

import { FaClock, FaPlay, FaDownload, FaTag } from "react-icons/fa";
import "../styles/CourseCard.css";

export function CourseCard({
  id,
  cors_title,
  time,
  level,
  description,
  tags,
  video_url,
  video_pdf,
  is_premium,
  is_multipart,
  is_enrolled,
  onEnroll,
  onViewCourse,
}) {
  const handleWatchVideo = (e) => {
    e.stopPropagation();
    if (video_url) {
      window.open(video_url, "_blank");
    }
  };

  const handleDownloadPDF = (e) => {
    e.stopPropagation();
    if (video_pdf) {
      window.open(video_pdf, "_blank");
    }
  };

  const handleEnroll = (e) => {
    e.stopPropagation();
    if (onEnroll) {
      onEnroll(id);
    }
  };

  const handleViewCourse = (e) => {
    e.stopPropagation();
    if (onViewCourse) {
      onViewCourse(id);
    }
  };

  return (
    <div className="course-card">
      <div className="course-header">
        <h3 className="course-title">{cors_title}</h3>
        <span className={`access-badge ${is_premium ? "premium" : "free"}`}>
          {is_premium ? "Premium" : "Free"}
        </span>
      </div>

      <div className="course-meta">
        <span className="course-time">
          <FaClock /> {time}
        </span>
        <span className="course-level">{level}</span>
      </div>

      <p className="course-desc">{description}</p>

      <div className="course-subtitle">What you'll learn:</div>

      <div className="tags">
        {tags &&
          tags.map((tag, idx) => (
            <span key={idx} className="tag">
              <FaTag /> {tag}
            </span>
          ))}
      </div>

      {is_multipart ? (
        <div className="buttons">
          <button className="btn primary full-width" onClick={handleEnroll}>
            {is_enrolled ? "Continue Learning" : "Enroll Now"}
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button className="btn primary" onClick={handleWatchVideo}>
            <FaPlay /> Watch Video
          </button>
          <button className="btn secondary" onClick={handleDownloadPDF}>
            <FaDownload /> Download PDF
          </button>
        </div>
      )}

      <div className="footer">
        <span className="free-access">
          {is_premium ? "Premium Access" : "Free Access"}
        </span>
        <span className="no-reg">{is_premium ? "Donation required" : "No donation required"}</span>
      </div>
    </div>
  );
}
