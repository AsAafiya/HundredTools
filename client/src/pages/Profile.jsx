import { FiUser } from "react-icons/fi";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import "../styles/profile.css";

function Profile() {
  return (
    <div className="profile-page">
      <h1 className="profile-title">Profile</h1>
      <p className="profile-subtitle">
        Manage your account settings and preferences
      </p>

      <div className="profile-container">
        {/* LEFT SIDE - PROFILE CARD */}
        <div className="profile-card">
          <div className="avatar">
            <span>
              <FiUser />
            </span>
          </div>

          <h2>Demo User</h2>
          <p className="email">demo@hundredtools.com</p>

          <button className="edit-btn">Edit Profile</button>

          <button className="logout-btn">
            <FaArrowRightFromBracket /> Logout
          </button>
        </div>

        <div className="account-info">
          <h2>Account Information</h2>

          <div className="info-item">
            <span className="icon">
              <FiUser />
            </span>
            <div>
              <p className="label">Full Name</p>
              <p className="value">Demo User</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">
              <FaRegEnvelope />
            </span>
            <div>
              <p className="label">Email Address</p>
              <p className="value">demo@hundredtools.com</p>
            </div>
          </div>

          <div className="info-item">
            <span className="icon">
              <SlCalender />
            </span>
            <div>
              <p className="label">Member Since</p>
              <p className="value">February 15, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
