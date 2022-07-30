const express = require("express");
const cors = require("cors");
const app = express();

//Importacion de rutas
const estudiantesRoutes = require("./src/routes/estudiantes.routes");

//Cabeceras
//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", estudiantesRoutes);

module.exports = app;
