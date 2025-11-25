"use client";

import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: "📊", path: "/secondary-admin" },
    { label: "Courses", icon: "📚", path: "/secondary-admin/courses" },
    { label: "Categories", icon: "🏷️", path: "/secondary-admin/categories" },
    { label: "Users", icon: "👥", path: "/secondary-admin/users" },
    { label: "Enrollments", icon: "📝", path: "/secondary-admin/enrollments" },
    {
      label: "Financial Settings",
      icon: "💰",
      path: "/secondary-admin/financial-settings",
    },
    {
      label: "Donation Ranges",
      icon: "🎁",
      path: "/secondary-admin/donation-ranges",
    },
    {
      label: "Payment Keys",
      icon: "🔑",
      path: "/secondary-admin/payment-keys",
    },
    { label: "Audit Logs", icon: "📋", path: "/secondary-admin/audit-logs" },
    {
      label: "Secondary Admins",
      icon: "🔐",
      path: "/secondary-admin/secondary-admins",
    },
    { label: "Settings", icon: "⚙️", path: "/secondary-admin/settings" },
  ];

  const isActive = (path) => {
    if (
      path === "/secondary-admin" &&
      location.pathname === "/secondary-admin/"
    )
      return true;
    return location.pathname === path;
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1 className="logo">Secondary Admin Panel</h1>
          <button className="close-btn" onClick={toggleSidebar}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 768) {
                  toggleSidebar();
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
