const mongoose = require("mongoose");

const adventureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    gallery: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Extreme"],
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    bestTime: String,

    maxAltitude: String,

    groupSize: String,

    minimumAge: Number,

    pickupLocation: String,

    highlights: [
      {
        type: String,
      },
    ],

    itinerary: [
      {
        type: String,
      },
    ],

    includes: [
      {
        type: String,
      },
    ],

    excludes: [
      {
        type: String,
      },
    ],

    thingsToCarry: [
      {
        type: String,
      },
    ],

    safetyTips: [
      {
        type: String,
      },
    ],

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Adventure",
  adventureSchema
);