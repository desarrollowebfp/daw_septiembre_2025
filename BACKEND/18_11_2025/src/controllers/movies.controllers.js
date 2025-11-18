const Movie = require("../models/movie.model");

const createMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    // Si se subió un archivo, guardamos su información
    if (req.file) {
      newMovie.imgUrl = req.file.path;      // secure_url
      newMovie.imgId = req.file.filename;   // public_id
    }

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: "Error creando la películas" });
  }
};

module.exports = { createMovie };
