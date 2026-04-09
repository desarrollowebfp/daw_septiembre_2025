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

const userRoutes = express.Router();

userRoutes.post("/register", upload.single("avatar"), register);
userRoutes.post("/login", login);
userRoutes.get("/me", isAuth, getMe);
userRoutes.put("/username", isAuth, updateUsername);
userRoutes.put("/password", isAuth, updatePassword);
userRoutes.put("/avatar", isAuth, updateAvatar);

module.exports = userRoutes;
