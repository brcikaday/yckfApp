"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "../styles/Dashboard.css";
import api from "../../../api";

const Dashboard = ({ student }) => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/enrolled");
      const data = response.data;

      const enrolled = data.map((enrollment) => ({
        id: enrollment.course_id,
        title: enrollment.course?.title || "Untitled Course",
        instructor: enrollment.course?.instructor || "Instructor",
        progress: enrollment.progress || 0,
      }));
      setEnrolledCourses(enrolled);

      try {
        const blogResponse = await api.get("/api/blogs/latest");
        const blogs = blogResponse.data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          date: new Date(blog.date),
        }));
        setLatestBlogs(blogs);
      } catch (blogError) {
        console.error("Error fetching blogs:", blogError);
      }

      const popular = [
        {
          id: 3,
          title: "Web Development Bootcamp",
          rating: 4.8,
          students: 1250,
        },
        {
          id: 4,
          title: "Data Science Fundamentals",
          rating: 4.7,
          students: 980,
        },
        {
          id: 5,
          title: "UI/UX Design Masterclass",
          rating: 4.9,
          students: 750,
        },
      ];
      setPopularCourses(popular);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {student?.name || "Student"}! 👋</h1>
        <p>Continue your learning journey</p>
      </div>

      {/* Enrolled Courses Section */}
      <section className="enrolled-courses-section">
        <div className="section-header">
          <h2>Your Enrolled Courses</h2>
          <button
            onClick={() => navigate("/student/courses")}
            className="view-all-btn"
          >
            View All <FaArrowRight />
          </button>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="enrolled-grid">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="enrolled-card">
                <h3>{course.title}</h3>
                <p className="instructor">by {course.instructor}</p>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span className="progress-percent">{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <button
                  className="continue-btn"
                  onClick={() => navigate(`/student/course/${course.id}`)}
                >
                  Continue Course
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>
              You haven't enrolled in any courses yet. Start learning today!
            </p>
            <button onClick={() => navigate("/student/courses")}>
              Browse Courses
            </button>
          </div>
        )}
      </section>

      {/* Latest Blogs Section */}
      <section className="blogs-section">
        <div className="section-header">
          <h2>Latest Blog Posts</h2>
          <button
            onClick={() => navigate("/student/blog")}
            className="view-all-btn"
          >
            Read All <FaArrowRight />
          </button>
        </div>

        <div className="blogs-grid">
          {latestBlogs.map((blog) => (
            <div key={blog.id} className="blog-preview">
              <h3>{blog.title}</h3>
              <p className="blog-date">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="blog-summary">{blog.summary}</p>
              <button
                onClick={() => navigate(`/student/blog/${blog.id}`)}
                className="read-more-link"
              >
                Read More <FaArrowRight />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="popular-courses-section">
        <h2>Popular Courses</h2>

        <div className="popular-grid">
          {popularCourses.map((course) => (
            <div key={course.id} className="popular-card">
              <h3>{course.title}</h3>
              <div className="course-stats">
                <span className="rating">⭐ {course.rating}</span>
                <span className="students">{course.students} students</span>
              </div>
              <button
                onClick={() => navigate("/student/courses")}
                className="explore-btn"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
