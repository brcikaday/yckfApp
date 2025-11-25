import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/colleagues-standing-behind-businessman-using-260nw-2116504676.webp";
import "../css/volunteers.css";

function Volunteers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedArea, setSelectedArea] = useState("All Areas");

  const volunteers = [
    {
      name: "Emily Rodriguez",
      role: "Penetration Tester",
      area: "Engineering",
      period: "3/3/2025 - 8/30/2025",
      status: "Past",
      image: "https://via.placeholder.com/300x200",
      impact: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    },
    {
      name: "James Wilson",
      role: "Penetration Tester",
      area: "Computer Engineering",
      period: "5/5/2025 - Present",
      status: "Current",
      image: "https://via.placeholder.com/300x200",
      impact: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    },
    {
      name: "Lisa Wang",
      role: "IT Manager",
      area: "Computer Engineering",
      period: "4/1/2025 - 7/30/2025",
      status: "Past",
      image: "https://via.placeholder.com/300x200",
      impact: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    },
    {
      name: "David Kim",
      role: "Cybersecurity Expert",
      area: "Mathematics",
      period: "1/5/2025 - 3/29/2025",
      status: "Past",
      image: "https://via.placeholder.com/300x200",
      impact: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    },
  ];

  const filteredVolunteers = volunteers.filter((volunteer) => {
    return (
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "All Roles" || volunteer.role === selectedRole) &&
      (selectedStatus === "All Status" || volunteer.status === selectedStatus) &&
      (selectedArea === "All Areas" || volunteer.area === selectedArea)
    );
  });

  return (
    <>
      <motion.div>
        <Navbar />
        
        {/* Hero Section */}
        <div className="volunteers-hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="volunteers-hero-content container">
            <h1>Our Volunteers</h1>
            <p>Dedicated individuals making a difference in cybersecurity</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="container">
          <div className="filters-grid">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option>All Roles</option>
              <option>Penetration Tester</option>
              <option>IT Manager</option>
              <option>Cybersecurity Expert</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>Current</option>
              <option>Past</option>
            </select>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              <option>All Areas</option>
              <option>Engineering</option>
              <option>Computer Engineering</option>
              <option>Mathematics</option>
            </select>
          </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <div className="container">
          <p>Showing {filteredVolunteers.length} of {volunteers.length} volunteers</p>
          </div>
        </div>

        {/* Volunteers Grid */}
        <div className="volunteers-section">
          <div className="container">
          <div className="volunteers-grid">
            {filteredVolunteers.map((volunteer, index) => (
              <motion.div
                key={index}
                className="volunteer-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="status-label">
                  <span className={volunteer.status === "Current" ? "status-current" : "status-past"}>
                    {volunteer.status}
                  </span>
                </div>
                <div className="volunteer-image">
                  <img src={volunteer.image} alt={volunteer.name} />
                </div>
                <div className="volunteer-info">
                  <h3>{volunteer.name}</h3>
                  <p className="role">{volunteer.role}</p>
                  <p className="area">{volunteer.area}</p>
                  <p className="period">{volunteer.period}</p>
                  <div className="impact-section">
                    <h4>Impact:</h4>
                    <p className="impact">{volunteer.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </div>

        <Footer />
      </motion.div>
    </>
  );
}

export default Volunteers;