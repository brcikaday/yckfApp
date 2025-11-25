import Navbar from "../components/navbar";
import { Card1 } from "../components/cards";
import { Card2 } from "../components/cards";
import CommunityCarousel from "../components/carousel";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/download (3).jpg";
import teamImage from "../assets/colleagues-standing-behind-businessman-using-260nw-2116504676.webp";

function Home() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/register");
  };

  const handleExploreClick = () => {
    navigate("/explore");
  };

  return (
    <>
      <motion.div>
        <Navbar />
        <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-content container">
            <h1>Empowering a Safer Digital World</h1>
            <p>
              Join our mission to educate, protect, and advocate for
              cybersecurity awareness and resilience.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleJoinClick}>
                Join Us
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleExploreClick}
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        <div className="brief">
          <div className="container">
            <div className="brief-content">
              <div
                className="image"
                style={{ backgroundImage: `url(${teamImage})` }}
              ></div>
              <div className="brief-text">
                <h2>YCKF in Brief</h2>
                <p>
                  Young Cyber Knights is an initiative aimed at nurturing the next
                  generation of cybersecurity professionals. This program focuses on
                  providing young individuals with foundational knowledge and
                  practical skills in the field of cybersecurity through engaging,
                  educational activities and hands-on experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="who">
          <div className="container">
          <h3>Who We Are</h3>
          <p>
            We are a nonprofit cybersecurity foundation committed to empowering
            individuals and organizations with the tools and knowledge needed to
            stay safe online. We believe digital safety is a right—not a
            privilege.
          </p>
          <div className="who-cards">
            <Card1
              title="Our Mission"
              content="From community training and school outreach to policy advocacy and research, our initiatives raise awareness and build strong digital defenses for everyone."
            />
            <Card1
              title="Our Vision"
              content="We collaborate with industry leaders, educational institutions, and local communities to make cybersecurity accessible, engaging, and effective."
            />
          </div>
          <button className="who-btn">Learn More About Us</button>
          </div>
        </div>

        <div className="what-we-do">
          <div className="container">
          <div className="what-we-do-text">
            <h2>What We Do</h2>
            <p>
              Our foundation is dedicated to building a safer digital future
              through the following core focus areas.
            </p>
          </div>
          <div className="what-we-do-cards">
            <Card2
              title="Cybersecurity Education"
              content="Workshops, courses, and resources to educate the public and professionals about cybersecurity best practices."
            />
            <Card2
              title="Public Awareness Campaigns"
              content="Campaigns to raise national and local awareness about online threats and how to stay protected."
            />
            <Card2
              title="Policy Advocacy"
              content="Engaging with lawmakers and institutions to shape policies that prioritize cybersecurity and digital rights."
            />
            <Card2
              title="Youth Programs & School Outreach"
              content="Equipping young people with the knowledge to safely navigate the digital world through fun and practical activities."
            />
            <Card2
              title="Community Training"
              content="Collaborating with communities to deliver hands-on training, particularly to underserved and at-risk groups."
            />
          </div>
          </div>
        </div>

        <div className="who">
          <div className="container">
          <h3>Our Mission and Vision</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            sed
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

        <div className="Our-impact">
          <div className="container">
          <h2>Our Impact in Numbers</h2>
          <div className="Our-impact-cards">
            <Card2 title="1000+" content="Individuals Trained" />
            <Card2 title="8+" content="Workshops Conducted" />
            <Card2 title="4+" content="Communities Reached" />
          </div>
          </div>
        </div>
        <CommunityCarousel />
        <Footer />
      </motion.div>
    </>
  );
}

export default Home;
