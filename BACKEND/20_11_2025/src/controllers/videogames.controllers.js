const Videogame = require("../models/videogame.model");

const getVideogames = async (req, res, next) => {
  try {
    const videogames = await Videogame.find();
    return res.status(200).json(videogames);
  } catch (error) {
    return res.status(500).json({ error: "No se encuentran los videojuegos" });
  }
};

const getVideogameById = async (req, res, next) => {
  try {
    const videogame = await Videogame.findById(req.params.id);
    if (!videogame) {
      return res
        .status(404)
        .json({ error: "No se pudo encontrar el videojuego" });
    }
    return res.status(200).json(videogame);
  } catch (error) {
    return res.status(500).json({ error: "No se encuentra el videojuego" });
  }
};

const createVideogame = async (req, res, next) => {
  try {
    const newVideogame = new Videogame(req.body);
    await newVideogame.save();
    return res.status(201).json(newVideogame);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo crear el videojuego" });
  }
};

const updateVideogame = async (req, res, next) => {
  try {
    const updatedVideogame = await Videogame.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(updatedVideogame);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "No se pudo actualizar el videojuego" });
  }
};

const deleteVideogame = async (req, res, next) => {
  try {
    const deletedVideogame = await Videogame.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedVideogame);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo borrar el videojuego" });
  }
};

module.exports = {
  getVideogames,
  getVideogameById,
  createVideogame,
  updateVideogame,
  deleteVideogame,
};
