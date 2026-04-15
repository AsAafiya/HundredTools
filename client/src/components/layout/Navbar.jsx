import { Link, NavLink,useNavigate } from "react-router-dom";
import "../../styles/header.css";
import logo from "../../assets/logos/logo.png";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import AuthModal from "../auth/authModel";
import { removeToken } from "../../utils/auth";

const ADMIN_EMAIL = "soni@gmail.com";

const Navbar = () => {

   const userEmail = localStorage.getItem("userEmail");
  const isAdmin = userEmail === ADMIN_EMAIL;


  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const navRef = useRef(null);
   const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    setShowLogin(false);
  };

const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    localStorage.removeItem("userEmail");
    setOpenMenu(null);
    alert("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navMenus = [
    {
      key: "pdf",
      label: "PDF Tools",
      path: "/tools/pdf",
      viewAllLabel: "View All Tools",
      items: [
        { name: "Merge PDF", path: "/tools/merge-pdf" },
        { name: "Split PDF", path: "/tools/split-pdf" },
        { name: "Compress PDF", path: "/tools/compress-pdf" },
        { name: "PDF to JPG", path: "/tools/pdf-to-jpg" },
        { name: "JPG to PDF", path: "/tools/jpg-to-pdf" },
        { name: "PDF to Word", path: "/tools/pdf-to-word" },
        { name: "Word to PDF", path: "/tools/word-to-pdf" },
        { name: "Add Page Numbers", path: "/tools/add-page-numbers" },
        { name: "Add Watermark", path: "/tools/add-watermark" },
      ],
    },
    {
      key: "image",
      label: "Image Tools",
      path: "/tools/image",
      viewAllLabel: "View All Tools",
      items: [
        { name: "Compress Image", path: "/tools/image/compress-image" },
        { name: "Resize Image", path: "/tools/image/resize-image" },
        { name: "Convert Image", path: "/tools/image/convert-image" },
        { name: "Crop Image", path: "/tools/image/crop-image" },
      ],
    },
    {
      key: "video",
      label: "Video Tools",
      path: "/tools/video",
      viewAllLabel: "View All Tools",
      items: [
        { name: "Compress Video", path: "/tools/compress-video" },
        { name: "Trim Video", path: "/tools/trim-video" },
      ],
    },
  ];

  return (
    <header className="navbar">
      {/* ✅ OUTER CONTAINER (spacing) */}
      <div className="site-container">
        
        {/* ✅ INNER LAYOUT (grid/flex) */}
        <div className="navbar-container" ref={navRef}>

          {/* LEFT - LOGO */}
          <div className="navbar-left">
            <Link to="/" className="logo-link" onClick={() => setOpenMenu(null)}>
              <span className="logo-mark">
                <img src={logo} alt="HundredTools" className="logo-image" />
              </span>
              <span className="logo-copy">
                <span className="logo-title">HundredToolsApp</span>
                <span className="logo-tag">Fast document toolkit</span>
              </span>
            </Link>
          </div>

          {/* CENTER - NAV LINKS */}
          <nav className="navbar-center">
            <NavLink
              to="/"
              onClick={() => setOpenMenu(null)}
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Home
            </NavLink>

           {navMenus.map((menu) => (
  <div className="nav-dropdown" key={menu.key}>
    <button
      className={`nav-dropdown-trigger ${
        openMenu === menu.key ? "active-link" : ""
      }`}
      onClick={() =>
        setOpenMenu((prev) => (prev === menu.key ? null : menu.key))
      }
    >
      {menu.label}
      {openMenu === menu.key ? <FaChevronUp /> : <FaChevronDown />}
    </button>

    <div
      className={`dropdown-menu ${
        openMenu === menu.key ? "open" : ""
      }`}
    >
      {menu.items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="dropdown-item"
          onClick={() => setOpenMenu(null)}
        >
          {item.name}
        </Link>
      ))}

      <Link
        to={menu.path}
        className="dropdown-item dropdown-view-all"
        onClick={() => setOpenMenu(null)}
      >
        {menu.viewAllLabel}
      </Link>
    </div>
  </div>
))}
        </nav>


          {/* RIGHT - ACTIONS */}
          <div className="navbar-right">
            <div className="nav-actions">
              {isLoggedIn ? (
                <>
                  <NavLink to="/my-files">My Files</NavLink>
                  <NavLink to="/profile">Profile</NavLink>

                  {isAdmin && (
                  <NavLink to="/admin" className="admin-btn">
                    Admin
                  </NavLink>
                )}

                  <button className="nav-text-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="nav-text-btn"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                  <button
                    className="primary-btn"
                    onClick={() => setShowSignup(true)}
                  >
                    Get Started
                  </button>
                </>
              )}

              <button
                className="theme-toggle-btn"
                onClick={handleThemeToggle}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

              <div
  className="hamburger"
  onClick={() => setMobileMenu(!mobileMenu)}
>
  {mobileMenu ? "✖" : "☰"}
</div>
            </div>
          </div>

        </div>
      </div>

   { mobileMenu && (
  <div className="mobile-menu">

    {navMenus.map((menu) => (
      <div className="mobile-dropdown" key={menu.key}>

   <div
  className="mobile-dropdown-title"
  onClick={(e) => {
    e.stopPropagation();
    if (openMobileDropdown === menu.key) {
      setOpenMobileDropdown(null);
    } else {
      setOpenMobileDropdown(menu.key);
    }
  }}
>
  {menu.label}

  <span className="mobile-arrow">
    {openMobileDropdown === menu.key ? <FaChevronUp /> : <FaChevronDown />}
  </span>
</div>
        {openMobileDropdown === menu.key && (
          <div className="mobile-submenu">
            {menu.items.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  setMobileMenu(false);
                  setOpenMobileDropdown(null);
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

      </div>
    ))}

  </div>
)}


      {/* MODALS */}
      {showLogin && (
        <AuthModal onClose={() => setShowLogin(false)}>
          <Login
            onLoginSuccess={handleLoginSuccess}
            // switchToSignup={() => {
            //   setShowLogin(false);
            //   setShowSignup(true);
            // }}
          />
        </AuthModal>
      )}

      {showSignup && (
        <AuthModal onClose={() => setShowSignup(false)}>
          <Signup
            // switchToLogin={() => {
            //   setShowSignup(false);
            //   setShowLogin(true);
            // }}
          />
        </AuthModal>
      )}
    </header>
  );
};

export default Navbar;

