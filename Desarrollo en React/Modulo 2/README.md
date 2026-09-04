# Prácticas del Módulo 2 - Hooks, Consumo de APIs, Enrutamiento y Eventos

## Descripción

Este repositorio reúne las actividades realizadas durante el Módulo 2, enfocadas en profundizar el manejo de React más allá de lo básico: gestión de estado con Hooks (incluyendo hooks personalizados), consumo de APIs REST, enrutamiento con React Router y manejo de eventos en formularios y componentes.

---

## Tarea 1 - Hooks

Task App desarrollada con React y Hooks, con persistencia de datos en `localStorage`.

### Conceptos trabajados

* Gestión de estado con `useState` y `useEffect`.
* Creación de un hook personalizado (`useLocalStorage`) para sincronizar estado con `localStorage`.
* Validación de formularios (campos vacíos y duplicados).
* Búsqueda y filtrado de tareas en tiempo real.
* Validación de props con `PropTypes`.
* Estilos y diseño responsive con TailwindCSS.

---

## Tarea 2 - API Rest

Listado de usuarios consumiendo la API pública JSONPlaceholder.

### Conceptos trabajados

* Consumo de una API REST con `fetch` y `async/await`.
* Manejo de estados de carga, error y datos con `useState`.
* Solicitud a la API dentro de `useEffect`, validando `res.ok` y manejando errores con `try/catch`.
* Renderizado condicional según el estado de la aplicación.
* Buscador por nombre y botón de recarga de datos.
* Separación en componentes (`Usuarios.jsx` y `UsuarioCard.jsx`).

---

## Tarea 3 - Enrutamiento

Mini dashboard con rutas públicas y protegidas usando React Router.

### Conceptos trabajados

* Configuración de rutas con `BrowserRouter`, `Routes` y `Route`.
* Rutas estáticas y navegación declarativa con `Link`.
* Ruta dinámica con parámetros (`useParams`) y manejo de query params (`useSearchParams`).
* Navegación programática con `useNavigate`.
* Rutas anidadas mediante un layout compartido con `Outlet`.
* Ruta protegida simulando un flujo de login, con redirección post-autenticación usando `useLocation` y `Navigate`.

---

## Tarea 4 - Eventos

Formulario controlado que implementa el manejo de los principales eventos del DOM.

### Conceptos trabajados

* Manejo de `onChange`, `onFocus`, `onBlur`, `onSubmit`, `onKeyDown`, `onMouseEnter` y `onMouseLeave`.
* Formulario controlado construido con `react-hook-form`.
* Validación de campos obligatorios.
* Prevención del comportamiento por defecto en el envío del formulario.
* Cambios de estilo interactivos en el botón de envío.

---

## Tecnologías Utilizadas

* React
* Vite
* React Router DOM
* react-hook-form
* TailwindCSS
* PropTypes
* Git
* GitHub

---

## Objetivos Alcanzados

* Gestionar estado complejo mediante Hooks y hooks personalizados.
* Consumir APIs externas y manejar sus distintos estados (carga, error, datos).
* Implementar enrutamiento completo con rutas dinámicas, anidadas y protegidas.
* Manejar eventos del DOM y formularios controlados.
* Aplicar buenas prácticas de organización y validación en componentes React.

---

## Autor

**Nicolás Tissoni**

---

## Curso

Desarrollo Web Full Stack - Módulo 2

---

## Bibliografía y Recursos

* Documentación oficial de React.
* Documentación oficial de React Router.
* Documentación oficial de react-hook-form.
* MDN Web Docs.
* Banks, A. y Porcello, E. *Learning React: Modern Patterns for Developing React Apps*. 2ª ed. O'Reilly Media; 2020.
