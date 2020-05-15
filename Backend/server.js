const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3000;

server.use(bodyParser.json());

server.listen(PORT, () => {
  console.log("Servidor escuchando en puerto: " + PORT);
});
