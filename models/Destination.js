const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    heroImage: {
      type: String,
      required: true,
    },

    gallery: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      required: true,
    },

    district: String,

    province: String,

    latitude: Number,

    longitude: Number,

    rating: {
      type: Number,
      default: 5,
    },

    duration: String,

    budget: String,

    bestTime: String,

    tags: [String],

    thingsToDo: [
      {
        title: String,
        description: String,
        image: String,
      },
    ],

    placesToVisit: [
      {
        title: String,
        description: String,
        image: String,
      },
    ],

    adventures: [
      {
        title: String,
        description: String,
        image: String,
        price: Number,
      },
    ],

    hotels: [
      {
        name: String,
        image: String,
        rating: Number,
        price: Number,
      },
    ],

    restaurants: [
      {
        name: String,
        cuisine: String,
        rating: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Destination", destinationSchema);

