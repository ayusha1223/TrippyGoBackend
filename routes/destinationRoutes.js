const express = require("express");

const router = express.Router();

const {
  getAllDestinations,
  getDestinationById,
} = require("../controllers/destinationController");

// GET ALL DESTINATIONS
router.get("/", getAllDestinations);

// GET DESTINATION BY ID
router.get("/:id", getDestinationById);

module.exports = router;

