import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import heroImage from "../assets/colleagues-standing-behind-businessman-using-260nw-2116504676.webp";
import "../css/team.css";

function Team() {
  const teamMembers = [
    {
      name: "Bright Peter Kwaku Boateng",
      position: "CEO",
      image: "https://via.placeholder.com/200x200",
    },
    {
      name: "Joseph Prempeh",
      position: "IT STAFF ( WEB FRONTEND DEVELOPER)",
      image: "https://via.placeholder.com/200x200",
    },
    // Add more team members as needed
  ];

  return (
    <>
      <motion.div>
        <Navbar />
        
        {/* Hero Section */}
        <div className="team-hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="team-hero-content container">
            <h1>Meet Our Team</h1>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="team-section">
          <div className="container">
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="join-us-section">
          <div className="container">
            <h2>Do want to join us?</h2>
            <p>Explore some exciting career openings at Young Cyber Knight Foundation.</p>
            <button className="join-us-btn">Explore Job Opportunities</button>
          </div>
        </div>

        <Footer />
      </motion.div>
    </>
  );
}

export default Team;