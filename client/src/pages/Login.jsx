import { useState } from "react";
import logo from "../assets/logos/HundredTools.jpeg";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../styles/auth.css";

  import API from "../utils/api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

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

  // const handleSignIn = () => {
  //   if (validate()) {
  //     if (onLoginSuccess) {
  //       onLoginSuccess();
  //     }
  //   }
  // };



const navigate = useNavigate();

const handleSignIn = async () => {
  if (!validate()) return;

  try {
    const res = await API.post("/login", {
      email: form.email,
      password: form.password
    });

    // JWT token store
    saveToken(res.data.token);
 localStorage.setItem("userEmail", form.email);
    localStorage.setItem("userEmail", form.email);

    // Call optional callback
    if (onLoginSuccess) onLoginSuccess(res.data.token);

    // Redirect to protected page
    navigate("/profile");
    
  } catch (err) {
    setErrors({ general: err.response?.data?.message || "Login failed" });
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

      {/* --------------- */}


      {errors.general && <p className="error-text">{errors.general}</p>}


{/* --------------------------- */}
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