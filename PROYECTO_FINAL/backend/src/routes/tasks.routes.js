const express = require("express");
const isAuth = require("../middlewares/auth");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controllers");

const tasksRoutes = express.Router();

tasksRoutes.get("/", isAuth, getTasks);
tasksRoutes.post("/", isAuth, createTask);
tasksRoutes.put("/:id", isAuth, updateTask);
tasksRoutes.delete("/:id", isAuth, deleteTask);

module.exports = tasksRoutes;
