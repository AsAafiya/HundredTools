// Import JWT library
const jwt = require("jsonwebtoken");

/*
  🔐 Middleware to verify JWT token

  This runs BEFORE protected routes
*/
const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }

    // Extract token from "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request
    // Now available in all protected routes
    req.user = decoded;

    // Move to next function (controller)
    next();
  } catch (error) {
    // If token is invalid or expired
    return res.status(401).json({
      message: "Unauthorized: Invalid token",
    });
  }
};

// Export middleware
module.exports = authMiddleware;