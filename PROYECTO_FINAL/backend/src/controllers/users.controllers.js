const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const newUser = new User({
      username,
      email,
      password,
      avatar: req.file ? req.file.path : undefined,
    });

    await newUser.save();
    return res.status(200).json({ message: "Usuario creado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userLogin = await User.findById(user._id).select("-password");

    return res.status(200).json({
      token,
      user: userLogin,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Campo requerido" });
    }
    req.user.username = username;
    await req.user.save();
    return res
      .status(200)
      .json({ message: "Username modificado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Campos requeridos" });
    }
    const passwordMatch = bcrypt.compareSync(
      currentPassword,
      req.user.password,
    );

    if (!passwordMatch) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    req.user.password = newPassword;
    await req.user.save();
    return res
      .status(200)
      .json({ message: "Contraseña modificada correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Fichero requerido" });
    }
    req.user.avatar = req.file.path;
    await req.user.save();
    return res.status(200).json({ message: "Avatar modificado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateUsername,
  updatePassword,
  updateAvatar,
};
