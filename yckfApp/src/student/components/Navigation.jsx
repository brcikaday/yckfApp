"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaNewspaper,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../styles/Navigation.css";
import { clearAuth } from "../../auth/helper";

const Navigation = ({ student, theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // explicitly clear student auth
    clearAuth("student");
    window.location.href = "/login";
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: "Dashboard", icon: FaHome, path: "/student/dashboard" },
    { label: "My Courses", icon: FaBook, path: "/student/courses" },
    { label: "Blog", icon: FaNewspaper, path: "/student/blog" },
    { label: "Donations", icon: FaHeart, path: "/student/donations" },
    { label: "Profile", icon: FaUser, path: "/student/profile" },
  ];

  return (
    <nav className="student-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>YCKF</h1>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                <Icon /> {item.label}
              </button>
            );
          })}
        </div>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <div className="student-menu">
            <div className="student-info">
              <span className="student-name">{student?.name || "Student"}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
