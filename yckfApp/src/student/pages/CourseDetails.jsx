"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaClock,
  FaBook,
  FaCheckCircle,
  FaFilePdf,
} from "react-icons/fa";
import "../styles/CourseDetails.css";
import api from "../../../api";

const CourseDetails = ({ student }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [hasDonated, setHasDonated] = useState(false);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const token =
        localStorage.getItem("student_token") || localStorage.getItem("token");

      // Fetch course details from backend
      const courseResponse = await api.get(`/courses/${id}`);
      const courseData = courseResponse.data;

      // Check enrollment status
      if (token) {
        try {
          const enrollmentResponse = await api.get(
            `/courses/${id}/enrollment_status`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsEnrolled(enrollmentResponse.data.enrolled || false);
          setHasDonated(enrollmentResponse.data.donated || false);
        } catch (error) {
          console.error("Error checking enrollment status:", error);
        }
      }

      setCourse({
        id: courseData.id,
        title: courseData.title,
        instructor: courseData.instructor || "Instructor",
        description: courseData.description,
        duration: courseData.time ? `${courseData.time} hours` : "Self-paced",
        level: courseData.level || "All levels",
        rating: courseData.rating || 0,
        students: courseData.enrolled_count || 0,
        price: courseData.price || 0,
        is_premium: courseData.is_premium || false,
        is_multipart:
          courseData.is_multipart || courseData.isMultipart || false,
        video_url: courseData.video_url,
        pdf_url: courseData.pdf_url,
      });

      // Fetch lessons if multipart course
      if (courseData.is_multipart || courseData.isMultipart) {
        const lessonsResponse = await api.get(`/courses/${id}/lessons`);
        const lessonsData = lessonsResponse.data;

        const formattedLessons = lessonsData
          .map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            duration: lesson.duration || "N/A",
            completed: lesson.completed || false,
            content_url: lesson.content_url,
            video_url: lesson.video_url,
            order: lesson.order || 0,
          }))
          .sort((a, b) => a.order - b.order);

        setLessons(formattedLessons);
        if (formattedLessons.length > 0) {
          setSelectedLesson(formattedLessons[0]);
        }
      } else {
        // Single-part course - create single lesson
        const singleLesson = {
          id: 1,
          title: courseData.title,
          duration: courseData.time ? `${courseData.time} hours` : "Self-paced",
          completed: false,
          content_url: courseData.pdf_url,
          video_url: courseData.video_url,
          order: 0,
        };
        setLessons([singleLesson]);
        setSelectedLesson(singleLesson);
        console.log("Single lesson created:", singleLesson);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleEnroll = async () => {
    try {
      const token =
        localStorage.getItem("student_token") || localStorage.getItem("token");

      if (!token) {
        alert("Please login to enroll in this course");
        navigate("/login");
        return;
      }

      // Verify enrollment and donation status
      const response = await api.post(`/courses/${id}/enroll`);

      const data = response.data;

      if (response.status === 200 && data.success) {
        alert("Successfully enrolled in the course!");
        setIsEnrolled(true);
      } else {
        alert(
          data.message || "Failed to enroll. Please make a donation first."
        );
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!course) {
    return <div className="loading">Loading course...</div>;
  }

  return (
    <div className="course-details">
      <button className="back-btn" onClick={() => navigate("/student/courses")}>
        <FaArrowLeft /> Back to Courses
      </button>

      <div className="course-header">
        <div className="course-info">
          <h1>{course.title}</h1>
          <p className="instructor">by {course.instructor}</p>
          <p className="description">{course.description}</p>

          <div className="course-meta">
            <span>
              <FaClock /> {course.duration}
            </span>
            <span>Level: {course.level}</span>
            <span>⭐ {course.rating}</span>
            <span>{course.students} students enrolled</span>
          </div>
        </div>

        {!isEnrolled &&
          (course.is_premium ? (
            hasDonated ? (
              <button className="enroll-btn" onClick={handleEnroll}>
                Enroll Now
              </button>
            ) : (
              <button
                className="enroll-btn"
                onClick={() => navigate("/student/donations")}
              >
                Donate to Enroll
              </button>
            )
          ) : (
            <button className="enroll-btn" onClick={handleEnroll}>
              Enroll Now
            </button>
          ))}
      </div>

      <div
        className="course-content"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px",
          gap: "30px",
        }}
      >
        {/* Left: Video and Content */}
        <div
          className="content-main"
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {course.is_premium && !hasDonated ? (
            <div className="access-restricted">
              <div className="restricted-message">
                <h3>🔒 Premium Content</h3>
                <p>
                  This is a premium course. Please make a donation to access the
                  course materials.
                </p>
                <button
                  className="enroll-btn"
                  onClick={() => navigate("/student/donations")}
                >
                  Donate Now
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="video-section">
                {selectedLesson?.video_url ? (
                  <iframe
                    key={selectedLesson.video_url}
                    className="video-player"
                    src={getEmbedUrl(selectedLesson.video_url)}
                    title={selectedLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="video-placeholder">
                    <div className="play-icon">▶</div>
                    <p>No video available for this lesson</p>
                  </div>
                )}
              </div>

              {selectedLesson && (
                <div className="lesson-content-section">
                  <h3>{selectedLesson.title}</h3>
                  <p>Duration: {selectedLesson.duration}</p>
                  <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
                    Course Material
                  </h4>
                  {selectedLesson.content_url ? (
                    <div className="pdf-viewer-section">
                      <iframe
                        src={selectedLesson.content_url}
                        className="pdf-viewer"
                        title="Course Material"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  ) : (
                    <p style={{ color: "var(--muted)", fontStyle: "italic" }}>
                      No course material available for this lesson
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: Lessons List */}
        <div className="lessons-section">
          <h2>
            <FaBook /> Course Lessons
          </h2>
          <div className="lessons-list">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`lesson-item ${
                  selectedLesson?.id === lesson.id ? "active" : ""
                }`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="lesson-header">
                  {lesson.completed && (
                    <FaCheckCircle className="completed-icon" />
                  )}
                  <span className="lesson-title">{lesson.title}</span>
                </div>
                <span className="lesson-duration">{lesson.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
