import React, { useState } from "react";
import "../css/complains.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

const Complains = () => {
  const [crimeType, setCrimeType] = useState("");
  const [otherCrime, setOtherCrime] = useState("");
  const [incidentDesc, setIncidentDesc] = useState("");
  const [evidenceDesc, setEvidenceDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      contactMethod: e.target.contactMethod.value,
      location: e.target.location.value,
      dateOfIncident: e.target.dateOfIncident.value,
      crimeType: crimeType === "Other" ? otherCrime : crimeType,
      description: e.target.description.value,
      evidenceDescription: e.target.evidenceDescription.value,
      reported: e.target.reported.value,
      urgency: e.target.urgency.value,
    };
    console.log("Form Data:", formData);
    alert("Form submitted! Check console for details.");
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <main className="page-content">
          <section className="report-section">
            <div className="report-container">
              <h2 className="form-title">📄 Cybercrime Report Form</h2>
              <p className="form-subtitle">
                All information provided will be treated with strict
                confidentiality and used solely for investigation and support
                purposes.
              </p>

              <form onSubmit={handleSubmit} className="report-form">
                {/* Name & Email */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Contact Method */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      name="phone"
                      type="text"
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Method of Contact *</label>
                    <select name="contactMethod" required>
                      <option>Email</option>
                      <option>Phone</option>
                      <option>WhatsApp</option>
                    </select>
                  </div>
                </div>

                {/* Location & Date */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      name="location"
                      type="text"
                      placeholder="City/Town, Country"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Incident *</label>
                    <input name="dateOfIncident" type="date" required />
                  </div>
                </div>

                {/* Cybercrime Type */}
                <div className="form-group">
                  <label htmlFor="crimeType">Type of Cybercrime *</label>
                  <select
                    name="crimeType"
                    value={crimeType}
                    onChange={(e) => setCrimeType(e.target.value)}
                    required
                  >
                    <option value="">Select one...</option>
                    <option>Online fraud</option>
                    <option>Identity theft</option>
                    <option>Phishing</option>
                    <option>Hacking</option>
                    <option>Cyberbullying</option>
                    <option>Sextortion</option>
                    <option>Mobile Money Fraud</option>
                    <option>Romance Scam</option>
                    <option>Data Breach</option>
                    <option>Impersonation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* If "Other" is chosen */}
                {crimeType === "Other" && (
                  <div className="form-group">
                    <label>Please specify *</label>
                    <input
                      type="text"
                      value={otherCrime}
                      onChange={(e) => setOtherCrime(e.target.value)}
                      placeholder="State the incident yourself"
                      required
                    />
                  </div>
                )}

                {/* Description */}
                <div className="form-group">
                  <label>Detailed Description of the Incident *</label>
                  <textarea
                    name="description"
                    rows="4"
                    maxLength={2000}
                    value={incidentDesc}
                    onChange={(e) => setIncidentDesc(e.target.value)}
                    placeholder="Describe the incident..."
                    required
                  />
                  <small>{incidentDesc.length}/2000</small>
                </div>

                {/* Evidence Description */}
                <div className="form-group">
                  <textarea
                    name="evidenceDescription"
                    rows="3"
                    maxLength={2000}
                    value={evidenceDesc}
                    onChange={(e) => setEvidenceDesc(e.target.value)}
                    placeholder="Provide details of evidence (screenshots, emails, etc.)"
                  />
                  <small>{evidenceDesc.length}/2000</small>
                </div>

                {/* Upload Evidence */}
                <div className="form-group">
                  <label>Upload Evidence Files</label>
                  <input type="file" name="evidenceFiles" multiple />
                  <small>You can upload multiple files (max 10MB each)</small>
                </div>

                {/* Reported & Urgency */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Have You Reported This to Any Authority? *</label>
                    <select name="reported" required>
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Urgency Level *</label>
                    <select name="urgency" required>
                      <option>Normal</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <div className="submit-container">
                  <button type="submit" className="submit-btn">
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Complains;
