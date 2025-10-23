const express = require("express");
const {
  getMovies,
  getMovieById,
  getMoviesByDirector,
  postMovie,
  deleteMovieById,
} = require("../controllers/movie.controller");

const moviesRouter = express.Router();

//Endpoints
moviesRouter.get("/", getMovies);
moviesRouter.get("/:id", getMovieById);
moviesRouter.get("/director/:director", getMoviesByDirector);
moviesRouter.post("/", postMovie);
moviesRouter.delete("/:id", deleteMovieById);

module.exports = moviesRouter;
