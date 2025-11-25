"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaCalendar, FaArrowRight } from "react-icons/fa";
import NavigationBar from "../components/navbar";
import Footer from "../components/footer";
import "../css/blog.css";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const dummyBlogs = [
        {
          id: 1,
          title: "10 Tips to Maximize Your Online Learning",
          date: new Date(),
          summary: "Learn how to stay focused, organized, and motivated while taking online courses...",
          image: "/online-learning-concept.png",
        },
        {
          id: 2,
          title: "The Future of Digital Education in 2024",
          date: new Date(Date.now() - 86400000),
          summary: "Exploring emerging trends and technologies that are shaping online education...",
          image: "/digital-education-concept.png",
        },
        {
          id: 3,
          title: "How to Build a Successful Career in Tech",
          date: new Date(Date.now() - 172800000),
          summary: "A comprehensive guide to navigating the tech industry and landing your dream job...",
          image: "/tech-career-path.png",
        },
        {
          id: 4,
          title: "Mastering Time Management as a Student",
          date: new Date(Date.now() - 259200000),
          summary: "Proven strategies to manage your time effectively while studying and working...",
          image: "/time-management-concept.png",
        },
        {
          id: 5,
          title: "The Importance of Soft Skills in Modern Jobs",
          date: new Date(Date.now() - 345600000),
          summary: "Why employers value soft skills and how to develop them...",
          image: "/soft-skills-concept.png",
        },
        {
          id: 6,
          title: "Learning Trends That Will Change Education",
          date: new Date(Date.now() - 432000000),
          summary: "AI, personalized learning, and more: the technologies revolutionizing education...",
          image: "/learning-trends.jpg",
        },
      ];

      setBlogs(dummyBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIdx = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIdx, startIdx + blogsPerPage);

  return (
    <>
      <NavigationBar />
      <div className="blog-page">
      <div className="blog-header">
        <h1>Latest Blog Posts</h1>
        <p>Stay informed with our latest articles and insights</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {currentBlogs.length > 0 ? (
        <>
          <div className="blogs-grid">
            {currentBlogs.map((blog) => (
              <div key={blog.id} className="blog-card" onClick={() => navigate(`/blog/${blog.id}`)}>
                <div className="blog-image" style={{ backgroundImage: `url(${blog.image})` }} />
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <div className="blog-meta">
                    <FaCalendar />
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <p className="blog-summary">{blog.summary}</p>
                  <button className="read-more-btn">
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p>No blog posts found matching your search</p>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default Blog;
