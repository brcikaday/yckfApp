"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Users.css";

const Users = ({ showToast }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/users");
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("Error loading users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (userId, role) => {
    try {
      await axios.put(`http://127.0.0.1:5000/users/${userId}/role`, {
        role,
      });
      showToast("User role updated successfully");
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      showToast("Error updating user role", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        showToast("User deleted successfully");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        showToast("Error deleting user", "error");
      }
    }
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users Management</h1>
        <p>Total Users: {users.length}</p>
      </div>

      {loading ? (
        <p className="loading">Loading users...</p>
      ) : users.length > 0 ? (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.roles}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <div className="role-edit">
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                        >
                          <option value="student">Student</option>
                          <option value="secondary">Secondary Admin</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleChangeRole(user.id, newRole)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setEditingUserId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="role-badge">{user.role}</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setEditingUserId(user.id);
                        setNewRole(user.role);
                      }}
                    >
                      Change Role
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
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
        <p className="no-data">No users found.</p>
      )}
    </div>
  );
};

export default Users;
