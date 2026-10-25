const express = require('express');

const app = express();
const PORT = 3000;

// Middleware para interpretar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Recurso elegido: libros (datos simulados en memoria)
let libros = [
  { id: 1, titulo: 'Node.js in Action', autor: 'Mike Cantelon', anio: 2017 },
  { id: 2, titulo: 'Eloquent JavaScript', autor: 'Marijn Haverbeke', anio: 2018 },
  { id: 3, titulo: 'You Don\'t Know JS', autor: 'Kyle Simpson', anio: 2015 }
];

// GET / -> mensaje de bienvenida
app.get('/', (req, res) => {
  res.json({ mensaje: 'Bienvenido a mi primera API REST con Express' });
});

// GET /libros -> arreglo JSON con varios elementos
app.get('/libros', (req, res) => {
  res.json(libros);
});

// GET /libros/:id -> un elemento por su ID
app.get('/libros/:id', (req, res) => {
  const id = Number(req.params.id);
  const libro = libros.find((l) => l.id === id);

  if (!libro) {
    return res.status(404).json({ error: `No se encontró el libro con id ${id}` });
  }
  res.json(libro);
});

// POST /libros -> simula la creación de un nuevo elemento
app.post('/libros', (req, res) => {
  const { titulo, autor, anio } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Los campos "titulo" y "autor" son obligatorios' });
  }

  const nuevoLibro = {
    id: libros.length ? Math.max(...libros.map((l) => l.id)) + 1 : 1,
    titulo,
    autor,
    anio
  };
  libros.push(nuevoLibro);

  res.status(201).json({ mensaje: 'Libro creado correctamente', libro: nuevoLibro });
});

// PUT /libros/:id -> simula la edición de un elemento
app.put('/libros/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = libros.findIndex((l) => l.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: `No se encontró el libro con id ${id}` });
  }

  libros[indice] = { ...libros[indice], ...req.body, id };
  res.json({ mensaje: 'Libro actualizado correctamente', libro: libros[indice] });
});

// DELETE /libros/:id -> simula la eliminación de un elemento
app.delete('/libros/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = libros.findIndex((l) => l.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: `No se encontró el libro con id ${id}` });
  }

  const [eliminado] = libros.splice(indice, 1);
  res.json({ mensaje: 'Libro eliminado correctamente', libro: eliminado });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
