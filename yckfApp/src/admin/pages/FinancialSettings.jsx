"use client";

import { useEffect, useState } from "react";
import api from "../../../api";
import Modal from "../components/Modal";
import "../styles/FinancialSettings.css";

const FinancialSettings = ({ showToast }) => {
  const [donations, setDonations] = useState([]);
  const [ranges, setRanges] = useState([]);
  const [paymentKeys, setPaymentKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [editingRange, setEditingRange] = useState(null);
  const [editingKey, setEditingKey] = useState(null);

  const [rangeFormData, setRangeFormData] = useState({
    min_amount: "",
    max_amount: "",
    label: "",
  });

  const [keyFormData, setKeyFormData] = useState({
    provider: "",
    public_key: "",
    secret_key: "",
    is_enabled: true,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchDonations(),
      fetchDonationRanges(),
      fetchPaymentKeys(),
    ]);
  };

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/donations");
      setDonations(response.data || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
      showToast("Error loading donations", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchDonationRanges = async () => {
    try {
      const response = await api.get("/financial/donation-ranges");
      setRanges(response.data || []);
    } catch (error) {
      console.error("Error fetching donation ranges:", error);
      showToast("Error loading donation ranges", "error");
    }
  };

  const fetchPaymentKeys = async () => {
    try {
      const response = await api.get("/financial/payment-keys");
      setPaymentKeys(response.data || []);
    } catch (error) {
      console.error("Error fetching payment keys:", error);
      showToast("Error loading payment keys", "error");
    }
  };

  // Donation Refund Handler
  const handleRefund = async (donationId) => {
    if (window.confirm("Are you sure you want to refund this donation?")) {
      try {
        await api.post(`/financial/donations/${donationId}/refund`);
        showToast("Donation refunded successfully");
        fetchDonations();
      } catch (error) {
        console.error("Error refunding donation:", error);
        showToast("Error processing refund", "error");
      }
    }
  };

  // Donation Range Handlers
  const handleOpenRangeModal = (range = null) => {
    if (range) {
      setEditingRange(range);
      setRangeFormData({
        min_amount: range.min_amount,
        max_amount: range.max_amount,
        label: range.label,
      });
    } else {
      setEditingRange(null);
      setRangeFormData({ min_amount: "", max_amount: "", label: "" });
    }
    setShowRangeModal(true);
  };

  const handleRangeSubmit = async (e) => {
    e.preventDefault();

    if (
      !rangeFormData.label ||
      rangeFormData.min_amount === "" ||
      rangeFormData.max_amount === ""
    ) {
      showToast("Please fill all fields", "error");
      return;
    }

    if (rangeFormData.min_amount >= rangeFormData.max_amount) {
      showToast("Minimum amount must be less than maximum amount", "error");
      return;
    }

    try {
      if (editingRange) {
        await api.put(
          `/financial/donation-ranges/${editingRange.id}`,
          rangeFormData
        );
        showToast("Donation range updated successfully");
      } else {
        await api.post("/financial/donation-ranges", rangeFormData);
        showToast("Donation range created successfully");
      }
      setShowRangeModal(false);
      fetchDonationRanges();
    } catch (error) {
      console.error("Error saving donation range:", error);
      showToast("Error saving donation range", "error");
    }
  };

  const handleDeleteRange = async (rangeId) => {
    if (
      window.confirm("Are you sure you want to delete this donation range?")
    ) {
      try {
        await api.delete(`/financial/donation-ranges/${rangeId}`);
        showToast("Donation range deleted successfully");
        fetchDonationRanges();
      } catch (error) {
        console.error("Error deleting donation range:", error);
        showToast("Error deleting donation range", "error");
      }
    }
  };

  // Payment Keys Handlers
  const handleOpenKeyModal = (key = null) => {
    if (key) {
      setEditingKey(key);
      setKeyFormData({
        provider: key.provider,
        public_key: "",
        secret_key: "",
        is_enabled: key.is_enabled,
      });
    } else {
      setEditingKey(null);
      setKeyFormData({
        provider: "",
        public_key: "",
        secret_key: "",
        is_enabled: true,
      });
    }
    setShowKeyModal(true);
  };

  const handleKeySubmit = async (e) => {
    e.preventDefault();

    if (
      !keyFormData.provider ||
      !keyFormData.public_key ||
      !keyFormData.secret_key
    ) {
      showToast("Please fill all required fields", "error");
      return;
    }

    try {
      if (editingKey) {
        await api.put(`/financial/payment-keys/${editingKey.id}`, keyFormData);
        showToast("Payment keys updated successfully");
      } else {
        await api.post("/financial/payment-keys", keyFormData);
        showToast("Payment keys added successfully");
      }
      setShowKeyModal(false);
      fetchPaymentKeys();
    } catch (error) {
      console.error("Error saving payment keys:", error);
      showToast("Error saving payment keys", "error");
    }
  };

  const handleToggleProvider = async (keyId, currentStatus) => {
    try {
      await api.put(`/financial/payment-keys/${keyId}/toggle`, {
        is_enabled: !currentStatus,
      });
      showToast(`Payment provider ${!currentStatus ? "enabled" : "disabled"}`);
      fetchPaymentKeys();
    } catch (error) {
      console.error("Error toggling payment provider:", error);
      showToast("Error updating payment provider", "error");
    }
  };

  const maskKey = (key) => {
    if (!key) return "Not set";
    return key.substring(0, 10) + "*".repeat(Math.max(0, key.length - 10));
  };

  return (
    <div className="financial-settings-page">
      <div className="page-header">
        <h1>Financial Settings</h1>
        <p>Manage donations, ranges, and payment configurations</p>
      </div>

      {/* Donations Made Section */}
      <section className="financial-section">
        <div className="section-header">
          <h2>All Donations Made</h2>
        </div>
        {loading ? (
          <p className="loading">Loading donations...</p>
        ) : donations.length > 0 ? (
          <div className="table-container">
            <table className="financial-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Donor Name</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>#{donation.id}</td>
                    <td>{donation.donor_name}</td>
                    <td>{donation.email}</td>
                    <td>₵{donation.amount.toLocaleString()}</td>
                    <td>
                      {new Date(donation.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`status-badge ${donation.status}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRefund(donation.id)}
                        disabled={donation.status === "refunded"}
                      >
                        Refund
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No donations found.</p>
        )}
      </section>

      {/* Donation Ranges Section */}
      <section className="financial-section">
        <div className="section-header">
          <h2>Donation Ranges</h2>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenRangeModal()}
          >
            + Add Range
          </button>
        </div>
        {ranges.length > 0 ? (
          <div className="ranges-grid">
            {ranges.map((range) => (
              <div key={range.id} className="range-card">
                <div className="range-content">
                  <h3>{range.label}</h3>
                  <div className="range-amount">
                    ₵{range.min_amount.toLocaleString()} - ₵
                    {range.max_amount.toLocaleString()}
                  </div>
                </div>
                <div className="range-actions">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleOpenRangeModal(range)}
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
          <p className="no-data">No donation ranges configured.</p>
        )}
      </section>

      {/* Payment Keys Section */}
      <section className="financial-section">
        <div className="section-header">
          <h2>Payment Keys</h2>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenKeyModal()}
          >
            + Add Provider
          </button>
        </div>
        {paymentKeys.length > 0 ? (
          <div className="table-container">
            <table className="financial-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Public Key</th>
                  <th>Secret Key</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentKeys.map((key) => (
                  <tr key={key.id}>
                    <td>
                      <strong>{key.provider}</strong>
                    </td>
                    <td>
                      <code className="masked-key">
                        {maskKey(key.public_key)}
                      </code>
                    </td>
                    <td>
                      <code className="masked-key">
                        {maskKey(key.secret_key)}
                      </code>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          key.is_enabled ? "enabled" : "disabled"
                        }`}
                      >
                        {key.is_enabled ? "✓ Enabled" : "✗ Disabled"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() =>
                          handleToggleProvider(key.id, key.is_enabled)
                        }
                      >
                        {key.is_enabled ? "Disable" : "Enable"}
                      </button>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleOpenKeyModal(key)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No payment providers configured.</p>
        )}
      </section>

      {/* Donation Range Modal */}
      {showRangeModal && (
        <Modal
          title={
            editingRange ? "Edit Donation Range" : "Add New Donation Range"
          }
          onClose={() => setShowRangeModal(false)}
        >
          <form onSubmit={handleRangeSubmit} className="modal-form">
            <div className="form-group">
              <label>Range Label *</label>
              <input
                type="text"
                name="label"
                value={rangeFormData.label}
                onChange={(e) =>
                  setRangeFormData({ ...rangeFormData, label: e.target.value })
                }
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
                  value={rangeFormData.min_amount}
                  onChange={(e) =>
                    setRangeFormData({
                      ...rangeFormData,
                      min_amount: parseFloat(e.target.value),
                    })
                  }
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
                  value={rangeFormData.max_amount}
                  onChange={(e) =>
                    setRangeFormData({
                      ...rangeFormData,
                      max_amount: parseFloat(e.target.value),
                    })
                  }
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
                onClick={() => setShowRangeModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Payment Key Modal */}
      {showKeyModal && (
        <Modal
          title={editingKey ? "Edit Payment Keys" : "Add Payment Provider"}
          onClose={() => setShowKeyModal(false)}
        >
          <form onSubmit={handleKeySubmit} className="modal-form">
            <div className="form-group">
              <label>Payment Provider *</label>
              <select
                name="provider"
                value={keyFormData.provider}
                onChange={(e) =>
                  setKeyFormData({ ...keyFormData, provider: e.target.value })
                }
                required
                disabled={!!editingKey}
              >
                <option value="">Select a provider</option>
                <option value="Flutterwave">Flutterwave</option>
                <option value="Paystack">Paystack</option>
                <option value="Stripe">Stripe</option>
              </select>
            </div>

            <div className="form-group">
              <label>Public Key *</label>
              <input
                type="password"
                name="public_key"
                value={keyFormData.public_key}
                onChange={(e) =>
                  setKeyFormData({ ...keyFormData, public_key: e.target.value })
                }
                placeholder="Enter public key"
                required
              />
            </div>

            <div className="form-group">
              <label>Secret Key *</label>
              <input
                type="password"
                name="secret_key"
                value={keyFormData.secret_key}
                onChange={(e) =>
                  setKeyFormData({ ...keyFormData, secret_key: e.target.value })
                }
                placeholder="Enter secret key"
                required
              />
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                checked={keyFormData.is_enabled}
                onChange={(e) =>
                  setKeyFormData({
                    ...keyFormData,
                    is_enabled: e.target.checked,
                  })
                }
              />
              <label htmlFor="is_enabled">Enable this payment provider</label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingKey ? "Update Keys" : "Add Provider"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowKeyModal(false)}
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

export default FinancialSettings;
