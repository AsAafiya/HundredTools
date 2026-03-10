import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import logo from "../../assets/logo.jpg";
import { useState } from "react";

import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import AuthModal from "../auth/authModel";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navMenus = [
    {
      key: "pdf",
      label: "PDF Tools",
      path: "/pdf-tools",
      viewAllLabel: "View All PDF Tools",
      items: [
        "Merge PDF",
        "Split PDF",
        "Compress PDF",
        "PDF to JPG",
        "JPG to PDF",
        "PDF to Word",
        "Word to PDF",
        "Rotate PDF",
        "Add Watermark",
      ],
    },
    {
      key: "image",
      label: "Image Tools",
      path: "/image-tools",
      viewAllLabel: "View All Image Tools",
      items: [
        "Compress Image",
        "Resize Image",
        "Convert JPG to PNG",
        "Convert PNG to JPG",
        "Crop Image",
        "Rotate Image",
        "Remove Background",
      ],
    },
    {
      key: "video",
      label: "Video Tools",
      path: "/video-tools",
      viewAllLabel: "View All Video Tools",
      items: [
        "Compress Video",
        "Convert MP4 to AVI",
        "Convert AVI to MP4",
        "Extract Audio",
        "Trim Video",
        "Resize Video",
      ],
    },
  ];

  return (
    <header className="navbar">
      <div className="site-container navbar-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logo} alt="HundredTools" className="logo-image" />
          </Link>
        </div>

        <nav className="nav-links">
          {navMenus.map((menu) => (
            <div className="nav-dropdown" key={menu.key}>
              <NavLink
                to={menu.path}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                {menu.label} <span className="nav-caret">▾</span>
              </NavLink>

              <div
                className="dropdown-menu"
                role="menu"
                aria-label={menu.label}
              >
                {menu.items.map((item) => {
                  let path = menu.path;

                  if (item === "Merge PDF") path = "/tools/merge-pdf";
                  if (item === "Split PDF") path = "/tools/split-pdf";
                  if (item === "Compress PDF") path = "/tools/compress-pdf";

                  return (
                    <Link key={item} to={path} className="dropdown-item">
                      {item}
                    </Link>
                  );
                })}

                <Link
                  to={menu.path}
                  className="dropdown-item dropdown-view-all"
                >
                  {menu.viewAllLabel}
                </Link>
              </div>
            </div>
          ))}
        </nav>

        <div className="nav-actions">
          <NavLink
            to="/my-files"
            className={({ isActive }) => (isActive ? "active-action" : "")}
          >
            My Files
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active-action" : "")}
          >
            Profile
          </NavLink>
          <button className="nav-text-btn" onClick={() => setShowLogin(true)}>
            Login
          </button>

          <button className="primary-btn" type="button" onClick={() => setShowSignup(true)}>
            Get Started
          </button>
        </div>
      </div>

      {showLogin && (
        <AuthModal onClose={() => setShowLogin(false)}>
          <Login
            switchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        </AuthModal>
      )}

      {showSignup && (
        <AuthModal onClose={() => setShowSignup(false)}>
          <Signup
            switchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        </AuthModal>
      )}
    </header>
  );
};

export default Navbar;
