import logo from "../assets/logos/HundredTools.jpeg";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../styles/auth.css";

function Login({ switchToSignup }) {
  return (
    <>
      <div className="auth-card">
        <div className="logo">
          <img src={logo} alt="HundredTools" />
        </div>

        <h1>HundredTools</h1>
        <p className="subtitle">Login To Your Account</p>

        <label>Email Address</label>
        <input type="email" placeholder="demo@hundredtools.com" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <button className="auth-btn">Sign In <FaLongArrowAltRight/></button>

        <div className="divider">
          <span>or</span>
        </div>

        <button className="google-btn">Continue with Google</button>

        <p className="signup-text">
          Don't have an account?
          <span onClick={switchToSignup} className="auth-link">
            Sign Up
          </span>
        </p>
      </div>
    </>
  );
}

export default Login;