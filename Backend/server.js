const express = require("express");
const bodyParser = require("body-parser");
const ventas = require("./entities/sales.json").ventas;
const paquetes = require("./entities/tourPackage.json").tourPackages;
const compradores = require("./entities/user.json").customers;

const server = express();
const PORT = 3000;

server.use(bodyParser.json());

// chequear estado API
server.get("/api/v1/turisteo/health", (req, res) => {
    return res.status(200).json({ status: "OK" });
});
// listar todos los paquetes
server.get("/api/v1/turisteo/paquetes", (req, res) => {
    console.log(res.body);
});

// guardar datos del registro nombre, email, password solo compradores
server.post("/api/v1/turisteo/registro", (req, res) => {

});

// enviar usuario y contrasena
server.post("/api/v1/turisteo/login", (req, res) => {

});

// para ingresar un objeto ventas
server.post("/api/v1/turisteo/compra", (req, res) => {

});

//----------------------------------------------------------
// listar todos los paquetes comprados
server.get("/api/v1/turisteo/paquetes/ventas", (req, res) => {
    res.status(200).json(ventas);
});

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
server.post("/api/v1/turisteo/paquetes", (req, res) => {
    const { id } = req.body;
    const idExiste = paquetes.filter((element) => element.id === id);
    if (idExiste.length > 0) {
        return res.status(409).json({ mensaje: "Ya existe ese id" });
    }
    const nuevoPaquete = req.body;
    paquetes.push(nuevoPaquete);
    return res.status(201).json(nuevoPaquete);
});

// Actualizar un paquete
server.put("/api/v1/turisteo/paquetes/:id", (req, res) => {
    const idPaquete = req.params.id;
    const indexPaquete = paquetes.findIndex(
        (element) => element.id === parseInt(idPaquete)
    );
    if (indexPaquete > -1) {
        const paquete = req.body;
        paquetes[indexPaquete] = paquete;
        return res.status(200).json(paquetes[indexPaquete]);
    }
    return res.status(404).json({ mensaje: "Paquete inexistente" });
});

// Actualizar un paquete
server.delete("/api/v1/turisteo/paquetes/:id", (req, res) => {
    const idPaquete = req.params.id;
    const indexPaquete = paquetes.findIndex(
        (element) => element.id === parseInt(idPaquete)
    );
    if (indexPaquete > -1) {
        paquetes.splice(indexPaquete, 1);
        return res.status(204).json();
    }
    return res.status(404).json({ mensaje: "Paquete inexistente" });
});

server.listen(PORT, () => {
    console.log("Servidor escuchando en puerto: " + PORT);
});