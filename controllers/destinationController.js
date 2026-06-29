
const Destination = require("../models/Destination");

// GET ALL DESTINATIONS
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch destinations",
      error: error.message,
    });
  }
};

// GET DESTINATION BY ID
const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.json(destination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllDestinations,
  getDestinationById,
};

