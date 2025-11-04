const express = require("express");
const { getMovies } = require("../controllers/movies.controllers");

const moviesRoutes = express.Router();

moviesRoutes.get("/", getMovies);

module.exports = moviesRoutes;
