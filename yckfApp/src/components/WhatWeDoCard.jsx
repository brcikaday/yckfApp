import {
  FaBookReader,
  FaMegaphone,
  FaShieldAlt,
  FaGraduationCap,
  FaHandsHelping,
} from "react-icons/fa";
import "../css/whatwedo.css";

const iconMap = {
  "Cybersecurity Education": <FaBookReader className="card-icon blue" />,
  "Public Awareness Campaigns": <FaMegaphone className="card-icon yellow" />,
  "Policy Advocacy": <FaShieldAlt className="card-icon green" />,
  "Youth Programs & School Outreach": (
    <FaGraduationCap className="card-icon purple" />
  ),
  "Community Training": <FaHandsHelping className="card-icon pink" />,
};

export function WhatWeDoCard({ title, content }) {
  return (
    <div className="what-we-do-card">
      <div className="card-icon-wrapper">{iconMap[title]}</div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
