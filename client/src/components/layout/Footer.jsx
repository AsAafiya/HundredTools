import "../../styles/footer.css";
import logo from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-brand">
          <img src={logo} alt="HundredTools" className="footer-logo-image" />
          <span>HundredTools</span>
        </div>

        <p className="footer-subtitle">Your all-in-one platform for document productivity</p>

        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>

        <p className="footer-copy">© 2026 HundredTools. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;