const express = require("express");
const { register, login } = require("../controllers/users.controllers");
const isAuth = require("../middlewares/auth.middleware");

const usersRoutes = express.Router();

usersRoutes.post("/register", isAuth, register);
usersRoutes.post("/login", login);

module.exports = usersRoutes;
