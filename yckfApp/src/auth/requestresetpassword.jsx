"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import "../css/requestresetpassword.css";
import api from "../../api";

const RequestResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setServerError("");
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/request_password_reset", {
        email: email,
      });

      if (response.status === 200) {
        setShowSuccess(true);
        // You can either redirect to reset password page or show instructions
        // For this example, we'll redirect after showing the message
        setTimeout(() => {
          // In a real app, you would get a token from email and navigate with it
          //   navigate("/reset-password");
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        setServerError(
          error.response.data.message ||
            "Failed to send reset link. Please try again."
        );
      } else if (error.request) {
        setServerError(
          "Unable to connect to server. Please check your connection."
        );
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <motion.div
        className="forgot-password-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="back-button" onClick={() => navigate("/login")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Login
        </div>

        <h1 className="forgot-password-title">Forgot Password?</h1>
        <p className="forgot-password-subtitle">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>

        {showSuccess && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Password reset instructions have been sent to your email!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${error ? "input-error" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {error && <span className="error-text">{error}</span>}
          </div>

          {serverError && <div className="server-error">{serverError}</div>}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? (
              <span className="button-content">
                <span className="spinner"></span>
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>

          <div className="login-link">
            Remember your password?{" "}
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Login
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RequestResetPassword;
