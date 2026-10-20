const os = require('os');
const mensajePersonalizado = require('./mensaje');

const nombre = 'Nicolas Tissoni';
const motivo = 'Quiero aprender backend para ser un programador más completo.';

// 1. Mensaje de presentación
console.log('=== Presentación ===');
console.log(`Hola, mi nombre es ${nombre}.`);
console.log(`Motivo: ${motivo}`);

// 2. Módulo nativo os
const memoriaLibreMB = (os.freemem() / 1024 / 1024).toFixed(2);
console.log('\n=== Información del sistema (módulo os) ===');
console.log(`Sistema operativo: ${os.type()} (${os.platform()})`);
console.log(`Memoria libre: ${memoriaLibreMB} MB`);

// 3. Módulo propio
console.log('\n=== Módulo propio ===');
console.log(mensajePersonalizado(nombre));
