const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    year: { type: Number, min: 1888, max: 2100 },
    genre: {
      type: String,
      enum: ["Acción", "Comedia", "Drama", "Ciencia Ficción", "Animación"],
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
