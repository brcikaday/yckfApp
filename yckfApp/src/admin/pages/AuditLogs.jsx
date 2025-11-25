"use client";

import { useEffect, useState } from "react";
import "../styles/AuditLogs.css";

const AuditLogs = ({ showToast }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    admin_name: "",
    action_type: "",
    date_from: "",
    date_to: "",
  });

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      // Dummy data
      const dummyLogs = [
        {
          id: 1,
          admin_name: "Admin User",
          action: "Updated Payment Key",
          description: "Updated Flutterwave API keys",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          ip_address: "192.168.1.100",
          status: "success",
        },
        {
          id: 2,
          admin_name: "Admin User",
          action: "Changed Donation Range",
          description: "Modified Small Donation range limits",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          ip_address: "192.168.1.100",
          status: "success",
        },
        {
          id: 3,
          admin_name: "Secondary Admin",
          action: "Updated Financial Settings",
          description: "Changed transaction fee to 2.5%",
          timestamp: new Date(
            Date.now() - 1 * 24 * 60 * 60 * 1000
          ).toISOString(),
          ip_address: "192.168.1.105",
          status: "success",
        },
        {
          id: 4,
          admin_name: "Admin User",
          action: "Disabled Payment Provider",
          description: "Disabled Stripe payment provider",
          timestamp: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000
          ).toISOString(),
          ip_address: "192.168.1.100",
          status: "success",
        },
        {
          id: 5,
          admin_name: "Secondary Admin",
          action: "Failed Payment Key Update",
          description: "Attempted to update invalid API key",
          timestamp: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000
          ).toISOString(),
          ip_address: "192.168.1.105",
          status: "failed",
        },
      ];
      setLogs(dummyLogs);
      setFilteredLogs(dummyLogs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      showToast("Error loading audit logs", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filtersToApply) => {
    let filtered = logs;

    if (filtersToApply.admin_name) {
      filtered = filtered.filter((log) =>
        log.admin_name
          .toLowerCase()
          .includes(filtersToApply.admin_name.toLowerCase())
      );
    }

    if (filtersToApply.action_type) {
      filtered = filtered.filter((log) =>
        log.action
          .toLowerCase()
          .includes(filtersToApply.action_type.toLowerCase())
      );
    }

    if (filtersToApply.date_from) {
      const dateFrom = new Date(filtersToApply.date_from);
      filtered = filtered.filter((log) => new Date(log.timestamp) >= dateFrom);
    }

    if (filtersToApply.date_to) {
      const dateTo = new Date(filtersToApply.date_to);
      dateTo.setHours(23, 59, 59, 999);
      filtered = filtered.filter((log) => new Date(log.timestamp) <= dateTo);
    }

    setFilteredLogs(filtered);
  };

  const handleResetFilters = () => {
    setFilters({ admin_name: "", action_type: "", date_from: "", date_to: "" });
    setFilteredLogs(logs);
  };

  const handleDownloadLogs = async (format) => {
    try {
      if (format === "csv") {
        const csv = [
          [
            "ID",
            "Admin Name",
            "Action",
            "Description",
            "Timestamp",
            "IP Address",
            "Status",
          ],
          ...filteredLogs.map((log) => [
            log.id,
            log.admin_name,
            log.action,
            log.description,
            new Date(log.timestamp).toLocaleString(),
            log.ip_address,
            log.status,
          ]),
        ]
          .map((row) => row.map((cell) => `"${cell}"`).join(","))
          .join("\n");

        const element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
        );
        element.setAttribute(
          "download",
          `audit_logs_${new Date().toISOString().split("T")[0]}.csv`
        );
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        showToast("Logs downloaded as CSV");
      }
    } catch (error) {
      console.error("Error downloading logs:", error);
      showToast("Error downloading logs", "error");
    }
  };

  return (
    <div className="audit-logs-page">
      <div className="page-header">
        <h1>Audit Logs</h1>
        <button
          className="btn btn-primary"
          onClick={() => handleDownloadLogs("csv")}
        >
          📥 Download CSV
        </button>
      </div>

      <div className="filters-section">
        <div className="filters-grid">
          <div className="form-group">
            <label>Admin Name</label>
            <input
              type="text"
              name="admin_name"
              value={filters.admin_name}
              onChange={handleFilterChange}
              placeholder="Search by admin name"
            />
          </div>

          <div className="form-group">
            <label>Action Type</label>
            <input
              type="text"
              name="action_type"
              value={filters.action_type}
              onChange={handleFilterChange}
              placeholder="Search by action"
            />
          </div>

          <div className="form-group">
            <label>From Date</label>
            <input
              type="date"
              name="date_from"
              value={filters.date_from}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              name="date_to"
              value={filters.date_to}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <button className="btn btn-secondary" onClick={handleResetFilters}>
          Clear Filters
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading audit logs...</p>
      ) : filteredLogs.length > 0 ? (
        <div className="logs-table-container">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Admin Name</th>
                <th>Action</th>
                <th>Description</th>
                <th>IP Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="timestamp">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td>{log.admin_name}</td>
                  <td className="action">{log.action}</td>
                  <td className="description">{log.description}</td>
                  <td className="ip-address">{log.ip_address}</td>
                  <td>
                    <span className={`status-badge ${log.status}`}>
                      {log.status === "success" ? "✓ Success" : "✗ Failed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="logs-summary">
            <p>
              Showing <strong>{filteredLogs.length}</strong> of{" "}
              <strong>{logs.length}</strong> log entries
            </p>
          </div>
        </div>
      ) : (
        <p className="no-data">No audit logs found matching your filters.</p>
      )}
    </div>
  );
};

export default AuditLogs;
