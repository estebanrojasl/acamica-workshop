const express = require("express");
const bodyParser = require("body-parser");
const ventas = require("sales.json").ventas;
const paquetes = require("tourPackage.json");
const compradores = require("user.json").customers;

const server = express();
const PORT = 3000;

server.use(bodyParser.json());

// chequear estado API
server.get("/api/v1/turisteo/health", (req, res) => {
  return res.status(200).json({ status: "OK" });
});
// listar todos los paquetes
server.get("/api/v1/turisteo/paquetes", (req, res) => {});

// guardar datos del registro nombre, email, password solo compradores
server.post("/api/v1/turisteo/registro", (req, res) => {});

// enviar usuario y contrasena
server.post("/api/v1/turisteo/login", (req, res) => {});

// para ingresar un objeto ventas
server.post("/api/v1/turisteo/compra", (req, res) => {});

//----------------------------------------------------------
// listar todos los paquetes por id de usuario
server.get("/api/v1/turisteo/paquetes/:id", (req, res) => {
  const comprador = compradores.find(
    (element) => element.id === parseInt(req.params.id)
  );
  if (!comprador) {
    res.status(404).json({ mensaje: "Comprador inexistente" });
  } else {
    const paquetesComprador = ventas.find(
      (element) => element.idComprador === parseInt(req.params.id)
    );
    res.status(200).json(paquetesComprador);
  }
});

// listar todos los paquetes comprados
server.get("/api/v1/turisteo/paquetes/ventas", (req, res) => {
  res.status(200).json(ventas);
});

// Crear un paquete
server.post("/api/v1/turisteo/paquetes", (req, res) => {});

// Actualizar un paquete
server.put("/api/v1/turisteo/paquetes/:id", (req, res) => {});

// Actualizar un paquete
server.delete("/api/v1/turisteo/paquetes/:id", (req, res) => {});

server.listen(PORT, () => {
  console.log("Servidor escuchando en puerto: " + PORT);
});
