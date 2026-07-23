const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  uploadProfileImage,

  addFavorite,
  removeFavorite,
  getFavorites,
  saveDestination,
  removeSavedDestination,
  getSavedDestinations,
} = require("../controllers/userController");


// | Profile
router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);
router.post(
  "/profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage
);


// | Favorites
// Get all favorites
router.get("/favorites", protect, getFavorites);

// Add favorite
router.post("/favorites/:id", protect, addFavorite);

// Remove favorite
router.delete("/favorites/:id", protect, removeFavorite);


// | Saved Destinations

// Get saved destinations
router.get("/saved", protect, getSavedDestinations);

// Save destination
router.post("/saved/:id", protect, saveDestination);

// Remove saved destination
router.delete("/saved/:id", protect, removeSavedDestination);

module.exports = router;