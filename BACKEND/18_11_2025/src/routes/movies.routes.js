const express = require("express");
const {
  createMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movies.controllers");
const upload = require("../middlewares/files.middleware");

const moviesRoutes = express.Router();

moviesRoutes.post("/", upload.single("poster"), createMovie);
moviesRoutes.delete("/:id", deleteMovie);
moviesRoutes.put("/:id", upload.single("poster"), updateMovie);
module.exports = moviesRoutes;
