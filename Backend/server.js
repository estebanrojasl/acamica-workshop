const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const ventas = require("./entities/sales.json").ventas;
const paquetes = require("./entities/tourPackage.json").tourPackages;
const compradores = require("./entities/user.json").customers;

const server = express();
const PORT = 3000;
const privateKey = "secure key";

server.use(bodyParser.json());

const validateJwtMiddleware = (req, res, next) => {
  const jwtToken = req.headers["authorization"];
  if (!jwtToken) {
    return res.status(401).json({ mensaje: "No autorizado" });
  }
  const jwtClient = jwtToken.split(" ")[1];
  jwt.verify(jwtClient, privateKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: "Token expirado" });
    }
    next();
  });
};

// chequear estado API
server.get("/api/v1/turisteo/health", (req, res) => {
  return res.status(200).json({ status: "OK" });
});
// listar todos los paquetes
server.get("/api/v1/turisteo/paquetes", (req, res) => {
  if (!paquetes) {
    res.status(404).json({ mensaje: "No hay paquetes" });
  } else {
    res.status(200).json(paquetes);
  }
});
// listar todos los compradores
server.get(
  "/api/v1/turisteo/compradores",
  validateJwtMiddleware,
  (req, res) => {
    res.status(200).json(compradores);
  }
);
// guardar datos del registro nombre, email, password solo compradores
server.post("/api/v1/turisteo/registro", (req, res) => {
  const { id } = req.body;
  const idExiste = compradores.filter((element) => element.id === id);
  if (idExiste.length > 0) {
    return res.status(409).json({ mensaje: "Ya existe ese usuario" });
  }
  const nuevoComprador = req.body;
  paquetes.push(nuevoComprador);
  return res.status(201).json(nuevoComprador);
});

// enviar usuario y contrasena
server.post("/api/v1/turisteo/login", (req, res) => {
  const { email, contrasena } = req.body;
  const usuarioExiste = compradores.find((element) => {
    return element.email === email;
  });
  if (!usuarioExiste) {
    return res.status(403).json({ mensaje: "Usuario o clave incorrecta" });
  } else {
    if (usuarioExiste.password === contrasena) {
      const token = jwt.sign(usuarioExiste, privateKey, { expiresIn: 20 });
      return res.status(200).json(token);
    } else {
      return res.status(403).json({ mensaje: "Usuario o clave incorrecta" });
    }
  }
});

// para ingresar un objeto ventas
server.post("/api/v1/turisteo/compra", (req, res) => {
  const { id } = req.body;
  const usuarioExiste = compradores.find((element) => {
    return element.id === id;
  });
  if (!usuarioExiste) {
    const nuevaVenta = req.body;
    ventas.push(nuevaVenta);
    return res.status(201).json(nuevaVenta);
  } else {
    return res.status(409).json({ mensaje: "Id ya existe" });
  }
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
  const nuevaVenta = req.body;
  paquetes.push(nuevaVenta);
  return res.status(201).json(nuevaVenta);
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
