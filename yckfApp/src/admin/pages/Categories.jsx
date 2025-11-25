"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../api";
import Modal from "../components/Modal";
import "../styles/Categories.css";

const Categories = ({ showToast }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get("/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("Error loading categories", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
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

    if (!formData.name) {
      showToast("Please enter category name", "error");
      return;
    }

    try {
      if (editingCategory) {
        await api.put(`/categories/edit/${editingCategory.id}`, formData);
        showToast("Category updated successfully");
      } else {
        await api.post("/categories/create", formData);
        showToast("Category created successfully");
      }

      handleCloseModal();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      showToast("Error saving category", "error");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await api.delete(`/categories/delete/${id}`);
        showToast("Category deleted successfully");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        showToast("Error deleting category", "error");
      }
    }
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Categories Management</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Create Category
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading categories...</p>
      ) : categories.length > 0 ? (
        <div className="categories-table-container">
          <table className="categories-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>#{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleOpenModal(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteCategory(category.id)}
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
          No categories found. Create your first category!
        </p>
      )}

      {showModal && (
        <Modal
          title={editingCategory ? "Edit Category" : "Create Category"}
          onClose={handleCloseModal}
        >
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
              <label>Category Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter category description"
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingCategory ? "Update Category" : "Create Category"}
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

export default Categories;
