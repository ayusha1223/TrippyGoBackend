const express = require("express");

const router = express.Router();

const {
  getItineraries,
  getItinerary,
  createItinerary,
  deleteItinerary,
} = require("../controllers/itineraryController");

router.get("/", getItineraries);

router.get("/:id", getItinerary);

router.post("/", createItinerary);

router.delete("/:id", deleteItinerary);

module.exports = router;