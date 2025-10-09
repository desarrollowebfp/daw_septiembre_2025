const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado con Mongo Atlas ✅");
  } catch (error) {
    console.error("Error conectando con Mongo Atlas ❌", error.message);
  }
};

module.exports = connectDB;
