const mongoose = require("mongoose");

const videogameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    publisher: { type: String, required: true, trim: true },
    year: { type: Number, required: false, min: 1963, max: 2300 },
    genre: {
      type: String,
      enum: [
        "Action",
        "Adventure",
        "RPG",
        "Shooter",
        "Strategy",
        "Simulation",
        "Sports",
        "Racing",
        "Puzzle",
      ],
      required: true,
    },
    cover: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dwkafwila/image/upload/v1763668099/VideogamesDB/placeholder.avif",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Videogame = mongoose.model("Videogame", videogameSchema);

module.exports = Videogame;
