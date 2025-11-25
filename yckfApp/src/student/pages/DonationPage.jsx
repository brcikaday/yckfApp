"use client";

import { useState, useEffect } from "react";
import {
  FaHeart,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import api from "../../../api"; // ✅ Make sure you have your axios instance setup
import "../styles/DonationsPage.css";

const DonationsPage = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("GHS");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [exchangeRates, setExchangeRates] = useState({ GHS: 15.5 }); // Fallback rate
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  const MIN_AMOUNT = 50;
  const MAX_AMOUNT = 100;

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoadingRates(true);
      try {
        const response = await api.get("/exchange-rates");
        setExchangeRates(response.data);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        // Keep using fallback rate
      } finally {
        setIsLoadingRates(false);
      }
    };
    fetchRates();
  }, []);

  // Convert currency using live rates
  const convertCurrency = (value, fromCurrency, toCurrency) => {
    if (!value || !fromCurrency || !toCurrency) return "";
    if (fromCurrency === toCurrency) return value;

    try {
      if (fromCurrency === "USD") {
        return value * (exchangeRates[toCurrency] || 15.5);
      } else if (toCurrency === "USD") {
        return value / (exchangeRates[fromCurrency] || 15.5);
      } else {
        // Convert through USD
        const usdAmount = value / (exchangeRates[fromCurrency] || 15.5);
        return usdAmount * (exchangeRates[toCurrency] || 15.5);
      }
    } catch (error) {
      console.error("Currency conversion error:", error);
      return value;
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value) {
      const converted = convertCurrency(
        Number.parseFloat(value),
        currency,
        currency === "GHS" ? "USD" : "GHS"
      );
      setConvertedAmount(converted.toFixed(2));
    } else {
      setConvertedAmount("");
    }
  };

  const handleCurrencyChange = (newCurrency) => {
    if (amount) {
      // Convert the current amount to the new currency
      const converted = convertCurrency(
        Number.parseFloat(amount),
        currency,
        newCurrency
      );
      setAmount(converted.toFixed(2));
    }
    setCurrency(newCurrency);
  };

  // Initialize Paystack payment
  const handlePayment = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Simple frontend validation
    const num = Number.parseFloat(amount);
    if (!amount || num < MIN_AMOUNT || num > MAX_AMOUNT) {
      setErrorMessage(`Amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT} ${currency}`);
      return;
    }

    setLoading(true);
    try {
      // Initialize Paystack transaction
      const res = await api.post("/donations/create_payment_session", {
        amount: num,
        currency,
        callback_url: `${window.location.origin}/student/paymentSuccess`,
      });

      if (res.data.authorization_url) {
        window.location.href = res.data.authorization_url;
      } else {
        throw new Error("No authorization URL received");
      }
    } catch (err) {
      console.error("Payment initialization error:", err);
      setErrorMessage("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isPaymentDisabled =
    !amount ||
    Number.parseFloat(amount) < MIN_AMOUNT ||
    Number.parseFloat(amount) > MAX_AMOUNT ||
    loading;

  return (
    <div className="donations-page">
      <div className="donations-header">
        <h1>
          <FaHeart /> Premium Training Access
        </h1>
        <p>Unlock premium courses and exclusive content</p>
      </div>

      <div className="donations-container">
        {/* Payment Form */}
        <div className="donation-form-section">
          <h2>Complete Your Payment</h2>

          <div className="amount-range-info">
            <p>
              Valid donation range:{" "}
              <strong>
                {MIN_AMOUNT} - {MAX_AMOUNT} {currency}
              </strong>
            </p>
            <p className="conversion-info">
              Equivalent:{" "}
              <strong>
                {convertedAmount || "0.00"} {currency === "GHS" ? "USD" : "GHS"}
              </strong>
            </p>
          </div>

          {errorMessage && (
            <div className="message error-message">
              <FaExclamationCircle /> {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="message success-message">
              <FaCheckCircle /> {successMessage}
            </div>
          )}

          <form onSubmit={handlePayment} className="donation-form">
            {/* Amount */}
            <div className="form-group">
              <label>Amount</label>
              <div className="amount-input-group">
                <input
                  type="number"
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  step="0.01"
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={loading}
                />
                <span className="currency-display">{currency}</span>
              </div>
            </div>

            {/* Currency Buttons */}
            <div className="form-group">
              <label>Currency</label>
              <div className="currency-selector">
                {["GHS", "USD"].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    className={`currency-btn ${
                      currency === curr ? "active" : ""
                    }`}
                    onClick={() => handleCurrencyChange(curr)}
                    disabled={loading}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Secure Payment Note */}
            <div className="form-group">
              <div className="secure-payment-note">
                <FaCheckCircle /> Secure payment powered by Paystack
                <p className="payment-methods-note">
                  Supports cards, mobile money, and bank transfers
                </p>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="pay-btn"
              disabled={isPaymentDisabled}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" /> Initializing Payment...
                </>
              ) : (
                <>Pay {amount ? `${amount} ${currency}` : "Now"} Securely</>
              )}
            </button>

            <p className="payment-note">
              Premium access unlocks only after successful payment.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationsPage;
