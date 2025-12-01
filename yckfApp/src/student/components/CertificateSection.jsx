import { useState } from "react";
import api from "../../../api";
import "./CertificateSection.css";

const CertificateSection = ({ courseId, progress, courseName }) => {
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState(null);

  const canGenerateCertificate = progress >= 100;

  const handleGenerateCertificate = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/certificates/generate/${courseId}`, {
        responseType: 'blob'
      });
      
      // Create blob URL for PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Open in new tab
      window.open(url, '_blank');
      
      // Also trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${courseName.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setCertificate({ url, generated: true });
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert(error.response?.data?.error || "Failed to generate certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="certificate-section">
      <div className="certificate-header">
        <h3>🎓 Course Certificate</h3>
      </div>

      <div className="certificate-content">
        {canGenerateCertificate ? (
          <>
            <div className="certificate-unlocked">
              <div className="success-icon">✓</div>
              <h4>Congratulations!</h4>
              <p>You've completed this course and earned your certificate!</p>
            </div>

            <button
              className="btn btn-primary btn-certificate"
              onClick={handleGenerateCertificate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating Certificate...
                </>
              ) : (
                <>
                  📄 Generate Certificate
                </>
              )}
            </button>

            {certificate && (
              <div className="certificate-actions">
                <a
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  View Certificate
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="certificate-locked">
            <div className="lock-icon">🔒</div>
            <h4>Certificate Locked</h4>
            <p>Complete the course to unlock your certificate</p>
            <div className="progress-info">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{progress}% Complete</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateSection;
