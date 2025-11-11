const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado con Mongo DB ✅");
  } catch (error) {
    console.error("Error conectando con Mongo DB");
  }
};

module.exports = connectDB;
