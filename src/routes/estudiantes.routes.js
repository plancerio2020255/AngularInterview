const express = require("express");
const estudianteController = require("../controllers/estudiantes.controller");

const api = express.Router();

api.post("/registrarParticipacion", estudianteController.agregarParticipacion);
api.get("/getEstudiantes");

module.exports = api;
