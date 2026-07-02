const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getItineraries,
  getItinerary,
  createItinerary,
  deleteItinerary,
} = require("../controllers/itineraryController");

router.get("/", protect, getItineraries);

router.get("/:id", protect, getItinerary);

router.post("/", protect, createItinerary);

router.delete("/:id", protect, deleteItinerary);

module.exports = router;