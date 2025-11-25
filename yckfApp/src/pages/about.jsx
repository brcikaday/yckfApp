import Navbar from "../components/navbar";
import { Card1 } from "../components/cards";
import CommunityCarousel from "../components/carousel";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import heroImage from "../assets/download (3).jpg";
import teamImage from "../assets/colleagues-standing-behind-businessman-using-260nw-2116504676.webp";
import "../css/about.css";

function About() {
  return (
    <>
      <motion.div>
        <Navbar />
        
        {/* Hero Section */}
        <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-content container">
            <h1>About YCKF</h1>
            <p>
              Discover our journey, mission, and commitment to building a safer digital world for everyone.
            </p>
          </div>
        </div>

        {/* Our History Section (same as YCKF in Brief from home) */}
        <div className="brief container">
          <div
            className="image"
            style={{ backgroundImage: `url(${teamImage})` }}
          ></div>
          <div className="brief-text">
            <h2>Our History</h2>
            <p>
              Young Cyber Knights is an initiative aimed at nurturing the next
              generation of cybersecurity professionals. This program focuses on
              providing young individuals with foundational knowledge and
              practical skills in the field of cybersecurity through engaging,
              educational activities and hands-on experiences.
            </p>
          </div>
        </div>

        {/* Who We Are, Our Story, Our Core Values */}
        <div className="about-details">
          <div className="container">
          <h2>Get to Know Us Better</h2>
          <div className="about-cards">
            <div className="about-card">
              <h3>Who We Are</h3>
              <p>
                We are a nonprofit cybersecurity foundation committed to empowering
                individuals and organizations with the tools and knowledge needed to
                stay safe online. We believe digital safety is a right—not a
                privilege.
              </p>
            </div>
            <div className="about-card">
              <h3>Our Story</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit.
              </p>
            </div>
            <div className="about-card">
              <h3>Our Core Values</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit.
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="who">
          <div className="container">
          <h3>Our Mission and Vision</h3>
          <p>
            Driving our commitment to cybersecurity excellence and community empowerment
          </p>
          <div className="who-cards">
            <Card1
              title="Our Mission"
              content="Our mission is to empower individuals, businesses, and communities with the knowledge, tools, and support needed to stay safe and secure in an increasingly digital world. We advocate for inclusive cybersecurity education, promote responsible digital citizenship, and provide accessible resources to protect against evolving online threats."
            />
            <Card1
              title="Our Vision"
              content="We envision a world where everyone has the confidence and capability to navigate the digital landscape securely. A world where cybersecurity is not a privilege but a shared responsibility and foundational right—fostering trust, innovation, and resilience in our global community."
            />
          </div>
          </div>
        </div>

        {/* Certifications and Recognitions */}
        <div className="certifications">
          <div className="container">
          <h2>Certifications & Recognitions</h2>
          <p>Our achievements and industry acknowledgments</p>
          <div className="cert-grid">
            <div className="cert-item">
              <img src="https://via.placeholder.com/150x100" alt="Certification 1" />
              <h4>ISO 27001 Certified</h4>
            </div>
            <div className="cert-item">
              <img src="https://via.placeholder.com/150x100" alt="Certification 2" />
              <h4>Cybersecurity Excellence Award</h4>
            </div>
            <div className="cert-item">
              <img src="https://via.placeholder.com/150x100" alt="Certification 3" />
              <h4>Community Impact Recognition</h4>
            </div>
            <div className="cert-item">
              <img src="https://via.placeholder.com/150x100" alt="Certification 4" />
              <h4>Educational Partnership Seal</h4>
            </div>
          </div>
          </div>
        </div>

        {/* Community Testimonials */}
        <CommunityCarousel />

        {/* Partners and Sponsors */}
        <div className="partners">
          <div className="container">
          <h2>Our Partners & Sponsors</h2>
          <p>Collaborating with industry leaders to strengthen cybersecurity</p>
          <div className="partners-grid">
            <div className="partner-item">
              <img src="https://via.placeholder.com/180x80" alt="Partner 1" />
            </div>
            <div className="partner-item">
              <img src="https://via.placeholder.com/180x80" alt="Partner 2" />
            </div>
            <div className="partner-item">
              <img src="https://via.placeholder.com/180x80" alt="Partner 3" />
            </div>
            <div className="partner-item">
              <img src="https://via.placeholder.com/180x80" alt="Partner 4" />
            </div>
            <div className="partner-item">
              <img src="https://via.placeholder.com/180x80" alt="Partner 5" />
            </div>
            <div className="partner-item">
              <img src="https://via.placeholder.com/180x80" alt="Partner 6" />
            </div>
          </div>
          </div>
        </div>

        <Footer />
      </motion.div>
    </>
  );
}

export default About;