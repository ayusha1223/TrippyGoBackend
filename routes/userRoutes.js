const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  addFavorite,
  removeFavorite,
  getFavorites,
  saveDestination,
  removeSavedDestination,
  getSavedDestinations,
} = require("../controllers/userController");

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

router.get("/profile", protect, getProfile);

/*
|--------------------------------------------------------------------------
| Favorites
|--------------------------------------------------------------------------
*/

// Get all favorites
router.get("/favorites", protect, getFavorites);

// Add favorite
router.post("/favorites/:id", protect, addFavorite);

// Remove favorite
router.delete("/favorites/:id", protect, removeFavorite);

/*
|--------------------------------------------------------------------------
| Saved Destinations
|--------------------------------------------------------------------------
*/

// Get saved destinations
router.get("/saved", protect, getSavedDestinations);

// Save destination
router.post("/saved/:id", protect, saveDestination);

// Remove saved destination
router.delete("/saved/:id", protect, removeSavedDestination);

module.exports = router;