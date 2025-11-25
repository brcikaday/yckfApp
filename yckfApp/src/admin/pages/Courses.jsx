"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import "../styles/Courses.css";
import api from "../../../api";

const Courses = ({ showToast }) => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showLessonsModal, setShowLessonsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    category_id: "",
    level: "",
    tags: "",
    is_premium: false,
    is_multipart: false,
    thumbnail: null,
    pdf_file: null,
    video_url: "",
  });

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/courses");
      console.log("Courses data:", response.data);
      setCourses(response.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      showToast("Error loading courses", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      setLessonsLoading(true);
      const response = await api.get(`/courses/${courseId}/lessons`);
      setLessons(response.data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      showToast("Error loading lessons", "error");
    } finally {
      setLessonsLoading(false);
    }
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        category_id: course.category_id,
        time: course.time,
        level: course.level,
        tags: course.tags,
        is_premium: course.is_premium,
        is_multipart: course.is_multipart,
        thumbnail: null,
        pdf_file: null,
        video_url: course.video_url,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: "",
        description: "",
        category_id: "",
        time: "",
        level: "",
        tags: "",
        is_premium: false,
        is_multipart: false,
        thumbnail: null,
        pdf_file: null,
        video_url: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category_id) {
      showToast("Please fill all required fields", "error");
      return;
    }

    if (!formData.is_multipart && !formData.pdf_file && !editingCourse) {
      showToast("Please upload a PDF for single-part course", "error");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category_id", formData.category_id);
      formDataToSend.append("is_multipart", formData.is_multipart);
      formDataToSend.append("is_premium", formData.is_premium);
      formDataToSend.append("level", formData.level);
      formDataToSend.append("time", formData.time);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("video_url", formData.video_url);

      if (formData.thumbnail) {
        formDataToSend.append("thumbnail", formData.thumbnail);
      }

      if (formData.pdf_file) {
        formDataToSend.append("pdf_file", formData.pdf_file);
      }

      if (editingCourse) {
        await api.put(`/courses/${editingCourse.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Course updated successfully");
      } else {
        await api.post("/create_course", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Course created successfully");
      }

      handleCloseModal();
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
      showToast("Error saving course", "error");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/courses/${id}`);
        showToast("Course deleted successfully");
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
        showToast("Error deleting course", "error");
      }
    }
  };

  const handleManageLessons = (course) => {
    setSelectedCourse(course);
    fetchLessons(course.id);
    setShowLessonsModal(true);
  };

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>Courses Management</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Create Course
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading courses...</p>
      ) : courses.length > 0 ? (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              {course.thumbnail && (
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="course-thumbnail"
                />
              )}
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="badge">
                    {course.is_multipart || course.isMultipart
                      ? "📚 Multipart"
                      : "📄 Single PDF"}
                  </span>
                </div>
              </div>
              <div className="course-actions">
                {(course.is_multipart || course.isMultipart) && (
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleManageLessons(course)}
                  >
                    📖 Lessons
                  </button>
                )}
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleOpenModal(course)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No courses found. Create your first course!</p>
      )}

      {showModal && (
        <Modal
          title={editingCourse ? "Edit Course" : "Create Course"}
          onClose={handleCloseModal}
        >
          <form onSubmit={handleSubmit} className="course-form">
            <div className="form-group">
              <label>Course Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Time *</label>
              <input
                type="number"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                placeholder="Enter course time (in hours)"
                required
              />
            </div>

            <div className="form-group">
              <label>Tags (separate with commas)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g. education, coding, web development"
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Level *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                name="is_multipart"
                checked={formData.is_multipart}
                onChange={handleInputChange}
                id="is_multipart"
              />
              <label htmlFor="is_multipart">
                Multipart Course (with lessons)
              </label>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                name="is_premium"
                checked={formData.is_premium}
                onChange={handleInputChange}
                id="is_premium"
              />
              <label htmlFor="is_premium">Premium Course (paid)</label>
            </div>

            <div className="form-group">
              <label>Thumbnail Image</label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleInputChange}
                accept="image/*"
              />
            </div>

            {!formData.is_multipart && (
              <>
                <div className="form-group">
                  <label>PDF File *</label>
                  <input
                    type="file"
                    name="pdf_file"
                    onChange={handleInputChange}
                    accept=".pdf"
                  />
                </div>

                <div className="form-group">
                  <label>Video_url *</label>
                  <input
                    type="text"
                    name="video_url"
                    onChange={handleInputChange}
                    placeholder="Enter video URL"
                    required
                  />
                </div>
              </>
            )}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingCourse ? "Update Course" : "Create Course"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showLessonsModal && selectedCourse && (
        <Modal
          title={`Manage Lessons - ${selectedCourse.title}`}
          onClose={() => setShowLessonsModal(false)}
        >
          <LessonsManager
            courseId={selectedCourse.id}
            lessons={lessons}
            onClose={() => {
              setShowLessonsModal(false);
              fetchCourses();
            }}
            showToast={showToast}
          />
        </Modal>
      )}
    </div>
  );
};

