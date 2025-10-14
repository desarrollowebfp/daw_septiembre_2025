require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");

const app = express();
app.use(express.json());

connectDB();

//Vamos a crear un schema de Mongoose
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "Esta nota no tiene contenido" },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

//Vamos a crear una ruta de prueba para comprobar el funcionamiento de la API
app.get("/", (req, res) => {
  res.status(200).json({ message: "La API está funcionado" });
});

//Creamos una ruta/controlador que postee una nueva nota
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ error: "No se ha podido crear la nota" });
  }
});

//Crear otra ruta que me traiga las notas
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error: "No se han podido traer las notas" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
