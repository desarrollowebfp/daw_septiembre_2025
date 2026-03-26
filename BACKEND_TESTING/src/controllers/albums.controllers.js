const albumRepository = require("../repository/albums.repository");
const createError = require("../utils/createError");

const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await albumRepository.getAllAlbums();
    return res.status(200).json(albums);
  } catch (error) {
    return next(error);
  }
};

const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await albumRepository.getAlbumById(id);
    if (!album) {
      return next(createError("Error encontrando el album", 404));
    }
    return res.status(200).json(album);
  } catch (error) {
    return next(error);
  }
};

const createAlbum = async (req, res, next) => {
  try {
    const createdAlbum = await albumRepository.createAlbum(req.body);
    return res.status(201).json(createdAlbum);
  } catch (error) {
    return next(error);
  }
};

const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAlbum = await albumRepository.updateAlbum(id, req.body);

    if (!updatedAlbum) {
      return next(createError("No se encuentra el album a actualizar", 404));
    }
    return res.status(200).json(updatedAlbum);
  } catch (error) {
    return next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAlbum = await albumRepository.deleteAlbum(id);
    return res.status(200).json(deletedAlbum);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
