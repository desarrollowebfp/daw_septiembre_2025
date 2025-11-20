const express = require("express");
const { getVideogames } = require("../controllers/videogames.controllers");

const videogamesRouter = express.Router();

videogamesRouter.get("/", getVideogames);

module.exports = videogamesRouter;
