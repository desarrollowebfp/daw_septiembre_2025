const Videogame = require("../models/videogame.model");

const getVideogames = async (req, res, next) => {
  try {
    const videogames = await Videogame.find();
    return res.status(200).json(videogames);
  } catch (error) {
    return res.status(500).json({ error: "No se encuentran los videojuegos" });
  }
};

module.exports = { getVideogames };
