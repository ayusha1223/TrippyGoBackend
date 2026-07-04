const User = require("../models/User");
const Destination = require("../models/Destination");
const Itinerary = require("../models/Itinerary");
/*
|--------------------------------------------------------------------------
| DELETE DESTINATION
|--------------------------------------------------------------------------
*/

exports.deleteDestination = async (req, res) => {

  try {

    const destination =
      await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {

      return res.status(404).json({
        message: "Destination not found",
      });

    }

    res.json({
      message: "Destination deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
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