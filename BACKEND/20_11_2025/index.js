require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const videogamesRouter = require("./src/routes/videogames.routes");
const platformsRouter = require("./src/routes/platforms.routes");

const app = express();
app.use(express.json());

connectDB();

// Rutas
app.use("/videogames", videogamesRouter);
app.use("/platforms", platformsRouter);

app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT} ✅`);
});
