import logo from "../assets/logos/HundredTools.jpeg"
import "../styles/auth.css";

function Signup() {

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="logo"><img src={logo} alt="HundredTools" /></div>

        <h1>HundredTools</h1>
        <p className="subtitle">Login To Your Account</p>

        <label>Email Address</label>
        <input type="email" placeholder="demo@hundredtools.com" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <button className="auth-btn">
          Sign In →
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <button className="google-btn">
          Continue with Google
        </button>

        <p className="signup-text">
          Don't have an account? <a href="/login">Sign Up</a>
        </p>

      </div>

    </div>

  );

}

export default Signup;