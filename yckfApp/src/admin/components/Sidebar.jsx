"use client";

import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    { label: "Courses", icon: "📚", path: "/admin/courses" },
    { label: "Categories", icon: "🏷️", path: "/admin/categories" },
    { label: "Users", icon: "👥", path: "/admin/users" },
    { label: "Enrollments", icon: "📝", path: "/admin/enrollments" },
    {
      label: "Financial Settings",
      icon: "💰",
      path: "/admin/financial-settings",
    },
    { label: "Audit Logs", icon: "📋", path: "/admin/audit-logs" },
    { label: "Secondary Admins", icon: "🔐", path: "/admin/secondary-admins" },
    { label: "Settings", icon: "⚙️", path: "/admin/settings" },
  ];

  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin/") return true;
    return location.pathname === path;
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1 className="logo">Admin Panel</h1>
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
