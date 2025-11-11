const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json({ error: "Error registrando al usuario" });
  }
};

const login = async (req, res, next) => {
  try {
    //Vamos a buscar al usuario por nombre de usuario = username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    //Vamos a comprobar la contraseña del usuario (humana) con la contraseña encriptada almacenada en Mongo con bcrypt
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    //Si la contraseña es incorrecta nos salimos del controlador
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña no valida" });
    }
    // Si hemos llegado aqui quiere decir que el usuario y la contraseña son correctos
    //Generamos un token
    const token = generateToken(user._id, user.username);
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(400).json({ error: "Error logueando al usuario" });
  }
};

module.exports = { register, login };
