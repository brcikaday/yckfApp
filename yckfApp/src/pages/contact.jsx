import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import { FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import "../css/contact.css";
import Footer from "../components/footer.jsx";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("message");
  const [message, setMessage] = useState("");

  return (
    <>
      <Navbar />
      <div className="page">
        <main className="page-content">
          <header
            className="contact-hero"
            role="banner"
            aria-label="Contact page banner"
          >
            <div className="hero-content">
              <h1>Contact Us</h1>
              <p>
                We'd love to hear from you! Fill out the form below and we'll
                get back to you soon.
              </p>
            </div>
          </header>

          <section className="contact-section">
            <div className="contact-container">
              {/* LEFT SIDE */}
              <div className="contact-info">
                <div className="info-card">
                  <div className="info">
                    <span>You can email us on</span>
                    <span>yckfadmin@youngcyberknightsfoundation.org</span>
                  </div>
                  <div className="arrow-btn">
                    <button>→</button>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info">
                    <span>Give us a call on</span>
                    <span>+233505313578</span>
                  </div>
                  <div className="arrow-btn">
                    <button>→</button>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info">
                    <span>Locate us at</span>
                    <span>Kumasi, Ashanti Region</span>
                  </div>
                  <div className="arrow-btn">
                    <button>→</button>
                  </div>
                </div>

                <div className="ss">
                  <p className="social-text">
                    <b>Our social profiles</b>
                  </p>
                  <div className="info-card socials">
                    <div className="social-icons">
                      <button>
                        <FaLinkedinIn />
                      </button>
                      <button>
                        <FaFacebookF />
                      </button>
                      <button>
                        <FaTwitter />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="contact-form">
                <div className="tabs">
                  <button
                    className={activeTab === "message" ? "active" : ""}
                    onClick={() => setActiveTab("message")}
                  >
                    Send Message
                  </button>
                  <button
                    className={activeTab === "call" ? "active" : ""}
                    onClick={() => setActiveTab("call")}
                  >
                    Request a Call
                  </button>
                </div>

                {activeTab === "message" ? (
                  <form>
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" />

                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" />

                    <label>
                      Message{" "}
                      <span className="char-limit">{message.length}/1000</span>
                    </label>
                    <textarea
                      placeholder="Write your message"
                      rows="4"
                      maxLength={1000}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <button type="submit" className="submit-btn">
                      Send Message
                    </button>
                  </form>
                ) : (
                  <form>
                    <label>Name</label>
                    <input type="text" placeholder="Enter your name" />

                    <label>Phone Number</label>
                    <input type="tel" placeholder="e.g., +233 501 234 567" />

                    <label>Preferred Time</label>
                    <input
                      type="text"
                      placeholder="Select a preferred time"
                      list="preferredTimes"
                    />
                    <datalist id="preferredTimes">
                      <option value="ASAP" />
                      <option value="09:00 - 11:00" />
                      <option value="12:00 - 14:00" />
                      <option value="15:00 - 17:00" />
                      <option value="18:00 - 20:00" />
                    </datalist>

                    <button type="submit" className="submit-btn">
                      Request Call
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
