import { useState } from "react";
import logo from "../assets/logos/logo_with_name.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../styles/auth.css";


import API from "../utils/api"; 

import { useNavigate } from "react-router-dom";

function Signup({ switchToLogin,onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSignup = async () => {
  if (!validate()) return;

  try {
    await API.post("/signup", {
      name: form.name,
      email: form.email,
      password: form.password
    });


alert("Signup successful!");

// 👇 form turant band
if (onClose) onClose();

// 👇 redirect baad me
setTimeout(() => {
  navigate("/");
}, 2000);
  } catch (err) {
    // backend se aaya error show karna
    setErrors({ general: err.response?.data?.message || "Signup failed" });
  }
};

  return (
    <div className="auth-card">
     
     {errors.success && (
  <div style={{
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#4BB543",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    zIndex: 9999
  }}>
    {errors.success}
  </div>
)}










      <div className="logo">
        <img src={logo} alt="HundredTools" />
      </div>

      <h1>HundredTools</h1>
      <p className="subtitle">Create your account</p>

      <label>Full Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className={errors.name ? "error-input" : ""}
      />
      {errors.name && <p className="error-text">{errors.name}</p>}

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

      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm password"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({ ...form, confirmPassword: e.target.value })
        }
        className={errors.confirmPassword ? "error-input" : ""}
      />
      {errors.confirmPassword && (
        <p className="error-text">{errors.confirmPassword}</p>
      )}

      <button className="auth-btn" onClick={handleSignup}>
        Sign Up <FaLongArrowAltRight />
      </button>

  





      <div className="divider">
        <span>or</span>
      </div>

      <button className="google-btn">Continue with Google</button>

      <p className="signup-text">
        Already have an account?
        <span onClick={switchToLogin} className="auth-link">
          Sign In
        </span>
      </p>
    </div>
  );
}

export default Signup;