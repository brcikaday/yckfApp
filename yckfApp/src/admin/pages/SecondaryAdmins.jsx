"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import "../styles/SecondaryAdmins.css";
import api from "../../../api";

const SecondaryAdmins = ({ showToast }) => {
  const [secondaryAdmins, setSecondaryAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    fetchSecondaryAdmins();
  }, []);

  const fetchSecondaryAdmins = async () => {
    try {
      setLoading(true);
      const response = await api.get("/secondary_admin");
      setSecondaryAdmins(response.data || []);
    } catch (error) {
      console.error("Error fetching secondary admins:", error);
      showToast("Error loading secondary admins", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({ email: "", password: "", name: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      showToast("Please fill all required fields", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    if (formData.password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    try {
      await api.post("create/secondary-admins", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: "secondary_admin",
      });
      showToast("Secondary admin created successfully");
      handleCloseModal();
      fetchSecondaryAdmins();
    } catch (error) {
      console.error("Error creating secondary admin:", error);
      showToast(
        error.response?.data?.message || "Error creating secondary admin",
        "error"
      );
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    if (
      window.confirm("Are you sure you want to delete this secondary admin?")
    ) {
      try {
        await axios.delete(
          `http://localhost:5000/api/secondary-admins/${adminId}`
        );
        showToast("Secondary admin deleted successfully");
        fetchSecondaryAdmins();
      } catch (error) {
        console.error("Error deleting secondary admin:", error);
        showToast("Error deleting secondary admin", "error");
      }
    }
  };

  return (
    <div className="secondary-admins-page">
      <div className="page-header">
        <h1>Secondary Admins Management</h1>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          + Create Secondary Admin
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading secondary admins...</p>
      ) : secondaryAdmins.length > 0 ? (
        <div className="admins-table-container">
          <table className="admins-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {secondaryAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td>#{admin.id}</td>
                  <td>{admin.fullname}</td>
                  <td>{admin.email}</td>
                  <td>
                    <span className="role-badge secondary-admin">
                      Secondary Admin
                    </span>
                  </td>
                  <td>{new Date(admin.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteAdmin(admin.id)}
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
        <p className="no-data">
          No secondary admins found. Create your first one!
        </p>
      )}

      {showModal && (
        <Modal title="Create Secondary Admin" onClose={handleCloseModal}>
          <form onSubmit={handleSubmit} className="secondary-admin-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password (min 6 characters)"
                required
              />
            </div>

            <div className="form-group role-info">
              <label>Role</label>
              <div className="role-display">
                <strong>Secondary Admin</strong>
                <p>Fixed role for secondary administrators</p>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Create Secondary Admin
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
    </div>
  );
};

export default SecondaryAdmins;
