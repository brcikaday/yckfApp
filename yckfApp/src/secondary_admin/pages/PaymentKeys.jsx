"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import "../styles/PaymentKeys.css";

const PaymentKeys = ({ showToast }) => {
  const [paymentKeys, setPaymentKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState({
    provider: "",
    public_key: "",
    secret_key: "",
    is_enabled: true,
  });

  useEffect(() => {
    fetchPaymentKeys();
  }, []);

  const fetchPaymentKeys = async () => {
    try {
      setLoading(true);
      // Dummy data
      const dummyKeys = [
        {
          id: 1,
          provider: "Flutterwave",
          public_key: "pk_test_*********************",
          secret_key: "sk_test_*********************",
          is_enabled: true,
        },
        {
          id: 2,
          provider: "Paystack",
          public_key: "pk_test_*********************",
          secret_key: "sk_test_*********************",
          is_enabled: true,
        },
        {
          id: 3,
          provider: "Stripe",
          public_key: "pk_test_*********************",
          secret_key: "sk_test_*********************",
          is_enabled: false,
        },
      ];
      setPaymentKeys(dummyKeys);
    } catch (error) {
      console.error("Error fetching payment keys:", error);
      showToast("Error loading payment keys", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (key = null) => {
    if (key) {
      setEditingKey(key);
      setFormData({
        provider: key.provider,
        public_key: "",
        secret_key: "",
        is_enabled: key.is_enabled,
      });
    } else {
      setEditingKey(null);
      setFormData({
        provider: "",
        public_key: "",
        secret_key: "",
        is_enabled: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingKey(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.provider || !formData.public_key || !formData.secret_key) {
      showToast("Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      if (editingKey) {
        await axios.put(
          `http://localhost:5000/api/payment-keys/${editingKey.id}`,
          formData
        );
        showToast("Payment keys updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/payment-keys", formData);
        showToast("Payment keys added successfully");
      }
      handleCloseModal();
      fetchPaymentKeys();
    } catch (error) {
      console.error("Error saving payment keys:", error);
      showToast("Error saving payment keys", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleProvider = async (keyId, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/payment-keys/${keyId}/toggle`,
        {
          is_enabled: !currentStatus,
        }
      );
      showToast(`Payment provider ${!currentStatus ? "enabled" : "disabled"}`);
      fetchPaymentKeys();
    } catch (error) {
      console.error("Error toggling payment provider:", error);
      showToast("Error updating payment provider", "error");
    }
  };

  const handleRegenerateKeys = async (keyId) => {
    if (
      window.confirm(
        "Regenerating keys will invalidate the old ones. Continue?"
      )
    ) {
      try {
        await axios.post(
          `http://localhost:5000/api/payment-keys/${keyId}/regenerate`
        );
        showToast("Payment keys regenerated successfully");
        fetchPaymentKeys();
      } catch (error) {
        console.error("Error regenerating keys:", error);
        showToast("Error regenerating keys", "error");
      }
    }
  };

  const maskKey = (key) => {
    if (!key) return "Not set";
    return key.substring(0, 10) + "*".repeat(Math.max(0, key.length - 10));
  };

  const providerGuides = {
    Flutterwave:
      "Get your keys from Flutterwave Dashboard > Settings > API Keys",
    Paystack:
      "Get your keys from Paystack Dashboard > Settings > API Keys & Webhooks",
    Stripe: "Get your keys from Stripe Dashboard > Developers > API Keys",
  };

  return (
    <div className="payment-keys-page">
      <div className="page-header">
        <h1>Payment Keys Management</h1>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add Payment Provider
        </button>
      </div>

      <div className="keys-info">
        <p>
          🔒 Manage secure API keys for payment gateways. Keys are encrypted and
          partially masked for security.
        </p>
      </div>

      {loading ? (
        <p className="loading">Loading payment keys...</p>
      ) : paymentKeys.length > 0 ? (
        <div className="keys-table-container">
          <table className="keys-table">
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
                      title={
                        key.is_enabled ? "Disable provider" : "Enable provider"
                      }
                    >
                      {key.is_enabled ? "Disable" : "Enable"}
                    </button>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleOpenModal(key)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleRegenerateKeys(key.id)}
                      title="Regenerate API keys"
                    >
                      Regenerate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">
          No payment providers configured. Add your first provider!
        </p>
      )}

      {showModal && (
        <Modal
          title={editingKey ? "Edit Payment Keys" : "Add Payment Provider"}
          onClose={handleCloseModal}
        >
          <form onSubmit={handleSubmit} className="payment-keys-form">
            <div className="form-group">
              <label>Payment Provider *</label>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                required
                disabled={!!editingKey}
              >
                <option value="">Select a provider</option>
                <option value="Flutterwave">Flutterwave</option>
                <option value="Paystack">Paystack</option>
                <option value="Stripe">Stripe</option>
              </select>
              {formData.provider && (
                <p className="form-hint">
                  💡 {providerGuides[formData.provider]}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Public Key *</label>
              <input
                type="password"
                name="public_key"
                value={formData.public_key}
                onChange={handleInputChange}
                placeholder="Enter public key"
                required
              />
              <p className="form-hint">Public key for API authentication</p>
            </div>

            <div className="form-group">
              <label>Secret Key *</label>
              <input
                type="password"
                name="secret_key"
                value={formData.secret_key}
                onChange={handleInputChange}
                placeholder="Enter secret key"
                required
              />
              <p className="form-hint">
                Secret key (never share this publicly)
              </p>
            </div>

            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                checked={formData.is_enabled}
                onChange={handleInputChange}
              />
              <label htmlFor="is_enabled">Enable this payment provider</label>
            </div>

            <div className="security-notice">
              🔒 <strong>Security Notice:</strong> Keys are encrypted and stored
              securely. Never share your secret keys.
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingKey ? "Update Keys" : "Add Provider"}
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

export default PaymentKeys;
