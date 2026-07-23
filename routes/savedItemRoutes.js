const express = require("express");
console.log(" savedItemRoutes loaded");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getSavedItems,
  toggleSave,
  toggleFavorite,
  deleteSavedItem,
} = require("../controllers/savedItemController");

// Get all saved/favorite items
router.get("/", protect, getSavedItems);

// Save / Unsave any item
router.post("/save", protect, toggleSave);

// Favorite / Unfavorite any item
router.post("/favorite", protect, toggleFavorite);

router.delete("/:id", protect, deleteSavedItem);

module.exports = router;