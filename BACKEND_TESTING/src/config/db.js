const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🛜  Conectado con la base de datos");
  } catch (error) {
    console.error(
      "❌ No se pudo establecer la conexión con la base de datos",
      error.message,
    );
  }
};

module.exports = connect;
