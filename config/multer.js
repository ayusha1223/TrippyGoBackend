const multer = require("multer");
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "trippygo/profile-images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

module.exports = multer({ storage });