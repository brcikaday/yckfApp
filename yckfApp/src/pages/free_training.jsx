import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/freeTraining.css";
import { FaBook, FaSearch, FaChevronDown } from "react-icons/fa";
import api from "../../api";

const FreeTraining = () => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [freePage, setFreePage] = useState(1);
  const [premiumPage, setPremiumPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        const mapped = response.data.map((course) => ({
          ...course,
          type: course.is_premium ? "premium" : "free",
          tags: course.tags ? course.tags.split(",") : [],
        }));
        setAllCourses(mapped);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filterCourses = (courseType) => {
    let filtered = allCourses.filter((course) => course.type === courseType);

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
    <>
      <Navbar />
      <div className="page">
        <main className="page-content">
          <section className="training-section">
            <div className="training">
              <FaBook className="training-icon" size={70} />
              <h2 className="training-title">Explore Our Courses</h2>
              <p className="training-subtitle">
                Choose from hundreds of courses and start learning today
              </p>
            </div>

            {/* Search and Filter */}
            <div className="search-filter-section">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-box">
                <FaChevronDown />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {[...new Set(allCourses.map((course) => course.category))].map(
                    (cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {loading ? (
              <p style={{textAlign: "center", padding: "40px"}}>Loading courses...</p>
            ) : (
              <>
                {/* Free Courses Section */}
                <div className="courses-section-wrapper">
                  <div className="section-title">
                    <h2>📚 Free Courses</h2>
                    <span className="course-count">{freeCourses.length} courses</span>
                  </div>

                  {freeCourses.length > 0 ? (
                    <>
                      <div className="course-grid">
                        {getFreeCoursesForPage().map(course => (
                          <div key={course.id} className="course-card">
                            <div className="course-header">
                              <h3 className="course-title">{course.title}</h3>
                              <span className="access-badge free">Free</span>
                            </div>
                            <div className="course-meta">
                              <span className="course-time">⏱️ {course.time || "Self-paced"}</span>
                              <span className="course-level">{course.level || "All levels"}</span>
                            </div>
                            <p className="course-desc">{course.description}</p>
                            <div className="course-subtitle">What you'll learn:</div>
                            <div className="tags">
                              {course.tags && course.tags.length > 0 ? (
                                course.tags.map((tag, idx) => (
                                  <span key={idx} className="tag">{tag.trim()}</span>
                                ))
                              ) : (
                                <span className="tag">Course content</span>
                              )}
                            </div>
                            <div className="buttons">
                              <button className="btn primary" onClick={() => navigate(`/course/${course.id}`)}>View Course</button>
                            </div>
                            <div className="footer">
                              <span className="free-access">Free Access</span>
                              <span className="no-reg">No donation required</span>
                            </div>
                          </div>
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
                </div>

                {/* Premium Courses Section */}
                <div className="courses-section-wrapper">
                  <div className="section-title">
                    <h2>💎 Premium Courses</h2>
                    <span className="course-count">{premiumCourses.length} courses</span>
                  </div>

                  {premiumCourses.length > 0 ? (
                    <>
                      <div className="course-grid">
                        {getPremiumCoursesForPage().map(course => (
                          <div key={course.id} className="course-card">
                            <div className="course-header">
                              <h3 className="course-title">{course.title}</h3>
                              <span className="access-badge premium">Premium</span>
                            </div>
                            <div className="course-meta">
                              <span className="course-time">⏱️ {course.time || "Self-paced"}</span>
                              <span className="course-level">{course.level || "All levels"}</span>
                            </div>
                            <p className="course-desc">{course.description}</p>
                            <div className="course-subtitle">What you'll learn:</div>
                            <div className="tags">
                              {course.tags && course.tags.length > 0 ? (
                                course.tags.map((tag, idx) => (
                                  <span key={idx} className="tag">{tag.trim()}</span>
                                ))
                              ) : (
                                <span className="tag">Course content</span>
                              )}
                            </div>
                            <div className="buttons">
                              <button className="btn primary full-width" onClick={() => navigate(`/course/${course.id}`)}>Enroll Now</button>
                            </div>
                            <div className="footer">
                              <span className="free-access">Premium Access</span>
                              <span className="no-reg">Donation required</span>
                            </div>
                          </div>
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
                </div>
              </>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FreeTraining;
