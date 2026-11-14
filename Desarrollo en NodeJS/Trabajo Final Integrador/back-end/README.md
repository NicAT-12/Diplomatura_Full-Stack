# API de Clon de Chat (back-end)

API RESTful hecha con Node.js, Express y MongoDB (Mongoose) para un clon de chat 1 a 1. Incluye autenticación con JWT, validaciones con Zod, paginación y búsqueda de mensajes.

## Estructura

```
back-end
├── src
│   ├── routes
│   ├── controllers
│   ├── models
│   ├── middlewares
│   ├── validators
│   ├── utils
│   ├── app.js
│   └── db.js
├── package.json
├── .env.example
└── README.md
```

## Instalación y ejecución

1. Clonar el repositorio y entrar a la carpeta del back-end:

   ```bash
   cd "Trabajo Final Integrador/back-end"
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env` a partir de `.env.example` y completar los valores:

   | Variable | Descripción |
   | --- | --- |
   | `PORT` | Puerto del servidor (por defecto 3000) |
   | `MONGODB_URI` | Cadena de conexión de MongoDB Atlas, apuntando a la base `Trabajo-Final-NodeJS` |
   | `JWT_SECRET` | Secreto para firmar los tokens JWT |
   | `JWT_EXPIRES_IN` | Duración del token (por defecto `7d`) |
   | `CORS_ORIGIN` | Orígenes permitidos separados por coma (por ejemplo, la URL del front en local y en Vercel) |

4. Iniciar el servidor:

   ```bash
   npm start
   ```

   Para desarrollo con recarga automática:

   ```bash
   npm run dev
   ```

El servidor queda disponible en `http://localhost:3000`.

## Formato de respuestas

Todas las respuestas, exitosas o con error, tienen la misma forma:

```json
{ "success": true, "data": {}, "message": "Descripción del resultado" }
```

En los errores `success` es `false`, `data` es `null` (o la lista de campos inválidos en errores de validación) y `message` explica qué pasó.

Los listados devuelven `data.items` y `data.pagination` con `page`, `limit`, `total` y `totalPages`.

## Autenticación

Las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

El token se obtiene al registrarse o al iniciar sesión. Las contraseñas se guardan hasheadas con bcrypt y nunca se devuelven en las respuestas.

## Endpoints

| Método | Ruta | Auth | Descripción |
| --- | --- | --- | --- |
| GET | `/` | No | Estado de la API |
| POST | `/auth/register` | No | Registrar usuario (equivale a `POST /users`) |
| POST | `/auth/login` | No | Iniciar sesión |
| GET | `/auth/me` | Sí | Datos del usuario autenticado |
| POST | `/users` | No | Crear usuario |
| GET | `/users` | Sí | Listar usuarios (excluye al propio). Query: `page`, `limit`, `search` |
| DELETE | `/users/:id` | Sí | Eliminar la propia cuenta y todos sus mensajes |
| POST | `/chats` | Sí | Crear un chat 1 a 1 con otro usuario (si ya existe, devuelve el existente) |
| GET | `/chats` | Sí | Listar los chats del usuario. Query: `page`, `limit` |
| GET | `/chats/:id` | Sí | Obtener un chat |
| DELETE | `/chats/:id` | Sí | Eliminar un chat y sus mensajes |
| POST | `/messages` | Sí | Enviar un mensaje a un chat |
| GET | `/messages` | Sí | Historial de un chat. Query: `chatId` (obligatorio), `page`, `limit`, `search` |
| DELETE | `/messages/:id` | Sí | Eliminar un mensaje propio |

Por defecto los listados de usuarios y chats devuelven 20 elementos por página y el historial de mensajes 50. El máximo es 100. En el historial, la página 1 contiene los mensajes más recientes, ordenados del más viejo al más nuevo.

## Ejemplos de requests y responses

### Registrar usuario

`POST /auth/register`

```json
{ "name": "Ana", "email": "ana@mail.com", "password": "secreto123" }
```

`201 Created`

```json
{
  "success": true,
  "data": {
    "user": {
      "name": "Ana",
      "email": "ana@mail.com",
      "createdAt": "2026-11-13T15:00:00.000Z",
      "updatedAt": "2026-11-13T15:00:00.000Z",
      "id": "6735f1a2c3d4e5f6a7b8c9d0"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Usuario creado correctamente"
}
```

### Iniciar sesión

`POST /auth/login`

```json
{ "email": "ana@mail.com", "password": "secreto123" }
```

`200 OK`

```json
{
  "success": true,
  "data": { "user": { "name": "Ana", "email": "ana@mail.com", "id": "6735f1a2c3d4e5f6a7b8c9d0" }, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
  "message": "Inicio de sesión exitoso"
}
```

### Listar usuarios

