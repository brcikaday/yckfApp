"use client";

import { useState } from "react";
import { FaUser, FaLock, FaCamera, FaSave } from "react-icons/fa";
import api from "../../../api";
import "../styles/ProfilePage.css";

const ProfilePage = ({ student, setStudentData }) => {
  const [profileData, setProfileData] = useState({
    name: student?.name || "",
    email: student?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(null);

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

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/student/change-profile", profileData);

      setStudentData({
        ...student,
        ...profileData,
      });
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    try {
      await api.put("/student/change-password", {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setMessage({ type: "success", text: "Password changed successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Password change error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to change password",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="profile-container">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="section-header">
            <FaUser /> Personal Information
          </div>

          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder="Enter your email"
              />
            </div>

            <button type="submit" className="save-btn">
              <FaSave /> Save Changes
            </button>
          </form>
        </div>

        {/* Password Section */}
        <div className="profile-section">
          <div className="section-header">
            <FaLock /> Change Password
          </div>

          <form onSubmit={handleChangePassword} className="password-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
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
                placeholder="Enter new password"
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
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" className="save-btn">
              <FaLock /> Change Password
            </button>
          </form>
        </div>

        {/* Profile Picture Section */}
        <div className="profile-section">
          <div className="section-header">
            <FaCamera /> Profile Picture
          </div>

          <div className="picture-upload">
            <div className="current-picture">
              <div className="placeholder-avatar">
                {student?.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="upload-area">
              <input type="file" accept="image/*" className="file-input" />
              <button type="button" className="upload-btn">
                <FaCamera /> Choose Image
              </button>
              <p className="upload-hint">JPG, PNG or GIF (Max. 5MB)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
