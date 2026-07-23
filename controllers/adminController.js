const User = require("../models/User");
const Destination = require("../models/Destination");
const Itinerary = require("../models/Itinerary");
const bcrypt = require("bcryptjs");


// | UPDATE ADMIN PROFILE

exports.updateAdminProfile = async (req, res) => {

  try {

    const admin = await User.findById(req.user.id);

    if (!admin) {

      return res.status(404).json({
        message: "Admin not found",
      });

    }

    admin.name = req.body.name;
    admin.email = req.body.email;
    admin.phone = req.body.phone;

    await admin.save();

    res.json(admin);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.createUser = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists.",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

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


exports.getUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.deleteUser = async (req, res) => {

  try {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};


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

exports.updateUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;

    await user.save();

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.getItineraries = async (req, res) => {

  try {

    const itineraries = await Itinerary
      .find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(itineraries);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};


exports.deleteItinerary = async (req, res) => {

  try {

    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);

    if (!itinerary) {

      return res.status(404).json({
        message: "Itinerary not found",
      });

    }

    res.json({
      message: "Itinerary deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.getItinerary = async (req, res) => {

  try {

    const itinerary = await Itinerary
      .findById(req.params.id)
      .populate("user", "name email");

    if (!itinerary) {

      return res.status(404).json({
        message: "Itinerary not found",
      });

    }

    res.json(itinerary);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.getAdminProfile = async (req, res) => {

  try {
    console.log(req.user);
const admin = await User.findById(req.user.id).select("-password");

    if (!admin) {

      return res.status(404).json({
        message: "Admin not found",
      });

    }

    res.json(admin);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};
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
    // Cards
    const users = await User.countDocuments();
    const destinations = await Destination.countDocuments();
    const itineraries = await Itinerary.countDocuments();

    // Favorites
    const favoriteUsers = await User.find({}, "favoriteDestinations");

    let favorites = 0;

    favoriteUsers.forEach((user) => {
      favorites += user.favoriteDestinations.length;
    });

    // Recent Users
    const latestUsers = await User.find()
      .select("name email createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Itineraries
    const recentItineraries = await Itinerary.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Popular Destinations
    const popularDestinations = await Destination.find()
      .select("name rating")
      .sort({ rating: -1 })
      .limit(5);

    // Monthly User Growth
    const monthlyUsers = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    // Destination Categories (based on tags)
    const categoryMap = {};

    const allDestinations = await Destination.find({}, "tags");

    allDestinations.forEach((destination) => {
      destination.tags.forEach((tag) => {
        categoryMap[tag] = (categoryMap[tag] || 0) + 1;
      });
    });

    const destinationCategories = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));

    res.json({
      users,
      destinations,
      itineraries,
      favorites,

      latestUsers,
      recentItineraries,
      popularDestinations,
      monthlyUsers,
      destinationCategories,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
