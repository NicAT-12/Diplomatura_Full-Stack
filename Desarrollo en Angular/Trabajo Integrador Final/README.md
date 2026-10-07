# 📚 Biblioteca Abierta

Aplicación web multisitio desarrollada con **Angular** para explorar libros. Permite buscar, filtrar y ordenar obras, ver el detalle de cada una y guardar favoritos en el navegador.

Trabajo práctico de la Diplomatura Full-Stack (Desarrollo en Angular).

## API utilizada

[Open Library API](https://openlibrary.org/developers/api): API pública y gratuita, sin API key.

Endpoints usados:
- `GET https://openlibrary.org/search.json` → listado y búsqueda
- `GET https://openlibrary.org/works/{id}.json` → detalle de un libro
- `GET https://openlibrary.org/authors/{id}.json` → nombre de los autores
- `https://covers.openlibrary.org/b/id/{id}-M.jpg` → portadas

## Instalación y ejecución

Requisitos: Node.js y npm.

```bash
npm install
ng serve
```

Luego abrir http://localhost:4200

> Si `ng` no está instalado globalmente: `npx ng serve` o `npm start`.

## Páginas y rutas

| Ruta | Página |
|------|--------|
| `/` | Inicio (clásicos destacados desde la API) |
| `/libros` | Listado con búsqueda, filtro por género, orden y paginación |
| `/libros/:id` | Detalle dinámico de un libro (ej. `/libros/OL45804W`) |
| `/favoritos` | Libros guardados |
| `/nosotros` | Página estática |
| `/contacto` | Formulario con validaciones (demostrativo, no envía datos) |
| `**` | Página 404 |

## Funcionalidades opcionales incluidas

- Buscador, filtro por género, ordenamiento y paginación (los filtros quedan en la URL: `?q=&genero=&orden=&pagina=`)
- Estados de carga y manejo de errores con botón de reintento
- Favoritos persistidos con `localStorage`
- Formulario de contacto con validaciones
- Página 404
- Diseño responsive (TailwindCSS) con menú móvil

Nota: el ordenamiento se aplica sobre los resultados de la página que se está viendo.

## Estructura

```
src/app/
├── components/   header, footer, book-card, loading, error-message
├── pages/        home, books, book-detail, favorites, about, contact, not-found
├── services/     books.service.ts (API), favorites.service.ts (localStorage)
└── interfaces/   book.ts
```

## Tecnologías

Angular · TailwindCSS · RxJS · Signals