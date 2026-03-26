const express = require("express");
const {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albums.controllers");

const router = express.Router();

router.get("/", getAllAlbums);
router.get("/:id", getAlbumById);
router.post("/", createAlbum);
router.put("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

module.exports = router;
