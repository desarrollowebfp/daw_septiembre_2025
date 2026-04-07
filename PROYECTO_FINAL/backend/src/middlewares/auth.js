const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuth = async (req, res, next) => {
  try {
    //Intentar leer la cabecera de autorización
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "No se encuentra el token" });
    }
    //Troceamos el token para poder validarlo
    const token = authorization.replace("Bearer ", "");
    //Verificamos el token y recuperamos la información decodificada del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Buscamos el usuario en la base de datos
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Token no valido" });
    }
    // Guardamos el usuario en la petición para usarlo en los controladores
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token no valido" });
  }
};

module.exports = isAuth;
