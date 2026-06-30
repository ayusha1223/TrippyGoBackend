const Itinerary = require("../models/Itinerary");

// GET ALL

exports.getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().sort({
      createdAt: -1,
    });

    res.json(itineraries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE

exports.getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(
      req.params.id
    );

    if (!itinerary) {
      return res.status(404).json({
        message: "Itinerary not found",
      });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE

exports.createItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.create(req.body);

    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE

exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(
      req.params.id
    );

    if (!itinerary) {
      return res.status(404).json({
        message: "Itinerary not found",
      });
    }

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};