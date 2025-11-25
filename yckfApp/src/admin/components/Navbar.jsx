"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import api from "../../../api";
import { clearAuth } from "../../auth/helper";

const Navbar = ({
  toggleSidebar,
  sidebarOpen,
  userMenuOpen,
  setUserMenuOpen,
  showToast,
}) => {
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/me"); // call the /me endpoint
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    // explicitly clear admin auth
    clearAuth("admin");
    // window.location.href = "/login";

    showToast("Logged out successfully");
    navigate("/login");
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen, setUserMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h2 className="page-title">Learning Management System</h2>
      </div>

      <div className="navbar-right">
        <div className="user-menu" ref={userMenuRef}>
          <button
            className="user-profile-btn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="user-avatar">A</div>
            <span className="user-name">
              {userProfile?.fullname || "Loading..."}
            </span>
            <span className={`dropdown-icon ${userMenuOpen ? "open" : ""}`}>
              ▼
            </span>
          </button>

          <div className={`dropdown-menu ${userMenuOpen ? "visible" : ""}`}>
            <div className="user-info">
              <p className="user-email">{userProfile?.email || ""}</p>
              <p className="user-role">{userProfile?.role || ""}</p>
            </div>
            <hr />
            <button
              className="dropdown-item"
              onClick={() => {
                navigate("/admin/settings");
                setUserMenuOpen(false);
              }}
            >
              👤 Profile Settings
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
