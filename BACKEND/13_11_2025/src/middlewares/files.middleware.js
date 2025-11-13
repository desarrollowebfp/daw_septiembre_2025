const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Movies",
    allowFormats: ["jpg", "png", "webp", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
