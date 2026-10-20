# Tarea 1 - Introducción a Node.js

## Descripción

Mi primer script en Node.js. Muestra un mensaje de presentación, usa el módulo nativo `os` para mostrar el sistema operativo y la memoria libre, e importa un módulo propio (`mensaje.js`) que exporta una función con un mensaje personalizado.

## Archivos

- `app.js`: script principal (presentación, módulo `os` y módulo propio).
- `mensaje.js`: módulo propio con la función exportada.
- `README.md`: documentación del proyecto.

## Cómo clonar y ejecutar

```bash
git clone https://github.com/NicAT-12/Diplomatura_Full-Stack.git
cd "Diplomatura_Full-Stack/Desarrollo en NodeJS/Tarea 1 - Introducción a Node.js"
node app.js
```

Requiere tener Node.js instalado (se verifica con `node -v` y `npm -v`).

## Ejemplo de salida en consola

```text
$ node app.js
=== Presentación ===
Hola, mi nombre es Nicolas Tissoni.
Motivo: Quiero aprender backend para ser un programador más completo.

=== Información del sistema (módulo os) ===
Sistema operativo: Windows_NT (win32)
Memoria libre: 23049.73 MB

=== Módulo propio ===
¡Hasta la próxima, Nicolas Tissoni! Este mensaje viene desde el módulo propio mensaje.js.
```

## Créditos

- **Autor:** Nicolas Tissoni
- **Curso:** Desarrollo en NodeJS
- **Unidad:** Módulo 1 - Unidad 1: Introducción a Node.js

## Bibliografía y documentación utilizada

- Cantelon, M.; Harter, B.; Holowaychuk, T. y Rajlich, N. (2017). *Node.js in Action* (2ª ed.). Manning.
- Node.js. (s.f.). About Node.js. https://nodejs.org/en/about
- Node.js. (s.f.). Node.js v24.8.0 documentation. Modules: CommonJS modules. https://nodejs.org/api/modules.html
- Node.js. (s.f.). Node.js v24.8.0 documentation. OS. https://nodejs.org/api/os.html
