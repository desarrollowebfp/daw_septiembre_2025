const Movie = require("../models/movie.model");
const deleteImgCloudinary = require("../utils/cloudinary.utils");

const createMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    // Si se subió un archivo, guardamos su información
    if (req.file) {
      newMovie.imgUrl = req.file.path; // secure_url
      newMovie.imgId = req.file.filename; // public_id
    }

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: "Error creando la películas" });
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Pelicula a borrar no encontrada" });
    }
    //Si hemos borrado la película pasando el condicional de arriba, borramos tambien la imagen de Cloudinary
    if (deletedMovie.imgId) {
      await deleteImgCloudinary(deletedMovie.imgId);
    }
    res.status(200).json({ info: "Película borrada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error borrando la película" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const prev = await Movie.findById(id);
    if (!prev) return res.status(404).json({ error: "Película no encontrada" });

    const updates = { ...req.body };
    let newImgId = null;

    // Si llega una nueva imagen
    if (req.file) {
      updates.imgUrl = req.file.path;
      updates.imgId = req.file.filename;
      newImgId = req.file.filename;
    }

    const updated = await Movie.findByIdAndUpdate(id, updates, {
      new: true
    });

    // Eliminamos la imagen anterior solo después de actualizar correctamente
    if (newImgId && prev.imgId) {
      await deleteImgCloudinary(prev.imgId);
    }

    return res.status(200).json(updated);
  } catch (err) {
    if (req.file?.filename) await deleteImgCloudinary(req.file.filename);
    return res.status(400).json({
      error: "Error actualizando la película",
      detalles: err.message,
    });
  }
};

module.exports = { createMovie, deleteMovie, updateMovie };
