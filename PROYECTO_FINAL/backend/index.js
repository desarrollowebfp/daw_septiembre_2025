require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const usersRoutes = require("./src/routes/users.routes");
const tasksRoutes = require("./src/routes/tasks.routes");

const server = express();
const PORT = process.env.PORT || 3000;

connectDB();

//Queda pendiente conocer las direcciones del frontal
server.use(cors());

server.use(express.json());

server.use("/api/users", usersRoutes);
server.use("/api/tasks", tasksRoutes);

// Rutas no encontradas
server.use((req, res) => {
  return res.status(404).json({ message: "Ruta no encontrada" });
});

//Middleware de errores inesperados
server.use((error, req, res) => {
  console.log(error);
  return res.status(500).json({ message: error.message });
});

server.listen(PORT, () => {
  console.log(`Servidor levantado en http://locahost:${PORT}`);
});
