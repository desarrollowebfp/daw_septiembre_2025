require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/db");

const app = express();
app.use(express.json());

connectDB();

app.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
