const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  getDashboardStats,
  deleteDestination,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);
router.delete(
  "/destinations/:id",
  protect,
  admin,
  deleteDestination
);

module.exports = router;