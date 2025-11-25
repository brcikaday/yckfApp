"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Enrollments.css";

const Enrollments = ({ showToast }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/enrollments");
      setEnrollments(response.data || []);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      showToast("Error loading enrollments", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEnrollment = async (enrollmentId) => {
    if (window.confirm("Are you sure you want to delete this enrollment?")) {
      try {
        await axios.delete(`http://localhost:5000/enrollments/${enrollmentId}`);
        showToast("Enrollment deleted successfully");
        fetchEnrollments();
      } catch (error) {
        console.error("Error deleting enrollment:", error);
        showToast("Error deleting enrollment", "error");
      }
    }
  };

  return (
    <div className="enrollments-page">
      <div className="page-header">
        <h1>Enrollments Management</h1>
        <p>Total Enrollments: {enrollments.length}</p>
      </div>

      {loading ? (
        <p className="loading">Loading enrollments...</p>
      ) : enrollments.length > 0 ? (
        <div className="enrollments-table-container">
          <table className="enrollments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Course</th>
                <th>Enrollment Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td>#{enrollment.id}</td>
                  <td>{enrollment.user_name}</td>
                  <td>{enrollment.course_title}</td>
                  <td>
                    {new Date(enrollment.date_enrolled).toLocaleDateString()}
                  </td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteEnrollment(enrollment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No enrollments found.</p>
      )}
    </div>
  );
};

export default Enrollments;
