"use client";

import { useEffect, useState } from "react";
import api from "../../../api";
import "../styles/FinancialSettings.css";

const FinancialSettings = ({ showToast }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/financial/donations");
      setDonations(response.data || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
      showToast("Error loading donations", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="financial-settings-page">
      <div className="page-header">
        <h1>Financial Settings</h1>
        <p>View all donations made (Read-only access)</p>
      </div>

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
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>#{donation.id}</td>
                    <td>{donation.donor_name}</td>
                    <td>{donation.email}</td>
                    <td>₵{donation.amount.toLocaleString()}</td>
                    <td>{new Date(donation.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${donation.status}`}>
                        {donation.status}
                      </span>
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
    </div>
  );
};

export default FinancialSettings;
