const SavedItem = require("../models/SavedItem");
const Itinerary = require("../models/Itinerary");

exports.getDashboardStats = async (req, res) => {
  try {

    const savedPlaces = await SavedItem.countDocuments({
      user: req.user.id,
      isSaved: true,
    });

    const favorites = await SavedItem.countDocuments({
      user: req.user.id,
      isFavorite: true,
    });

    const itineraries = await Itinerary.countDocuments({
      user: req.user.id,
    });

    res.json({
      savedPlaces,
      favorites,
      itineraries,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};