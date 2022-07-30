const Estudiante = require("../models/estudiantes.model");

function agregarParticipacion(req, res) {
  let parametros = req.body;
  var modeloEstudiante = new Estudiante();
  const currentDate = new Date();
  const firstLetterCarnet = parametros.carnet.slice(0, 1);
  const thirdLetterCarnet = parametros.carnet.slice(2, 3);
  const lastCharacterCarnetOne =
    parametros.carnet.charAt(parametros.carnet.length - 1) == 1;
  const lastCharacterCarnetThree =
    parametros.carnet.charAt(parametros.carnet.length - 1) == 3;
  const lengthCarnet = parametros.carnet.length;
  const fechaNacimiento = new Date(parametros.fecha);
  const añosTotal = currentDate.getFullYear() - fechaNacimiento.getFullYear();
  const lengthTelefono = parametros.telefono.length;

  if (thirdLetterCarnet !== "5") {
    return res
      .status(400)
      .send({ mensaje: "El tercer digito del carnet debe ser 5" });
  }
  if (firstLetterCarnet !== "A") {
    return res.status(400).send({ mensaje: "El carnet debe iniciar con A" });
  }
  if (lengthCarnet !== 6) {
    return res
      .status(400)
      .send({ mensaje: "El carnet tiene que ser de 6 digitos" });
  }
  if (añosTotal < 17) {
    return res.status(400).send({ mensaje: "Debe de tener al menos 17 años" });
  }
  if (
    parametros.carnet.charAt(parametros.carnet.length - 1) != 1 &&
    parametros.carnet.charAt(parametros.carnet.length - 1) != 3 &&
    parametros.carnet.charAt(parametros.carnet.length - 1) != 9
  ) {
    return res
      .status(400)
      .send({ mensaje: "El carnet debe terminar con 1, 3 o 9" });
  }
  if (lengthTelefono !== 8) {
    return res.status(400).send({
      mensaje: "El telefono tiene que ser como maximo y minimo de 8 digitos",
    });
  }
  if (
    parametros.nombre &&
    parametros.carnet &&
    parametros.direccion &&
    parametros.direccion &&
    parametros.genero &&
    parametros.carrera &&
    parametros.generoPoesia &&
    parametros.telefono
  ) {
    Estudiante.find(
      { nombre: parametros.nombre },
      (err, estudianteEncontrado) => {
        if (estudianteEncontrado.length > 0) {
          return res
            .status(400)
            .send({ mensaje: "Ya hay un registro con este nombre" });
        } else {
          Estudiante.find(
            { carnet: parametros.carnet },
            (err, carnetEncontrado) => {
              if (carnetEncontrado.length > 0)
                return res
                  .status(400)
                  .send({ mensaje: "Ya hay un registro con este carnet" });

              modeloEstudiante.nombre = parametros.nombre;
              modeloEstudiante.carnet = parametros.carnet;
              modeloEstudiante.direccion = parametros.direccion;
              modeloEstudiante.genero = parametros.genero;
              modeloEstudiante.carrera = parametros.carrera;
              modeloEstudiante.generoPoesia = parametros.generoPoesia;
              modeloEstudiante.telefono = parametros.telefono;
              modeloEstudiante.dateOfBirth = parametros.fecha;
              modeloEstudiante.fechaDeInscripcion = currentDate;
              if (
                lastCharacterCarnetOne &&
                parametros.generoPoesia == "Dramatico"
              ) {
                const diaEntrega = calcularDiasSinFines(currentDate, 5);
                modeloEstudiante.fechaDelamacion = diaEntrega;
              } else if (
                lastCharacterCarnetThree &&
                parametros.generoPoesia == "Epica"
              ) {
                const diaEntrega = calculaEntregaFinMes(currentDate, 0);
                modeloEstudiante.fechaDelamacion = diaEntrega;
              } else {
                var diaHoy = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate()
                );
                var numberDays = diaHoy.getDay() == 0 ? 7 : diaHoy.getDay();
                var diasTotal = 7 - numberDays;
                diaHoy.setDate(diaHoy.getDate() + diasTotal + 5);
                modeloEstudiante.fechaDelamacion = diaHoy;
              }
              modeloEstudiante.save((err, participacionGuardada) => {
                return res.send({ formulario: participacionGuardada });
              });
            }
          );
        }
      }
    );
  } else {
    return res
      .status(400)
      .send({ mensaje: "Debe enviar los parametros obligatorios" });
  }
}
function calcularDiasSinFines(diaInicio, diasTotal) {
  let diaIniciado = new Date(
    diaInicio.getFullYear(),
    diaInicio.getMonth(),
    diaInicio.getDate()
  );

  let i = 1;

  while (diasTotal > 0) {
    diaIniciado = new Date(
      diaInicio.getFullYear(),
      diaInicio.getMonth(),
      diaInicio.getDate() + i
    );

    if (diaIniciado.getDay() > 0 && diaIniciado.getDay() < 6) {
      diasTotal--;
    }
    i++;
  }

  return diaIniciado;
}

function calculaEntregaFinMes(diaInicio, diasTotal) {
  let diaIniciado = new Date(
    diaInicio.getFullYear(),
    diaInicio.getMonth() + 1,
    0
  );

  let i = 1;

  while (diasTotal == 0) {
    diaIniciado = new Date(
      diaInicio.getFullYear(),
      diaInicio.getMonth() + 1,
      0 - i
    );

    if (diaIniciado.getDay() > 0 && diaIniciado.getDay() < 6) {
      diasTotal--;
    }
    i++;
  }

  return diaIniciado;
}

function verRegistros(req, res) {
  Estudiante.find({}, (err, formularioEncontrado) => {
    return res.status(200).send({ formulario: formularioEncontrado });
  });
}
module.exports = {
  agregarParticipacion,
  verRegistros,
};
