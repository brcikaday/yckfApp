"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import "../styles/PaymentSuccessPage.css";
import api from "../../../api"; // your axios instance

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract reference from Paystack callback query params
        const queryParams = new URLSearchParams(location.search);
        const reference = queryParams.get("reference");

        if (!reference) {
          setStatus("error");
          return;
        }

        // Call your backend to verify the payment
        const response = await api.get(`/verify-payment/${reference}`);

        if (response.data.status === "success") {
          setStatus("success");
          // Optionally redirect after a short delay
          setTimeout(() => navigate("/student/courses"), 3000);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="payment-success-container">
      {status === "loading" && (
        <div className="status-message">
          <FaSpinner className="spinner" />
          <p>Verifying your payment, please wait...</p>
        </div>
      )}

      {status === "success" && (
        <div className="status-message success">
          <FaCheckCircle className="icon" />
          <h2>Payment Successful!</h2>
          <p>You now have access to premium content 🎉</p>
        </div>
      )}

      {status === "error" && (
        <div className="status-message error">
          <FaTimesCircle className="icon" />
          <h2>Payment Verification Failed</h2>
          <p>Something went wrong. Please contact support or try again.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
