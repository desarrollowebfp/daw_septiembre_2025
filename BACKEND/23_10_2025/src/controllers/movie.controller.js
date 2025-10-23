const Movie = require("../models/movie.model");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo todas las películas" });
  }
};

const getMovieById = async(req,res,next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if(!movie) {
      res.status(404).json({error: "Película no encontrada"})
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(500).json({ error: "Error encontrando la película" });
  }
}

const getMoviesByDirector = async(req,res,next) => {
  try {
    const movies = await Movie.find({director: req.params.director})
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ error: "Error encontrando las películas" });
  }
}

const postMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie =await newMovie.save(); 
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: "Error creando una nueva película" });
  }
};

const deleteMovieById = async(req,res,next) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if(!deletedMovie){
      res.status(404).json({error: "Película a borrar no encontrada"})
    }
    res.status(200).json({info: "Película eliminada"})
  } catch (error) {
    res.status(500).json({ error: "Error borrando la película" });
  }
}

module.exports = { getMovies, getMovieById, getMoviesByDirector, postMovie, deleteMovieById };
