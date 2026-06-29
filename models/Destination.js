
const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    heroImage: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    district: String,

    province: String,

    rating: {
      type: Number,
      default: 5,
    },

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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Destination", destinationSchema);

