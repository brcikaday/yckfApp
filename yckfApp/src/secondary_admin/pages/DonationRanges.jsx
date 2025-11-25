"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import "../styles/DonationRanges.css";

const DonationRanges = ({ showToast }) => {
  const [ranges, setRanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRange, setEditingRange] = useState(null);
  const [defaultRangeId, setDefaultRangeId] = useState(null);
  const [formData, setFormData] = useState({
    min_amount: "",
    max_amount: "",
    label: "",
  });

  useEffect(() => {
    fetchDonationRanges();
  }, []);

  const fetchDonationRanges = async () => {
    try {
      setLoading(true);
      // Dummy data
      const dummyRanges = [
        {
          id: 1,
          min_amount: 5,
          max_amount: 50,
          label: "Small Donation",
          is_default: true,
        },
        {
          id: 2,
          min_amount: 51,
          max_amount: 200,
          label: "Medium Donation",
          is_default: false,
        },
        {
          id: 3,
          min_amount: 201,
          max_amount: 1000,
          label: "Large Donation",
          is_default: false,
        },
      ];
      setRanges(dummyRanges);
      setDefaultRangeId(dummyRanges.find((r) => r.is_default)?.id || null);
    } catch (error) {
      console.error("Error fetching donation ranges:", error);
      showToast("Error loading donation ranges", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (range = null) => {
    if (range) {
      setEditingRange(range);
      setFormData({
        min_amount: range.min_amount,
        max_amount: range.max_amount,
        label: range.label,
      });
    } else {
      setEditingRange(null);
      setFormData({ min_amount: "", max_amount: "", label: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRange(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("amount") ? Number.parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.label ||
      formData.min_amount === "" ||
      formData.max_amount === ""
    ) {
      showToast("Please fill all fields", "error");
      return;
    }

    if (formData.min_amount >= formData.max_amount) {
      showToast("Minimum amount must be less than maximum amount", "error");
      return;
    }

    try {
      setLoading(true);
      if (editingRange) {
        await axios.put(
          `http://localhost:5000/api/donation-ranges/${editingRange.id}`,
          formData
        );
        showToast("Donation range updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/donation-ranges", formData);
        showToast("Donation range created successfully");
      }
      handleCloseModal();
      fetchDonationRanges();
    } catch (error) {
      console.error("Error saving donation range:", error);
      showToast("Error saving donation range", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRange = async (rangeId) => {
    if (
      window.confirm("Are you sure you want to delete this donation range?")
    ) {
      try {
        await axios.delete(
          `http://localhost:5000/api/donation-ranges/${rangeId}`
        );
        showToast("Donation range deleted successfully");
        fetchDonationRanges();
      } catch (error) {
        console.error("Error deleting donation range:", error);
        showToast("Error deleting donation range", "error");
      }
    }
  };

  const handleSetDefault = async (rangeId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/donation-ranges/${rangeId}/set-default`
      );
      showToast("Default donation range updated");
      setDefaultRangeId(rangeId);
      fetchDonationRanges();
    } catch (error) {
      console.error("Error setting default range:", error);
      showToast("Error setting default range", "error");
    }
  };

  return (
    <div className="donation-ranges-page">
      <div className="page-header">
        <h1>Donation Ranges</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add Range
        </button>
      </div>

      <div className="ranges-info">
        <p>
          Define pre-set donation ranges for your campaigns. Users will see
          these options when making donations.
        </p>
      </div>

      {loading ? (
        <p className="loading">Loading donation ranges...</p>
      ) : ranges.length > 0 ? (
        <div className="ranges-grid">
          {ranges.map((range) => (
            <div
              key={range.id}
              className={`range-card ${
                defaultRangeId === range.id ? "default" : ""
              }`}
            >
              {defaultRangeId === range.id && (
                <div className="default-badge">Default</div>
              )}
              <div className="range-content">
                <h3>{range.label}</h3>
                <div className="range-amount">
                  ₵{range.min_amount.toLocaleString()} - ₵
                  {range.max_amount.toLocaleString()}
                </div>
              </div>
              <div className="range-actions">
                {defaultRangeId !== range.id && (
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleSetDefault(range.id)}
                  >
                    Set as Default
                  </button>
                )}
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleOpenModal(range)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteRange(range.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">
          No donation ranges configured. Create your first range!
        </p>
      )}

      {showModal && (
        <Modal
          title={
            editingRange ? "Edit Donation Range" : "Add New Donation Range"
          }
          onClose={handleCloseModal}
        >
          <form onSubmit={handleSubmit} className="range-form">
            <div className="form-group">
              <label>Range Label *</label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                placeholder="e.g., Small Donation"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Minimum Amount (₵) *</label>
                <input
                  type="number"
                  name="min_amount"
                  value={formData.min_amount}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Maximum Amount (₵) *</label>
                <input
                  type="number"
                  name="max_amount"
                  value={formData.max_amount}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingRange ? "Update Range" : "Create Range"}
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

export default DonationRanges;
