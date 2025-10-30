require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const moviesRoutes = require("./src/routes/movies.routes");

const app = express();
app.use(express.json());

connectDB();

//Rutas
app.use("/movies", moviesRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
