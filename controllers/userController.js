const User = require("../models/User");
const Destination = require("../models/Destination");

/*
|--------------------------------------------------------------------------
| GET PROFILE
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| ADD FAVORITE
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| REMOVE FAVORITE
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| GET FAVORITES
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| SAVE DESTINATION
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| REMOVE SAVED
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| GET SAVED DESTINATIONS
|--------------------------------------------------------------------------
*/

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