# Trabajo Final Integrador - Desarrollo en Node.js

**Autor:** Nicolas Tissoni
**Curso:** Desarrollo en NodeJS
**Trabajo:** Trabajo Final Integrador - API para Clon de Chat

## Descripción

API RESTful con Node.js, Express y MongoDB que sirve de backend para un clon de chat 1 a 1, junto con un frontend en React que consume datos reales del servidor.

El proyecto cumple los requisitos mínimos de la consigna (CRUD de usuarios, chats y mensajes, respuestas estandarizadas con `{ success, data, message }`, estructura modular y manejo de errores con middlewares) e incluye los bonus: autenticación con JWT, validaciones con Zod, paginación y búsqueda de mensajes, y variables de entorno con dotenv.

## Estructura

```
Trabajo Final Integrador
├── back-end
├── front-end
├── capturas
└── README.md
```

- [back-end](./back-end/README.md): instalación, endpoints, ejemplos de requests y responses, conexión con el frontend.
- [front-end](./front-end/README.md): instalación, ejecución y despliegue del cliente React.

## Tecnologías

- Back-end: Node.js, Express 5, MongoDB Atlas, Mongoose, JWT, bcryptjs, Zod, dotenv, cors.
- Front-end: React, Vite, TailwindCSS.

## Enlaces de despliegue

- API (Render): https://diplomatura-full-stack.onrender.com
- Front-end (Vercel): https://front-end-seven-smoky.vercel.app

## Capturas

| Captura | Archivo |
| --- | --- |
| Colecciones en MongoDB Atlas | [01-atlas-colecciones.png](./capturas/01-atlas-colecciones.png) |
| Registro de usuario | [02-post-register.png](./capturas/02-post-register.png) |
| Inicio de sesión | [03-post-login.png](./capturas/03-post-login.png) |
| Listado de usuarios | [04-get-users.png](./capturas/04-get-users.png) |
| Creación de un chat | [05-post-chats.png](./capturas/05-post-chats.png) |
| Listado de chats | [06-get-chats.png](./capturas/06-get-chats.png) |
| Envío de un mensaje | [07-post-messages.png](./capturas/07-post-messages.png) |
| Historial de mensajes | [08-get-messages.png](./capturas/08-get-messages.png) |
| Búsqueda en el historial | [09-get-messages-busqueda.png](./capturas/09-get-messages-busqueda.png) |
| Eliminación de un mensaje | [10-delete-message.png](./capturas/10-delete-message.png) |
| Eliminación de un usuario | [11-delete-user.png](./capturas/11-delete-user.png) |
| Error de validación | [12-error-validacion.png](./capturas/12-error-validacion.png) |
| Despliegue en Render | [13-render-deploy.png](./capturas/13-render-deploy.png) |
| Front: inicio de sesión | [14-front-login.png](./capturas/14-front-login.png) |
| Front: conversación | [15-front-chat.png](./capturas/15-front-chat.png) |
| Despliegue en Vercel | [16-vercel-deploy.png](./capturas/16-vercel-deploy.png) |

## Bibliografía

- Brown, E. (2014). *Learning Node.js Development*. Addison-Wesley.
- Cantelon, M.; Harter, B.; Holowaychuk, T. y Rajlich, N. (2017). *Node.js in Action* (2.ª ed.). Manning.
- Express. (s.f.). Installing. https://expressjs.com/en/starter/installing.html
- Flanagan, D. (2020). *JavaScript. The Definitive Guide* (7.ª ed.). O'Reilly Media.
- MDN Web Docs. (s.f.). Asynchronous JavaScript. Mozilla Corporation. https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS
- MongoDB. (s.f.). Welcome to the MongoDB Docs. https://www.mongodb.com/docs/
- Node.js. (s.f.). Node.js documentation. https://nodejs.org/en/docs
