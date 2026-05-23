import "../../styles/footer.css";
import logo from "../../assets/logos/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-column footer-brand-column">
            <div className="footer-brand">
              <img src={logo} alt="HundredTools" className="footer-logo-image" />
              <span>HundredTools</span>
            </div>

            <p className="footer-subtitle">
              All-in-one toolkit for PDF, image, and video workflows.
            </p>

            <p className="footer-trust-line">
              Secure processing • Fast conversion • No software install
            </p>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/support">
                Contact
              </Link>
              <Link to="/support">
                Help Center
              </Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>Get Support</h4>
            <p className="footer-support-text">
              Need help with conversion or file issues?
            </p>
            <Link
              to="/support"
              className="footer-support-btn"
            >
              Contact Support
            </Link>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copy">© {currentYear} HundredTools. All rights reserved.</p>
          <div className="footer-policy-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;