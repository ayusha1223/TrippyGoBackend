const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    destination: {
      type: String,
      required: true,
    },

    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },

    title: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Itinerary",
  itinerarySchema
);