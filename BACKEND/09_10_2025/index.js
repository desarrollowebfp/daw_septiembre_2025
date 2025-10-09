//Importamos dotenv y lo arrancamos para que funcione en el proyecto
require("dotenv").config();
//Importamos express
const express = require("express");
//Importamos la función de conexión con Mongo
const connectDB = require("./src/config/db");

//Creamos una instancia con Express
const app = express();
//Implementamos el middleware para parsear JSON en el body de las peticiones
app.use(express.json());

//Nos conectamos con Mongo
connectDB();

//Definimos una ruta de prueba para hacer un get
app.get("/", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

//Vamos a controlar las rutas no encontradas, es decir, un manejador del status 404
app.use((req, res) => {
  return res.status(404).json({ error: "Ruta no encontrada" });
});

//Arrancamos el servidor y lo escuchamos en nuestro puerto local
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`)
})
