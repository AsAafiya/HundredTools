const jwt = require("jsonwebtoken");

/*
  📝 TEMP Signup
  - Does NOT save to DB
  - Just returns success response
*/
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    res.status(201).json({
      message: "User created (temporary)",
      user: {
        id: 1,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  🔐 TEMP Login
  - Generates JWT token
*/
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // 🔥 Generate JWT token
    const token = jwt.sign(
      {
        id: 1,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: 1,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/*
  👤 Get current user
  - Uses data from middleware
*/
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      user: {
        id: req.user.id,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login, getMe };