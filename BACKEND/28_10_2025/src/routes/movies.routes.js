const express = require("express");
const {
  getMovies,
  getMovieById,
  getMoviesByDirector,
  postMovie,
  updateMovie,
  deleteMovieById,
} = require("../controllers/movie.controller");

const moviesRouter = express.Router();

//Endpoints
moviesRouter.get("/", getMovies);
moviesRouter.get("/:id", getMovieById);
moviesRouter.get("/director/:director", getMoviesByDirector);
moviesRouter.post("/", postMovie);
moviesRouter.put("/:id", updateMovie);
moviesRouter.delete("/:id", deleteMovieById);

module.exports = moviesRouter;
