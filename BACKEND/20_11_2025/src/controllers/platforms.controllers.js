const Platform = require("../models/platform.model");

const getPlatforms = async (req, res, next) => {
  try {
    const platforms = await Platform.find().populate("videogames");
    return res.status(200).json(platforms);
  } catch (error) {
    return res.status(500).json({ error: "No se encuentran las plataformas" });
  }
};

const getPlatformById = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) {
      return res
        .status(404)
        .json({ error: "No se pudo encontrar la plataforma" });
    }
    return res.status(200).json(platform);
  } catch (error) {
    return res.status(500).json({ error: "No se encuentra el plataforma" });
  }
};

const createPlatform = async (req, res, next) => {
  try {
    const newPlatform = new Platform(req.body);
    await newPlatform.save();
    return res.status(201).json(newPlatform);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo crear la plataforma" });
  }
};

const updatePlatform = async (req, res, next) => {
  try {
    const updatedPlatform = await Platform.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(updatedPlatform);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "No se pudo actualizar la plataforma" });
  }
};

const deletePlatform = async (req, res, next) => {
  try {
    const deletedPlatform = await Platform.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletePlatform);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo borrar el videojuego" });
  }
};

module.exports = {
  getPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
