const Movie = require("../models/movie.model");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
};

const postMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    return res.status(201).json({
        data: savedMovie,
        info: `Película creada en: ${new Date(savedMovie.createdAt).toLocaleDateString("ES-es")}`
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getMovies, postMovie };
