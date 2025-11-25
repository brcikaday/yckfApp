"use client";

import { FaCalendar, FaArrowRight } from "react-icons/fa";
import "../styles/BlogCard.css";

export function BlogCard({ id, title, date, summary, image, onReadMore }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="blog-card">
      {image && (
        <div
          className="blog-image"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      <div className="blog-content">
        <h3 className="blog-title">{title}</h3>

        <div className="blog-meta">
          <FaCalendar /> {formattedDate}
        </div>

        <p className="blog-summary">{summary}</p>

        <button className="read-more-btn" onClick={() => onReadMore(id)}>
          Read More <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
