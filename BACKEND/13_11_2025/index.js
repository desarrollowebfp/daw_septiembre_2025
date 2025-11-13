require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cloudinary = require("cloudinary").v2;
const moviesRoutes = require("./src/routes/movies.routes");

const app = express();
app.use(express.json());

connectDB();

//Configuramos cloudinary para conectarnos con nuestro CDN mediante las claves secretas
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

app.use("/movies", moviesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontada" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
