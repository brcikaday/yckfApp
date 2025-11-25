import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/colleagues-standing-behind-businessman-using-260nw-2116504676.webp";
import "../css/topperformers.css";

function TopPerformers() {
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const performers = [
    {
      name: "James Wilson",
      category: "Volunteer",
      rank: 1,
      recognition: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      year: "2023",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Michael Chen",
      category: "Intern",
      rank: 2,
      recognition: "Best Software developer Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      year: "2025",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "David Kim",
      category: "Intern",
      rank: 3,
      recognition: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      year: "2023",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Emily Rodriguez",
      category: "Volunteer",
      rank: 4,
      recognition: "Outstanding performance in penetration testing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      year: "2025",
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Sarah Johnson",
      category: "Volunteer",
      rank: 5,
      recognition: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      year: "2024",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  const filteredPerformers = performers.filter((performer) => {
    return (
      (selectedYear === "All Years" || performer.year === selectedYear) &&
      (selectedCategory === "All Categories" || performer.category === selectedCategory)
    );
  });

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <>
      <motion.div>
        <Navbar />
        
        {/* Hero Section */}
        <div className="performers-hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="performers-hero-content container">
            <h1>Top Performers</h1>
            <p>Celebrating excellence</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="container">
          <div className="filters-grid">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option>All Years</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Volunteer</option>
              <option>Intern</option>
            </select>
          </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <div className="container">
          <p>Showing {filteredPerformers.length} of {performers.length} top performers</p>
          </div>
        </div>

        {/* Performers Grid */}
        <div className="performers-section">
          <div className="container">
          <div className="performers-grid">
            {filteredPerformers.map((performer, index) => (
              <motion.div
                key={index}
                className="performer-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="rank-icon">
                  <span>{getRankIcon(performer.rank)}</span>
                </div>
                <div className="category-label">
                  <span className={performer.category === "Volunteer" ? "category-volunteer" : "category-intern"}>
                    {performer.category}
                  </span>
                </div>
                <div className="performer-image">
                  <img src={performer.image} alt={performer.name} />
                </div>
                <div className="performer-info">
                  <h3>{performer.name}</h3>
                  <div className="recognition-section">
                    <h4>Recognition:</h4>
                    <p className="recognition">{performer.recognition}</p>
                  </div>
                  <p className="year">Year: {performer.year}</p>
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

export default TopPerformers;