`GET /users?search=lu&page=1&limit=10`

```json
{
  "success": true,
  "data": {
    "items": [{ "name": "Luis", "email": "luis@mail.com", "id": "6735f1b4c3d4e5f6a7b8c9d1" }],
    "pagination": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 }
  },
  "message": "Usuarios obtenidos correctamente"
}
```

### Crear un chat

`POST /chats`

```json
{ "participantId": "6735f1b4c3d4e5f6a7b8c9d1" }
```

`201 Created`

```json
{
  "success": true,
  "data": {
    "name": "",
    "participants": [
      { "name": "Ana", "email": "ana@mail.com", "id": "6735f1a2c3d4e5f6a7b8c9d0" },
      { "name": "Luis", "email": "luis@mail.com", "id": "6735f1b4c3d4e5f6a7b8c9d1" }
    ],
    "lastMessage": null,
    "id": "6735f1c5c3d4e5f6a7b8c9d2"
  },
  "message": "Chat creado correctamente"
}
```

### Enviar un mensaje

`POST /messages`

```json
{ "chatId": "6735f1c5c3d4e5f6a7b8c9d2", "content": "Hola Luis, ¿cómo estás?" }
```

`201 Created`

```json
{
  "success": true,
  "data": {
    "chatId": "6735f1c5c3d4e5f6a7b8c9d2",
    "userId": { "name": "Ana", "id": "6735f1a2c3d4e5f6a7b8c9d0" },
    "content": "Hola Luis, ¿cómo estás?",
    "createdAt": "2026-11-13T15:05:00.000Z",
    "updatedAt": "2026-11-13T15:05:00.000Z",
    "id": "6735f1d6c3d4e5f6a7b8c9d3"
  },
  "message": "Mensaje enviado correctamente"
}
```

### Recuperar el historial (con búsqueda y paginación)

`GET /messages?chatId=6735f1c5c3d4e5f6a7b8c9d2&search=hola&page=1&limit=50`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "chatId": "6735f1c5c3d4e5f6a7b8c9d2",
        "userId": { "name": "Ana", "id": "6735f1a2c3d4e5f6a7b8c9d0" },
        "content": "Hola Luis, ¿cómo estás?",
        "createdAt": "2026-11-13T15:05:00.000Z",
        "updatedAt": "2026-11-13T15:05:00.000Z",
        "id": "6735f1d6c3d4e5f6a7b8c9d3"
      }
    ],
    "pagination": { "page": 1, "limit": 50, "total": 1, "totalPages": 1 }
  },
  "message": "Historial obtenido correctamente"
}
```

### Error de validación

`POST /auth/register` con `{ "name": "A", "email": "x", "password": "1" }`

`400 Bad Request`

```json
{
  "success": false,
  "data": [
    { "field": "name", "message": "El nombre debe tener al menos 2 caracteres" },
    { "field": "email", "message": "El email no es válido" },
    { "field": "password", "message": "La contraseña debe tener al menos 6 caracteres" }
  ],
  "message": "El nombre debe tener al menos 2 caracteres"
}
```

### Códigos de estado usados

| Código | Cuándo |
| --- | --- |
| 200 / 201 | Operación exitosa / recurso creado |
| 400 | Datos inválidos, JSON mal formado o ID inválido |
| 401 | Falta el token, es inválido o expiró, o las credenciales son incorrectas |
| 403 | Intento de eliminar la cuenta de otro usuario |
| 404 | Ruta, chat, usuario o mensaje inexistente |
| 409 | Email ya registrado |
| 500 | Error interno del servidor |

## Conexión con el frontend

El front (React + Vite) consume esta API con `fetch`. Debe conocer la URL base de la API y enviar el token en cada request protegida:

```js
const API_URL = import.meta.env.VITE_API_URL;

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const { success, data, message } = await response.json();
  if (!success) throw new Error(message);
  localStorage.setItem('chat_token', data.token);
  return data.user;
};

const getMessages = async (chatId) => {
  const response = await fetch(`${API_URL}/messages?chatId=${chatId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('chat_token')}` }
  });
  const { success, data, message } = await response.json();
  if (!success) throw new Error(message);
  return data.items;
};
```

Para que el navegador acepte las respuestas, la URL del front debe estar incluida en la variable `CORS_ORIGIN` del servidor.

## Despliegue en Render

1. Crear un nuevo Web Service en Render conectado al repositorio de GitHub.
2. Indicar como directorio raíz `Trabajo Final Integrador/back-end`.
3. Comando de build: `npm install`. Comando de inicio: `npm start`.
4. Cargar las variables de entorno `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN` y `CORS_ORIGIN` (con la URL del front en Vercel).
5. En MongoDB Atlas, permitir el acceso desde Render en Network Access.
