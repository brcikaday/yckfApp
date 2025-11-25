"use client";

import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api";
import axios from "axios";
import "../styles/Settings.css";

const Settings = ({ showToast }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/me"); // call the /me endpoint
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put("/admin/profile", profileData);
      showToast("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Error updating profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);
      await api.put("/admin/password", {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      });
      showToast("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      showToast("Error updating password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your profile and security settings</p>
      </div>

      <div className="settings-container">
        <div className="settings-section">
          <h2>Profile Information</h2>
          <form onSubmit={handleUpdateProfile} className="settings-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                // value={profileData?.fullname || ""}
                onChange={handleProfileChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profileData?.email || ""}
                onChange={handleProfileChange}
              />
            </div>

            {/* <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
    
                onChange={handleProfileChange}
              />
            </div> */}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="settings-section">
          <h2>Change Password</h2>
          <form onSubmit={handleUpdatePassword} className="settings-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
