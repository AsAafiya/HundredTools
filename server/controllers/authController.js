const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const crypto = require("crypto");

const inMemoryUsers = new Map();

const isDbConnected = () => mongoose.connection.readyState === 1;

// 🔐 SIGNUP
const signup = async (req, res) => {
  try {
    const { name ,email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = isDbConnected()
      ? await User.findOne({ email })
      : inMemoryUsers.get(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    if (isDbConnected()) {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    } else {
      user = {
        _id: `local-${crypto.randomUUID()}`,
        name,
        email,
        password: hashedPassword,
      };

      inMemoryUsers.set(email, user);
    }

    res.status(201).json({
      message: "User created",
      user: { id: user._id, email: user.email },
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup error" });
  }
};

// 🔓 LOGIN
const login = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not configured" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = isDbConnected()
      ? await User.findOne({ email })
      : inMemoryUsers.get(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ FIXED TOKEN
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email ,name:user.name , createdAt: user.createdAt },
    });

  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

// 👤 GET ME
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


// 👥 GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// ❌ DELETE USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};




module.exports = { signup, login, getMe ,getAllUsers,deleteUser};