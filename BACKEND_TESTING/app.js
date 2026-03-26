const express = require("express");
const albumRoutes = require("./src/routes/albums.routes");

const server = express();
server.use(express.json());

server.use("/api/albums", albumRoutes);

server.use((req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  return res.status(status).json({ message });
});

module.exports = server;
