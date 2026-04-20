import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { LuFiles } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import logo from "../assets/logos/HundredTools.jpeg";

import "./admin.css";

function AdminLayout() {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    navigate("/"); 
  };
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div>
          <div className="back-top">
            <NavLink to="/">← Back to Site</NavLink>
          </div>
          <div className="admin-logo">
            <img src={logo} alt="HundredTools" />
            <h2>HundredTools</h2>
          </div>

          <nav>
            <NavLink end to="/admin">
              <MdOutlineDashboard />
              Dashboard
            </NavLink>
            <NavLink to="/admin/users">
              <FaRegUser />
              Users
            </NavLink>
            <NavLink to="/admin/files">
              <LuFiles />
              Files
            </NavLink>
            <NavLink to="/admin/analytics">
              <VscGraph />
              Analytics
            </NavLink>
            <NavLink to="/admin/settings">
              <IoSettingsOutline />
              Settings
            </NavLink>
            <button className="logout-btn" onClick={handleLogout}>
              <RiLogoutBoxLine className="logout-icon" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
