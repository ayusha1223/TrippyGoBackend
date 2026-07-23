const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  getDashboardStats,

  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAdminProfile,
  getItineraries,
  getItinerary,
  deleteItinerary,

  createDestination,
  getDestination,
  updateDestination,
  deleteDestination,

} = require("../controllers/adminController");

// Get single user
router.get(
  "/users/:id",
  protect,
  admin,
  getUser
);
// Create User
router.post(
  "/users",
  protect,
  admin,
  createUser
);
// Delete User
router.delete(
  "/users/:id",
  protect,
  admin,
  deleteUser
);

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboardStats
);
router.put(
  "/users/:id",
  protect,
  admin,
  updateUser
);

// Update Destination
router.put(
  "/destinations/:id",
  protect,
  admin,
  updateDestination
);

router.get(
  "/itineraries",
  protect,
  admin,
  getItineraries
);

router.delete(
  "/itineraries/:id",
  protect,
  admin,
  deleteItinerary
);
router.get(
  "/itineraries/:id",
  protect,
  admin,
  getItinerary
);

router.get(
  "/profile",
  protect,
  admin,
  getAdminProfile
);

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