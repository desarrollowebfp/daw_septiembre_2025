const Movie = require("../models/movie.model");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "No se pueden encontrar las películas" });
  }
};

module.exports = { getMovies };
