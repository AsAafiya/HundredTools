import { useState } from "react";
import logo from "../assets/logos/HundredTools.jpeg";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../styles/auth.css";

function Login({ switchToSignup, onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validate()) {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }
  };

  return (
    <div className="auth-card">
      <div className="logo">
        <img src={logo} alt="HundredTools" />
      </div>

      <h1>HundredTools</h1>
      <p className="subtitle">Login To Your Account</p>

      <label>Email Address</label>
      <input
        type="email"
        placeholder="demo@hundredtools.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={errors.email ? "error-input" : ""}
      />
      {errors.email && <p className="error-text">{errors.email}</p>}

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className={errors.password ? "error-input" : ""}
      />
      {errors.password && <p className="error-text">{errors.password}</p>}

      <button className="auth-btn" onClick={handleSignIn}>
        Sign In <FaLongArrowAltRight />
      </button>

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
  );
}

export default Login;