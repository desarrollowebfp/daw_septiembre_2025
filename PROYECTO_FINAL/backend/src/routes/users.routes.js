const express = require("express");
const upload = require("../middlewares/upload");
const isAuth = require("../middlewares/auth");

const {
  register,
  login,
  getMe,
  updateUsername,
  updatePassword,
  updateAvatar,
} = require("../controllers/users.controllers");

const usersRoutes = express.Router();

usersRoutes.post("/register", upload.single("avatar"), register);
usersRoutes.post("/login", login);
usersRoutes.get("/me", isAuth, getMe);
usersRoutes.put("/username", isAuth, updateUsername);
usersRoutes.put("/password", isAuth, updatePassword);
usersRoutes.put("/avatar", isAuth, updateAvatar);

module.exports = usersRoutes;
