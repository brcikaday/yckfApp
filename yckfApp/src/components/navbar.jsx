import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/nav.css";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../ThemeContext";

function NavigationBar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Navbar sticky="top" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">YCKF</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="d-flex align-items-center me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <NavDropdown title="Company" id="navbarScrollingDropdown">
              <NavDropdown.Item as={NavLink} to="/company/about">
                About
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/company/team">
                Team
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/company/interns">
                Interns
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/company/volunteers">
                Volunteers
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/company/topperformers">
                Top Performers
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/company/events">
                Events
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/company/careers">
                Careers
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/free-training" end>
              Free Training
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blog" end>
              Blog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" end>
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/complains" end>
              Complains
            </Nav.Link>
          </Nav>
          <div className="auth-links">
            <Nav.Link as={NavLink} to="/login" className="signin-link">
              Sign In
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className="signup-link">
              Sign Up
            </Nav.Link>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
