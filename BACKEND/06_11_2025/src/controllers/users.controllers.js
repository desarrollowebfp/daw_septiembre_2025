const User = require("../models/user.model");

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json({ error: "Error registrando al usuario" });
  }
};

module.exports = { register };
