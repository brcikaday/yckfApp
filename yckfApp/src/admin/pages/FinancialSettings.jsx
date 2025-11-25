"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/FinancialSettings.css";

const FinancialSettings = ({ showToast }) => {
  const [settings, setSettings] = useState({
    default_currency: "GHS",
    transaction_fee_percentage: 2.5,
    monthly_budget_limit: 50000,
    min_payout_threshold: 100,
    max_payout_threshold: 100000,
  });
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchFinancialSettings();
  }, []);

  const fetchFinancialSettings = async () => {
    try {
      setLoading(true);
      // Using dummy data for now
      const dummySettings = {
        default_currency: "GHS",
        transaction_fee_percentage: 2.5,
        monthly_budget_limit: 50000,
        min_payout_threshold: 100,
        max_payout_threshold: 100000,
      };
      setSettings(dummySettings);
    } catch (error) {
      console.error("Error fetching financial settings:", error);
      showToast("Error loading financial settings", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]:
        name.includes("percentage") ||
        name.includes("limit") ||
        name.includes("threshold")
          ? Number.parseFloat(value)
          : value,
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Validation
    if (
      settings.transaction_fee_percentage < 0 ||
      settings.transaction_fee_percentage > 100
    ) {
      showToast("Transaction fee must be between 0 and 100", "error");
      return;
    }

    if (settings.min_payout_threshold >= settings.max_payout_threshold) {
      showToast("Minimum payout threshold must be less than maximum", "error");
      return;
    }

    try {
      setLoading(true);
      // API call would go here
      await axios.post(
        "http://localhost:5000/api/financial-settings",
        settings
      );
      showToast("Financial settings updated successfully");
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving financial settings:", error);
      showToast("Error saving financial settings", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    fetchFinancialSettings();
    setHasChanges(false);
  };

  return (
    <div className="financial-settings-page">
      <div className="page-header">
        <h1>Financial Settings</h1>
        <p>Configure global financial preferences for your platform</p>
      </div>

      <form onSubmit={handleSaveChanges} className="settings-form-container">
        <div className="settings-cards">
          {/* Currency Settings Card */}
          <div className="settings-card">
            <h3>Currency Settings</h3>
            <div className="form-group">
              <label htmlFor="default_currency">Default Currency</label>
              <select
                id="default_currency"
                name="default_currency"
                value={settings.default_currency}
                onChange={handleInputChange}
              >
                <option value="GHS">Ghana Cedis (GHS)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
              <p className="form-hint">
                Currency used for all transactions on the platform
              </p>
            </div>
          </div>

          {/* Fee Settings Card */}
          <div className="settings-card">
            <h3>Transaction Fees</h3>
            <div className="form-group">
              <label htmlFor="transaction_fee_percentage">
                Transaction Fee Percentage (%)
              </label>
              <input
                type="number"
                id="transaction_fee_percentage"
                name="transaction_fee_percentage"
                value={settings.transaction_fee_percentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="0.1"
              />
              <p className="form-hint">
                Percentage charged on each transaction (e.g., 2.5% means ₵2.50
                on ₵100)
              </p>
            </div>
          </div>

          {/* Budget Limit Card */}
          <div className="settings-card">
            <h3>Budget Limits</h3>
            <div className="form-group">
              <label htmlFor="monthly_budget_limit">
                Monthly Budget Limit (₵)
              </label>
              <input
                type="number"
                id="monthly_budget_limit"
                name="monthly_budget_limit"
                value={settings.monthly_budget_limit}
                onChange={handleInputChange}
                min="0"
                step="100"
              />
              <p className="form-hint">
                Maximum total amount that can be disbursed monthly
              </p>
            </div>
          </div>

          {/* Payout Threshold Card */}
          <div className="settings-card">
            <h3>Payout Thresholds</h3>
            <div className="form-group">
              <label htmlFor="min_payout_threshold">
                Minimum Payout Threshold (₵)
              </label>
              <input
                type="number"
                id="min_payout_threshold"
                name="min_payout_threshold"
                value={settings.min_payout_threshold}
                onChange={handleInputChange}
                min="0"
                step="10"
              />
              <p className="form-hint">
                Minimum amount users must accumulate before requesting payout
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="max_payout_threshold">
                Maximum Payout Threshold (₵)
              </label>
              <input
                type="number"
                id="max_payout_threshold"
                name="max_payout_threshold"
                value={settings.max_payout_threshold}
                onChange={handleInputChange}
                min="0"
                step="100"
              />
              <p className="form-hint">
                Maximum amount that can be requested in a single payout
              </p>
            </div>
          </div>
        </div>

        <div className="settings-summary">
          <h3>Configuration Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Default Currency:</span>
              <span className="value">{settings.default_currency}</span>
            </div>
            <div className="summary-item">
              <span className="label">Transaction Fee:</span>
              <span className="value">
                {settings.transaction_fee_percentage}%
              </span>
            </div>
            <div className="summary-item">
              <span className="label">Monthly Limit:</span>
              <span className="value">
                ₵{settings.monthly_budget_limit.toLocaleString()}
              </span>
            </div>
            <div className="summary-item">
              <span className="label">Payout Range:</span>
              <span className="value">
                ₵{settings.min_payout_threshold.toLocaleString()} - ₵
                {settings.max_payout_threshold.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!hasChanges || loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialSettings;
