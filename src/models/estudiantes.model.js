const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  nombre: String,
  carnet: String,
  direccion: String,
  genero: String,
  telefono: String,
  dateOfBirth: Date,
  idCarrera: String,
  //Genero de poesía
  idGeneroP: String,
  fechaDeInscripcion: Date,
  fechaDelamacion: Date,
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
