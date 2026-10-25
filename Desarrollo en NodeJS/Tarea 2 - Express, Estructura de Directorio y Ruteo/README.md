# Mi primera API REST con Express

## Descripción

API REST básica creada con **Node.js** y **Express** que gestiona un recurso de **libros**. Los datos se guardan en memoria (un arreglo en `server.js`), por lo que la creación, edición y eliminación son simuladas: al reiniciar el servidor los datos vuelven a su estado inicial.

Rutas implementadas (servidor en el puerto `3000`):

| Método | Ruta            | Descripción                                   |
|--------|-----------------|-----------------------------------------------|
| GET    | `/`             | Mensaje de bienvenida en JSON                 |
| GET    | `/libros`       | Devuelve un arreglo JSON con varios libros    |
| GET    | `/libros/:id`   | Devuelve un libro por su ID (404 si no existe)|
| POST   | `/libros`       | Simula la creación de un libro (201)          |
| PUT    | `/libros/:id`   | Simula la edición de un libro                 |
| DELETE | `/libros/:id`   | Simula la eliminación de un libro             |

Ejemplo de cuerpo para `POST /libros`:

```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "anio": 2008
}
```

## Instalación y ejecución

Requisitos: [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Clonar el repositorio
git clone https://github.com/NicAT-12/Diplomatura_Full-Stack.git

# 2. Entrar a la carpeta del proyecto
cd "Diplomatura_Full-Stack/Desarrollo en NodeJS/Tarea 2 - Express.js"

# 3. Instalar dependencias
npm install

# 4. Ejecutar el servidor
node server.js
```

El servidor queda disponible en `http://localhost:3000`.

## Pruebas con Postman

En el archivo `postman_collection.json` hay una colección con las 6 solicitudes. Para usarla: en Postman, **Import** → seleccionar el archivo → ejecutar cada request con el servidor encendido.

Las capturas de las pruebas están en la carpeta [`capturas-postman/`](./capturas-postman).

## Créditos

- **Autor:** Nicolás Tissoni
- **Curso:** Desarrollo en NodeJS (Diplomatura Full-Stack)
- **Unidad:** Módulo 1 - Unidad 2: Express.js

## Bibliografía y documentación utilizada

- Cantelon, M.; Harter, B.; Holowaychuk, T. y Rajlich, N. (2017). *Node.js in Action* [Node.js en acción] (2ª ed.). Manning.
- Express. (s.f.-a). *Installing* [Instalación]. https://expressjs.com/en/starter/installing.html
- Express. (s.f.-b). *Routing* [Enrutamiento]. https://expressjs.com/en/guide/routing.html
- Postman. (s.f.). *Postman Docs* [Documentos de Postman]. https://learning.postman.com/
