const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const date = new Date();

const movieSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    year: { type: Number, min: 1888, max: date.getFullYear() },
    genre: {
      type: String,
      required: true,
      enum: ["Acción", "Comedia", "Drama", "Ciencia Ficción", "Animación"],
    },
    rating: { type: Number, min: 0, max: 10, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
