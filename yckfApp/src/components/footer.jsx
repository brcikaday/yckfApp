import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left section */}
        <div className="footer-left">
          <h2 className="logo">YCKF</h2>
          <p>
            Educating and training the youth in cyber security, fostering skills
            to protect and secure digital environments
          </p>
        </div>

        {/* Right section */}
        <div className="footer-right">
          <div className="footer-column">
            <h4>COMPANY</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Make A Complain</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>FOLLOW US</h4>
            <ul>
              <li>
                <a href="#">Linkedin</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">X (Twitter)</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>
          © 2025 Young Cyber Knight Foundation™. All Rights Reserved. <br />
          Designed and developed by{" "}
          <a href="https://example.com" target="_blank" rel="noreferrer">
            Andrews Amankwah Takyi
          </a>
        </p>

        <div className="social-icons">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaLinkedinIn />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
