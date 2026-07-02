const Adventure = require("../models/Adventure");

// GET ALL ADVENTURES
exports.getAllAdventures = async (req, res) => {
  try {
    const adventures = await Adventure.find();

    res.status(200).json(adventures);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ADVENTURE BY ID
exports.getAdventureById = async (req, res) => {
  try {
    const adventure = await Adventure.findById(
      req.params.id
    );

    if (!adventure) {
      return res.status(404).json({
        message: "Adventure not found",
      });
    }

    res.json(adventure);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};