const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado con MongoDB");
  } catch (error) {
    console.error("Error conectado con MongoDB");
  }
};

module.exports = connectDB;
