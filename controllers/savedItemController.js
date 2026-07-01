const SavedItem = require("../models/SavedItem");

// GET all saved/favorite items
exports.getSavedItems = async (req, res) => {
  try {
    const items = await SavedItem.find({
      user: req.user.id,
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// SAVE / UNSAVE
exports.toggleSave = async (req, res) => {
  try {
    const {
      destination,
      type,
      itemId,
      title,
      image,
    } = req.body;

    let item = await SavedItem.findOne({
      user: req.user.id,
      type,
      itemId,
    });

    if (!item) {
      item = await SavedItem.create({
        user: req.user.id,
        destination,
        type,
        itemId,
        title,
        image,
        isSaved: true,
      });
    } else {
      item.isSaved = !item.isSaved;
      await item.save();
    }

    res.json(item);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// FAVORITE / UNFAVORITE
exports.toggleFavorite = async (req, res) => {
  try {
    const {
      destination,
      type,
      itemId,
      title,
      image,
    } = req.body;

    let item = await SavedItem.findOne({
      user: req.user.id,
      type,
      itemId,
    });

    if (!item) {
      item = await SavedItem.create({
        user: req.user.id,
        destination,
        type,
        itemId,
        title,
        image,
        isFavorite: true,
      });
    } else {
      item.isFavorite = !item.isFavorite;
      await item.save();
    }

    res.json(item);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// DELETE SAVED ITEM
exports.deleteSavedItem = async (req, res) => {
  try {
    const item = await SavedItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json({
      message: "Item removed successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};