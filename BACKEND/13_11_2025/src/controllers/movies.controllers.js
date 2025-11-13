const Movie = require("../models/movie.model");

const createMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    //Vamos a comprobar si le hemos pasado un archivo y vamos a almacenar la información de mismo
    if (req.file) {
      newMovie.poster = req.file.path;
    }
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: "Error creando la películas" });
  }
};

module.exports = { createMovie };
