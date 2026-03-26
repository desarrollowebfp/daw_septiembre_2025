const Album = require("../models/album.model");

const getAllAlbums = async () => {
  return await Album.find();
};

const getAlbumById = async (id) => {
  return await Album.findById(id);
};

const createAlbum = async (data) => {
  const newAlbum = new Album(data);
  await newAlbum.save();
  return newAlbum;
};

const updateAlbum = async (id, data) => {
  return await Album.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteAlbum = async (id) => {
  return await Album.findByIdAndDelete(id);
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
