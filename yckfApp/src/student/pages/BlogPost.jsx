"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import "../styles/BlogPost.css";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      const dummyBlogs = {
        1: {
          id: 1,
          title: "10 Tips to Maximize Your Online Learning",
          date: new Date(),
          author: "John Smith",
          category: "Learning Tips",
          image: "/online-learning-concept.png",
          content: `<p>Online learning has revolutionized education, providing unprecedented access to knowledge and skills from anywhere in the world. However, to truly maximize your online learning experience, you need to develop effective strategies and habits.</p>
          <h2>1. Create a Dedicated Learning Space</h2>
          <p>Set up a quiet, comfortable area free from distractions. This signals to your brain that it's time to learn and helps establish a routine.</p>
          <h2>2. Set Specific Goals</h2>
          <p>Define clear, measurable objectives for each course. What do you want to learn? What skills do you want to gain? Having specific goals keeps you motivated.</p>
          <h2>3. Develop a Consistent Schedule</h2>
          <p>Treat online learning like a job. Set specific times for studying and stick to them. Consistency is key to building good learning habits.</p>
          <p>Remember, online learning is a marathon, not a sprint. Be patient with yourself, celebrate small wins, and keep pushing forward.</p>`,
        },
        2: {
          id: 2,
          title: "The Future of Digital Education in 2024",
          date: new Date(Date.now() - 86400000),
          author: "Sarah Johnson",
          category: "Education Trends",
          image: "/digital-education-concept.png",
          content: `<p>Digital education is evolving rapidly with new technologies and methodologies emerging every day. Let's explore what the future holds.</p>
          <h2>AI-Powered Learning</h2>
          <p>Artificial intelligence is personalizing education like never before, adapting to each student's learning pace and style.</p>
          <h2>Virtual Reality Classrooms</h2>
          <p>VR technology is creating immersive learning experiences that were previously impossible in traditional settings.</p>`,
        },
        3: {
          id: 3,
          title: "How to Build a Successful Career in Tech",
          date: new Date(Date.now() - 172800000),
          author: "Mike Chen",
          category: "Career Development",
          image: "/tech-career-path.png",
          content: `<p>The tech industry offers incredible opportunities for those willing to learn and adapt. Here's your roadmap to success.</p>
          <h2>Start with the Fundamentals</h2>
          <p>Master programming basics, data structures, and algorithms. These form the foundation of any tech career.</p>
          <h2>Build Real Projects</h2>
          <p>Theory is important, but practical experience is what employers value most. Create a portfolio of projects.</p>`,
        },
      };

      const blogId = Number.parseInt(id);
      const foundPost = dummyBlogs[blogId] || dummyBlogs[1];
      setPost(foundPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    }
  };

  if (!post) {
    return <div className="loading">Loading post...</div>;
  }

  return (
    <div className="blog-post">
      <button className="back-btn" onClick={() => navigate("/student/blog")}>
        <FaArrowLeft /> Back to Blog
      </button>

      <article className="post-content">
        <div className="post-header">
          <h1>{post.title}</h1>

          <div className="post-meta">
            <span className="author">By {post.author}</span>
            <span className="date">
              <FaCalendar />{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="category">{post.category}</span>
          </div>
        </div>

        {post.image && (
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="post-image"
          />
        )}

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogPost;
