import logo from "../assets/logos/HundredTools.jpeg";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../styles/auth.css";

function Signup({ switchToLogin }) {

  return (
    <>
      <div className="auth-card">
      <div className="logo"><img src={logo} alt="HundredTools" /></div>

      <h1>HundredTools</h1>
      <p className="subtitle">Create your account</p>

      <label>Full Name</label>
      <input type="text" placeholder="Enter your name" />

      <label>Email Address</label>
      <input type="email" placeholder="demo@hundredtools.com" />

      <label>Password</label>
      <input type="password" placeholder="Enter password" />

      <label>Confirm Password</label>
      <input type="password" placeholder="Confirm password" />

      <button className="auth-btn">
        Sign Up <FaLongArrowAltRight/>
      </button>

      <div className="divider">
        <span>or</span>
      </div>

      <button className="google-btn">
        Continue with Google
      </button>

      <p className="signup-text">
        Already have an account?
        <span onClick={switchToLogin} className="auth-link">
          Sign In
        </span>
      </p>
    </div>
    </>
  );
}

export default Signup;