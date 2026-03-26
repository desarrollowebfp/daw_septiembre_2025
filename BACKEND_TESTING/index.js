const server = require("./app");
const connect = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connect();

server.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
