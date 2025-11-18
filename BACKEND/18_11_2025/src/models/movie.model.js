const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: false },
    imgUrl: {
      type: String,
      required: false,
      default: "https://res.cloudinary.com/dwkafwila/image/upload/v1763062141/poster_placeholder.png",
    },
    imgId: { type: String, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
