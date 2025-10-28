require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");
const moviesRouter = require("./src/routes/movies.routes");

const app = express();
app.use(express.json());

connectDB();

//Rutas
app.use("/movies", moviesRouter)

app.use((req, res) => {
  return res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
