const express = require("express");
const app = express();

//Importacion de rutas
const estudiantesRoutes = require("./src/routes/estudiantes.routes");

//Cabeceras
//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", estudiantesRoutes);

module.exports = app;
