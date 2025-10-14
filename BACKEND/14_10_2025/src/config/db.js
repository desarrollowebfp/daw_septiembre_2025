const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Conectado correctamente con MongoDB ✅");
    } catch (error) {
        console.error("Error conectando con MongoDB ❌", error.message);
    }
}

module.exports = connectDB