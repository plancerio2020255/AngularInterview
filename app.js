const express = require("express");
const cors = require("cors");
const app = express();

//Importacion de rutas
const estudiantesRoutes = require("./src/routes/estudiantes.routes");

//Cabeceras
app.use(cors());
//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", estudiantesRoutes);

module.exports = app;
