const express = require("express");
const { createMovie } = require("../controllers/movies.controllers");
const upload = require("../middlewares/files.middleware");

const moviesRoutes = express.Router();

moviesRoutes.post("/", upload.single("poster"), createMovie);

module.exports = moviesRoutes;
