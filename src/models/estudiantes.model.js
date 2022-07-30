const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  nombre: String,
  carnet: String,
  direccion: String,
  genero: String,
  telefono: String,
  dateOfBirth: Date,
  carrera: String,
  //Genero de poesía
  generoPoesia: String,
  fechaDeInscripcion: Date,
  fechaDelamacion: Date,
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
