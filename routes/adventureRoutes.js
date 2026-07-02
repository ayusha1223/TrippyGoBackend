const express = require("express");

const router = express.Router();

const {
  getAllAdventures,
  getAdventureById,
} = require("../controllers/adventureController");

// GET ALL ADVENTURES
router.get("/", getAllAdventures);

// GET ADVENTURE BY ID
router.get("/:id", getAdventureById);

module.exports = router;