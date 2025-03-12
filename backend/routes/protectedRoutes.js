const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Example: A protected route that only authenticated users can access
router.get("/protected", authenticateUser, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

module.exports = router;
