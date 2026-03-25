const express = require("express");
const User = require("../models/User.js");

const router = express.Router();

// GET ALL USERS
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;