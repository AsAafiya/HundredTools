const express = require("express");

const { signup, login, getMe ,getAllUsers,deleteUser } = require("../controllers/authController");
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




/*
  👥 Get all users (Admin)
*/
router.get("/users", getAllUsers);

/*
  ❌ Delete user
*/
router.delete("/users/:id", deleteUser);








module.exports = router;