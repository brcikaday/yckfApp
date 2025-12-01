import { useState, useEffect } from "react";
import api from "../../../api";
import "../styles/Certificates.css";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await api.get("/certificates/my-certificates");
      setCertificates(response.data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificateId, courseName) => {
    try {
      const response = await api.get(`/certificates/download/${certificateId}`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${courseName.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  const handleVerify = (certificateId) => {
    window.open(`/verify-certificate/${certificateId}`, '_blank');
  };

  if (loading) {
    return <div className="loading">Loading certificates...</div>;
  }

  return (
    <div className="certificates-page">
      <div className="page-header">
        <h1>🎓 My Certificates</h1>
        <p>View and download your earned certificates</p>
      </div>

      {certificates.length > 0 ? (
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="certificate-card">
              <div className="certificate-icon">📜</div>
              <h3>{cert.course_name}</h3>
              <p className="issue-date">
                Issued: {new Date(cert.issued_at).toLocaleDateString()}
              </p>
              <p className="certificate-id">ID: {cert.certificate_id}</p>
              
              <div className="certificate-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleDownload(cert.id, cert.course_name)}
                >
                  📥 Download
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleVerify(cert.certificate_id)}
                >
                  ✓ Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-certificates">
          <div className="empty-icon">📚</div>
          <h3>No Certificates Yet</h3>
          <p>Complete courses to earn certificates!</p>
        </div>
      )}
    </div>
  );
};

export default Certificates;
