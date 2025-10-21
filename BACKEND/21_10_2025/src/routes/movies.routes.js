const express = require("express");
const { getMovies, postMovie } = require("../controllers/movie.controller");

const moviesRouter = express.Router();

//Endpoints
moviesRouter.get("/", getMovies);
moviesRouter.post("/", postMovie);

module.exports = moviesRouter;
