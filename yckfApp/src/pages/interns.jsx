import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/colleagues-standing-behind-businessman-using-260nw-2116504676.webp";
import "../css/interns.css";

function Interns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");

  const interns = [
    {
      name: "Sarah Johnson",
      field: "Computer Science",
      program: "Cybersecurity Fundamentals",
      year: "2024",
      batch: "FIRST BATCH",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Michael Chen",
      field: "Information Technology",
      program: "Cybersecurity Fundamentals",
      year: "2024",
      batch: "SECOND BATCH",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  const filteredInterns = interns.filter((intern) => {
    return (
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBatch === "All Batches" || intern.batch === selectedBatch) &&
      (selectedYear === "All Years" || intern.year === selectedYear) &&
      (selectedProgram === "All Programs" || intern.program === selectedProgram)
    );
  });

  return (
    <>
      <motion.div>
        <Navbar />
        
        {/* Hero Section */}
        <div className="interns-hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="interns-hero-content container">
            <h1>Our Interns</h1>
            <p>Building the next generation of cybersecurity professionals</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="container">
          <div className="filters-grid">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search interns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option>All Batches</option>
              <option>FIRST BATCH</option>
              <option>SECOND BATCH</option>
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option>All Years</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              <option>All Programs</option>
              <option>Cybersecurity Fundamentals</option>
            </select>
          </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <div className="container">
          <p>Showing {filteredInterns.length} of {interns.length} interns</p>
          </div>
        </div>

        {/* Interns Grid */}
        <div className="interns-section">
          <div className="container">
          <div className="interns-grid">
            {filteredInterns.map((intern, index) => (
              <motion.div
                key={index}
                className="intern-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="batch-label">
                  <span className={intern.batch === "FIRST BATCH" ? "batch-first" : "batch-second"}>
                    Batch {intern.batch}
                  </span>
                </div>
                <div className="intern-image">
                  <img src={intern.image} alt={intern.name} />
                </div>
                <div className="intern-info">
                  <h3>{intern.name}</h3>
                  <p className="field">{intern.field}</p>
                  <p className="program">{intern.program}</p>
                  <p className="year">{intern.year}</p>
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

export default Interns;