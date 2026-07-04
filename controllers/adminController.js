const User = require("../models/User");
const Destination = require("../models/Destination");
const Itinerary = require("../models/Itinerary");

/*
|--------------------------------------------------------------------------
| GET SINGLE DESTINATION
|--------------------------------------------------------------------------
*/

exports.getDestination = async (req, res) => {

  try {

    const destination = await Destination.findById(req.params.id);

    if (!destination) {

      return res.status(404).json({
        message: "Destination not found",
      });

    }

    res.json(destination);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/*
|--------------------------------------------------------------------------
| UPDATE DESTINATION
|--------------------------------------------------------------------------
*/

exports.updateDestination = async (req, res) => {

  try {

    const destination = await Destination.findById(req.params.id);

    if (!destination) {

      return res.status(404).json({
        message: "Destination not found",
      });

    }

    destination.name = req.body.name;
    destination.slug = req.body.slug;
    destination.province = req.body.province;
    destination.district = req.body.district;
    destination.latitude = req.body.latitude;
    destination.longitude = req.body.longitude;
    destination.rating = req.body.rating;
    destination.budget = req.body.budget;
    destination.duration = req.body.duration;
    destination.bestTime = req.body.bestTime;
    destination.description = req.body.description;

    // Keep old image if no new image is sent
    if (req.body.heroImage) {
      destination.heroImage = req.body.heroImage;
    }

    await destination.save();

    res.json({
      message: "Destination updated successfully.",
      destination,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};
/*
|--------------------------------------------------------------------------
| GET ALL USERS
|--------------------------------------------------------------------------
*/

exports.getUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

/*
|--------------------------------------------------------------------------
| CREATE DESTINATION
|--------------------------------------------------------------------------
*/

exports.createDestination = async (req, res) => {
  try {

    const destination = await Destination.create({
      name: req.body.name,
      slug: req.body.slug,

      heroImage: req.body.heroImage,
      description: req.body.description,

      province: req.body.province,
      district: req.body.district,

      latitude: req.body.latitude,
      longitude: req.body.longitude,

      rating: req.body.rating,
      budget: req.body.budget,
      duration: req.body.duration,
      bestTime: req.body.bestTime,

      gallery: [],
      tags: [],
      thingsToDo: [],
      placesToVisit: [],
      adventures: [],
      hotels: [],
      restaurants: [],
    });

    res.status(201).json({
      message: "Destination created successfully.",
      destination,
    });

 } catch (error) {

  console.error("CREATE DESTINATION ERROR:");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });

}
};
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