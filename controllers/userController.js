const User = require("../models/User");
const Destination = require("../models/Destination");

exports.uploadProfileImage = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    user.profileImage = req.file.path;

    await user.save();

    res.json({
      message: "Profile image updated successfully",
      profileImage: user.profileImage,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.updateProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.location = req.body.location || user.location;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const destinationId = req.params.id;

    if (!user.favoriteDestinations.includes(destinationId)) {
      user.favoriteDestinations.push(destinationId);
      await user.save();
    }

    res.json({
      message: "Added to favorites",
      favorites: user.favoriteDestinations,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.removeFavorite = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    user.favoriteDestinations =
      user.favoriteDestinations.filter(
        (id) => id.toString() !== req.params.id
      );

    await user.save();

    res.json({
      message: "Removed from favorites",
      favorites: user.favoriteDestinations,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getFavorites = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate("favoriteDestinations");

    res.json(user.favoriteDestinations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.saveDestination = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    const destinationId = req.params.id;

    if (!user.savedDestinations.includes(destinationId)) {

      user.savedDestinations.push(destinationId);

      await user.save();

    }

    res.json({
      message: "Destination Saved",
      saved: user.savedDestinations,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


exports.removeSavedDestination = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    user.savedDestinations =
      user.savedDestinations.filter(
        (id) => id.toString() !== req.params.id
      );

    await user.save();

    res.json({
      message: "Removed from Saved",
      saved: user.savedDestinations,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


exports.getSavedDestinations = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate("savedDestinations");

    res.json(user.savedDestinations);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};