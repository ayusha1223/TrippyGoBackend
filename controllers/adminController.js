const User = require("../models/User");
const Destination = require("../models/Destination");
const Itinerary = require("../models/Itinerary");

exports.getDashboardStats = async (req, res) => {
  try {

    const users = await User.countDocuments();

    const destinations =
      await Destination.countDocuments();

    const itineraries =
      await Itinerary.countDocuments();

    const favoriteUsers = await User.find(
      {},
      "favoriteDestinations"
    );

    let favorites = 0;

    favoriteUsers.forEach((user) => {
      favorites += user.favoriteDestinations.length;
    });

    res.json({
      users,
      destinations,
      itineraries,
      favorites,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};