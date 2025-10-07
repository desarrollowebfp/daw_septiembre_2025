const fs = require("fs");

const INPUT_CSV = "characters.csv";
const OUTPUT_DIR = "export";
const OUTPUT_JSON = `${OUTPUT_DIR}/characters.json`;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Carpeta creada en: ${OUTPUT_DIR}`);
}

//Vamos a leer el archivo CSV
let texto = fs.readFileSync(INPUT_CSV, "utf-8");
texto = texto.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
const filas = texto.trim().split("\n");

//Definimos las cabeceras
const cabeceras = ["Name", "E-mail", "Password", "Category"];

//Convertimos las filas en objetos

const arrayDeObjetos = [];

for (const fila of filas) {
  const columnas = fila.split(";");
  //Eliminamos el elemento vacio por terminar en ; el csv en cada linea
  columnas.pop();

  const objeto = {};
  columnas.forEach((columna, i) => {
    objeto[cabeceras[i]] = columnas[i];
  });

  arrayDeObjetos.push(objeto);
}

//Crear el json a partir del array de objetos que hemos conseguido
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(arrayDeObjetos), "utf-8");
console.log(`Se ha creado el fichero JSON en: ${OUTPUT_JSON}`);