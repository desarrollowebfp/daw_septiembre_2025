require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const usersRoutes = require("./src/routes/users.routes");

const app = express();
app.use(express.json());

connectDB();

//Rutas
app.use("/users", usersRoutes)

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
