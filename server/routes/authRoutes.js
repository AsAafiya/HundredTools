const express = require("express");

const { signup, login, getMe } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
  📝 Signup
*/
router.post("/signup", signup);

/*
  🔐 Login
*/
router.post("/login", login);

/*
  🔒 Protected route
*/
router.get("/me", authMiddleware, getMe);

module.exports = router;