const LessonsManager = ({ courseId, lessons, onClose, showToast }) => {
  const [lessonsData, setLessonsData] = useState(lessons);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content_url: "",
    pdf_url: "",
    video_url: "",
    order: 0,
  });

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const fetchLessons = async () => {
    try {
      const response = await api.get(`/courses/${courseId}/lessons`);
      setLessonsData(response.data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      showToast("Error loading lessons", "error");
    }
  };

  const handleOpenLessonForm = (lesson = null) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData({
        title: lesson.title,
        content_url: lesson.content_url,
        pdf_url: lesson.pdf_url,
        video_url: lesson.video_url,
        order: lesson.order,
      });
    } else {
      setEditingLesson(null);
      setFormData({
        title: "",
        content_url: "",
        pdf_url: "",
        video_url: "",
        order: lessonsData.length,
      });
    }
    setShowLessonForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number.parseInt(value) : value,
    }));
  };

  const handleSubmitLesson = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      showToast("Please enter lesson title", "error");
      return;
    }

    try {
      if (editingLesson) {
        await api.put(
          `courses/${courseId}/lessons/${editingLesson.id}`,
          formData
        );
        showToast("Lesson updated successfully");
      } else {
        await api.post(`/courses/${courseId}/lessons`, formData);
        showToast("Lesson created successfully");
      }
      setShowLessonForm(false);
      fetchLessons();
    } catch (error) {
      console.error("Error saving lesson:", error);
      showToast("Error saving lesson", "error");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await api.delete(`courses/${courseId}/lessons/${lessonId}`);
        showToast("Lesson deleted successfully");
        fetchLessons();
      } catch (error) {
        console.error("Error deleting lesson:", error);
        showToast("Error deleting lesson", "error");
      }
    }
  };

  return (
    <div className="lessons-manager">
      <button
        className="btn btn-primary"
        onClick={() => handleOpenLessonForm()}
        style={{ marginBottom: "20px" }}
      >
        + Add Lesson
      </button>

      {lessonsData.length > 0 ? (
        <div className="lessons-list">
          {lessonsData
            .sort((a, b) => a.order - b.order)
            .map((lesson) => (
              <div key={lesson.id} className="lesson-item">
                <div className="lesson-content">
                  <h4>
                    {lesson.order + 1}. {lesson.title}
                  </h4>
                  {lesson.content_url && <p>Content: {lesson.content_url}</p>}
                  {lesson.video_url && <p>Video: {lesson.video_url}</p>}
                </div>
                <div className="lesson-actions">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleOpenLessonForm(lesson)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="no-data">No lessons yet. Add your first lesson!</p>
      )}

      {showLessonForm && (
        <div className="lesson-form-container">
          <form onSubmit={handleSubmitLesson} className="lesson-form">
            <div className="form-group">
              <label>Lesson Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter lesson title"
                required
              />
            </div>

            <div className="form-group">
              <label>Content URL</label>
              <input
                type="url"
                name="content_url"
                value={formData.content_url}
                onChange={handleInputChange}
                placeholder="https://example.com/content"
              />
            </div>

            <div className="form-group">
              <label>Video URL</label>
              <input
                type="url"
                name="video_url"
                value={formData.video_url}
                onChange={handleInputChange}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="form-group">
              <label>Lesson Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingLesson ? "Update Lesson" : "Create Lesson"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowLessonForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Courses;
