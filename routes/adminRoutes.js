const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/dashboard", protect, admin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin!",
  });
});

module.exports = router;