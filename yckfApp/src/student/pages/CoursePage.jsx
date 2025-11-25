"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import "../styles/CoursePage.css";
import api from "../../../api";
// import { title } from "process";
import { ca } from "date-fns/locale/ca";

const CoursePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [freePage, setFreePage] = useState(1);
  const [premiumPage, setPremiumPage] = useState(1);

  const coursesPerPage = 6;

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await api.get("/enrolled");
      const enrolledIds = response.data.map(e => e.course_id);
      setEnrolledCourseIds(enrolledIds);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      // Dummy courses data
      const response = await api.get("/courses");
      const raw = response.data;

      const mapped = raw.map((course) => {
        const tagsArray = course.tags ? course.tags.split(",").map(t => t.trim()) : [];
        return {
          id: course.id,
          title: course.title,
          category: tagsArray[0] || "Uncategorized",
          description: course.description,
          time: course.time,
          level: course.level,
          tags: tagsArray,
          video_url: course.video_url,
          video_pdf: course.pdf_url,
          is_premium: course.is_premium,
          is_multipart: course.is_multipart || course.isMultipart || false,
          type: course.is_premium ? "premium" : "free",
        };
      });

      setAllCourses(mapped);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getCategories = (courseType) => {
    const typeCourses = allCourses.filter(
      (course) => course.type === courseType
    );
    return [...new Set(typeCourses.map((course) => course.category))].sort();
  };

  const filterCourses = (courseType) => {
    let filtered = allCourses.filter((course) => course.type === courseType);

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    return filtered;
  };

  const freeCourses = filterCourses("free");
  const premiumCourses = filterCourses("premium");

  const getFreeCoursesForPage = () => {
    const startIdx = (freePage - 1) * coursesPerPage;
    return freeCourses.slice(startIdx, startIdx + coursesPerPage);
  };

  const getPremiumCoursesForPage = () => {
    const startIdx = (premiumPage - 1) * coursesPerPage;
    return premiumCourses.slice(startIdx, startIdx + coursesPerPage);
  };

  const getTotalPages = (courses) => {
    return Math.ceil(courses.length / coursesPerPage);
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Courses</h1>
        <p>Choose from hundreds of courses and start learning today</p>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-section">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setFreePage(1);
              setPremiumPage(1);
            }}
          />
        </div>

        <div className="filter-box">
          <FaChevronDown />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setFreePage(1);
              setPremiumPage(1);
            }}
          >
            <option value="all">All Categories</option>
            {[...new Set(allCourses.map((course) => course.category).filter(cat => cat))].map(
              (cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Free Courses Section */}
      <section className="courses-section">
        <div className="section-title">
          <h2>📚 Free Courses</h2>
          <span className="course-count">{freeCourses.length} courses</span>
        </div>

        {freeCourses.length > 0 ? (
          <>
            <div className="courses-grid">
              {getFreeCoursesForPage().map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  cors_title={course.title}
                  time={course.time}
                  level={course.level}
                  description={course.description}
                  tags={course.tags}
                  video_url={course.video_url}
                  video_pdf={course.video_pdf}
                  is_premium={course.is_premium}
                  is_multipart={course.is_multipart}
                  is_enrolled={enrolledCourseIds.includes(course.id)}
                  onEnroll={() => navigate(`/student/course/${course.id}`)}
                />
              ))}
            </div>

            {getTotalPages(freeCourses) > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setFreePage((p) => Math.max(1, p - 1))}
                  disabled={freePage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {freePage} of {getTotalPages(freeCourses)}
                </span>
                <button
                  onClick={() =>
                    setFreePage((p) =>
                      Math.min(getTotalPages(freeCourses), p + 1)
                    )
                  }
                  disabled={freePage === getTotalPages(freeCourses)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <p>No free courses found matching your criteria</p>
          </div>
        )}
      </section>

      {/* Premium Courses Section */}
      <section className="courses-section">
        <div className="section-title">
          <h2>💎 Premium Courses</h2>
          <span className="course-count">{premiumCourses.length} courses</span>
        </div>

        {premiumCourses.length > 0 ? (
          <>
            <div className="courses-grid">
              {getPremiumCoursesForPage().map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  cors_title={course.title}
                  time={course.time}
                  level={course.level}
                  description={course.description}
                  tags={course.tags}
                  is_premium={course.is_premium}
                  is_multipart={course.is_multipart}
                  is_enrolled={enrolledCourseIds.includes(course.id)}
                  onEnroll={() => navigate(`/student/course/${course.id}`)}
                />
              ))}
            </div>

            {getTotalPages(premiumCourses) > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPremiumPage((p) => Math.max(1, p - 1))}
                  disabled={premiumPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {premiumPage} of {getTotalPages(premiumCourses)}
                </span>
                <button
                  onClick={() =>
                    setPremiumPage((p) =>
                      Math.min(getTotalPages(premiumCourses), p + 1)
                    )
                  }
                  disabled={premiumPage === getTotalPages(premiumCourses)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <p>No premium courses found matching your criteria</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursePage;
