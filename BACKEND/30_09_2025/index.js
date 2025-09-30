// File System
const fs = require("fs");

/* const otraTarea = "Echar gasolina\n"

fs.appendFile("tareas.txt", otraTarea, (error) => {
    if(error){
        console.log("Error modificando las tareas", error);
        return
    }
    console.log("Se ha modificado correctamente el fichero de tareas")
})
 */

fs.readFile("tareas.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("Error al leer las tareas");
    return;
  }

  console.log("Tus tareas son:\n" + data);
});
