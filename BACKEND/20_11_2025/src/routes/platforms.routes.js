const express = require("express");
const {
  getPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platforms.controllers");

const platformsRouter = express.Router();

platformsRouter.get("/", getPlatforms);
platformsRouter.get("/:id", getPlatformById);
platformsRouter.post("/", createPlatform);
platformsRouter.put("/:id", updatePlatform);
platformsRouter.delete("/:id", deletePlatform);

module.exports = platformsRouter;
