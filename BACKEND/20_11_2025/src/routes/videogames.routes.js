const express = require("express");
const {
  getVideogames,
  getVideogameById,
  createVideogame,
  updateVideogame,
  deleteVideogame,
} = require("../controllers/videogames.controllers");

const videogamesRouter = express.Router();

videogamesRouter.get("/", getVideogames);
videogamesRouter.get("/:id", getVideogameById);
videogamesRouter.post("/", createVideogame);
videogamesRouter.put("/:id", updateVideogame);
videogamesRouter.delete("/:id", deleteVideogame);

module.exports = videogamesRouter;
