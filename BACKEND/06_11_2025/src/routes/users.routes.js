const express = require("express");
const { register } = require("../controllers/users.controllers");

const usersRoutes = express.Router();

usersRoutes.post("/register", register);

module.exports = usersRoutes