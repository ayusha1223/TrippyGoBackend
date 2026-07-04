const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getUsers,
  createDestination,
  getDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/adminController");

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);

// Update Destination
router.put(
  "/destinations/:id",
  protect,
  admin,
  updateDestination
);

/*
|--------------------------------------------------------------------------
| Destinations
|--------------------------------------------------------------------------
*/

// Create Destination
router.post(
  "/destinations",
  protect,
  admin,
  createDestination
);

// Get single destination
router.get(
  "/destinations/:id",
  protect,
  admin,
  getDestination
);
/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

router.get(
  "/users",
  protect,
  admin,
  getUsers
);

// Delete Destination
router.delete(
  "/destinations/:id",
  protect,
  admin,
  deleteDestination
);

module.exports = router;