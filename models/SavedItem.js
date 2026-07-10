const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
destination: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Destination",
  default: null,
},

    type: {
      type: String,
      enum: [
        "destination",
        "thing",
        "place",
        "adventure",
        "hotel",
        "restaurant",
      ],
      required: true,
    },

    itemId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SavedItem", savedItemSchema);