"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../api";
import "../styles/Dashboard.css";

const Dashboard = ({ showToast }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalCategories: 0,
    totalEnrollments: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/stats");
      const statsData = response.data;

      setStats({
        totalUsers: statsData.users || 0,
        totalCourses: statsData.courses || 0,
        totalCategories: statsData.categories || 0,
        totalEnrollments: statsData.enrollments || 0,
      });

      const activityRes = await api.get("/activity/recent");
      setRecentActivity(activityRes.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      showToast("Error loading dashboard data", "error");
      setStats({
        totalUsers: 150,
        totalCourses: 25,
        totalCategories: 8,
        totalEnrollments: 320,
      });
      setRecentActivity([
        {
          id: 1,
          type: "course",
          message: "New course created: React Basics",
          date: new Date(),
        },
        {
          id: 2,
          type: "enrollment",
          message: "5 new enrollments in Web Development",
          date: new Date(),
        },
        {
          id: 3,
          type: "user",
          message: "New user registered: John Doe",
          date: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon="📚"
          color="green"
        />
        <StatCard
          title="Total Categories"
          value={stats.totalCategories}
          icon="🏷️"
          color="purple"
        />
        <StatCard
          title="Total Enrollments"
          value={stats.totalEnrollments}
          icon="📝"
          color="orange"
        />
      </div>

      <div className="dashboard-content">
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : recentActivity.length > 0 ? (
            <ul className="activity-list">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="activity-item">
                  <span className="activity-type">{activity.type}</span>
                  <span className="activity-message">{activity.message}</span>
                  <span className="activity-date">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
