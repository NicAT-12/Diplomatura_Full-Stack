// Módulo propio: exporta una función que devuelve un mensaje personalizado.
function mensajePersonalizado(nombre) {
  return `¡Hasta la próxima, ${nombre}! Este mensaje viene desde el módulo propio mensaje.js.`;
}

module.exports = mensajePersonalizado;
