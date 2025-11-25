"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { FaSearch } from "react-icons/fa";
import "../styles/BlogPage.css";

const BlogPage = () => {
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
          summary:
            "Learn how to stay focused, organized, and motivated while taking online courses...",
          image: "/online-learning-concept.png",
          content:
            "Full blog content here... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 2,
          title: "The Future of Digital Education in 2024",
          date: new Date(Date.now() - 86400000),
          summary:
            "Exploring emerging trends and technologies that are shaping online education...",
          image: "/digital-education-concept.png",
          content:
            "Full blog content here... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 3,
          title: "How to Build a Successful Career in Tech",
          date: new Date(Date.now() - 172800000),
          summary:
            "A comprehensive guide to navigating the tech industry and landing your dream job...",
          image: "/tech-career-path.png",
          content:
            "Full blog content here... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 4,
          title: "Mastering Time Management as a Student",
          date: new Date(Date.now() - 259200000),
          summary:
            "Proven strategies to manage your time effectively while studying and working...",
          image: "/time-management-concept.png",
          content:
            "Full blog content here... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 5,
          title: "The Importance of Soft Skills in Modern Jobs",
          date: new Date(Date.now() - 345600000),
          summary: "Why employers value soft skills and how to develop them...",
          image: "/soft-skills-concept.png",
          content:
            "Full blog content here... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: 6,
          title: "Learning Trends That Will Change Education",
          date: new Date(Date.now() - 432000000),
          summary:
            "AI, personalized learning, and more: the technologies revolutionizing education...",
          image: "/learning-trends.jpg",
          content:
            "Full blog content here... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
    <div className="blog-page">
      <div className="blog-header">
        <h1>Latest Blog Posts</h1>
        <p>Stay informed with our latest articles and insights</p>
      </div>

      {/* Search */}
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

      {/* Blog Grid */}
      {currentBlogs.length > 0 ? (
        <>
          <div className="blogs-grid">
            {currentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                date={blog.date}
                summary={blog.summary}
                image={blog.image}
                onReadMore={() => navigate(`/student/blog/${blog.id}`)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
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
  );
};

export default BlogPage;
