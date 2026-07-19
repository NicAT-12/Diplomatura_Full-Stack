# Tarea 4 - Eventos en React

Módulo 2 - Unidad 4: Manejo de eventos en formularios y componentes.

## Descripción

Formulario controlado construido con **React** y **react-hook-form**, que implementa el manejo de los principales eventos del DOM: `onChange`, `onFocus`, `onBlur`, `onSubmit`, `onKeyDown`, `onMouseEnter` y `onMouseLeave`.

El formulario incluye:

- Campo de texto para el nombre.
- Campo de correo electrónico.
- Botón de envío con cambio de estilo al pasar el mouse.
- Validación de campos obligatorios mediante `react-hook-form`.
- Registro en consola de los cambios, el foco/desenfoque, las teclas presionadas (Enter) y los datos finales del envío.

## Consigna

**Objetivos:**
- Capturar y manejar eventos del navegador en React.
- Diferenciar entre eventos de interacción general y eventos de formularios.
- Entender el flujo de un formulario controlado.

**Requisitos:**
1. Crear un formulario con campo de nombre, campo de email y botón de envío.
2. Capturar eventos básicos:
   - `onChange` en ambos campos, registrando los cambios en consola.
   - `onFocus` y `onBlur` para mostrar mensajes cuando un campo esté activo o pierda el foco.
3. Controlar el envío con `onSubmit`:
   - Prevenir el comportamiento por defecto.
   - Mostrar en consola los datos ingresados.
4. Interacciones adicionales:
   - `onKeyDown` para detectar la tecla Enter en el campo de nombre.
   - `onMouseEnter` y `onMouseLeave` para cambiar el estilo del botón.

> En este proyecto se implementó la versión con `react-hook-form`, reemplazando la implementación original con `useState`.

## Instalación y ejecución

1. Cloná el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd tarea-4_eventos
   ```

2. Instalá las dependencias:
   ```bash
   npm install
   ```

3. Ejecutá el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abrí en el navegador la URL que indique la terminal (por defecto `http://localhost:5173`).

### Otros scripts disponibles

| Script            | Descripción                              |
|-------------------|-------------------------------------------|
| `npm run build`   | Genera la build de producción.            |
| `npm run preview` | Previsualiza la build de producción.      |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto.         |

## Capturas de pantalla

Las capturas se encuentran en la carpeta `screenshots/` en la raíz del proyecto:

- **`campo-obligatorio.png`** — Validación mostrando el mensaje de error cuando un campo requerido queda vacío.
- **`estados-de-enfoque.png`** — Mensajes en consola al enfocar (`onFocus`) y desenfocar (`onBlur`) los campos.
- **`valor-de-inputs-en-consola.png`** — Registro en consola de los valores tipeados mediante `onChange`.
- **`envio-de-data.png`** — Datos capturados en consola tras el envío del formulario (`onSubmit`).

## Eventos implementados

| Evento                        | Ubicación                    | Comportamiento                                                        |
|--------------------------------|-------------------------------|-------------------------------------------------------------------------|
| `onChange`                    | Campos nombre y email         | Registra en consola el valor tipeado en cada campo.                    |
| `onFocus`                     | Campos nombre y email         | Muestra en consola un mensaje al enfocar el campo.                     |
| `onBlur`                      | Campos nombre y email         | Muestra en consola un mensaje al desenfocar el campo.                  |
| `onSubmit`                    | Formulario                    | Previene el comportamiento por defecto y muestra los datos en consola. |
| `onKeyDown`                   | Campos nombre y email         | Detecta la tecla Enter y muestra un mensaje en consola.                |
| `onMouseEnter` / `onMouseLeave` | Botón de envío               | Cambia el texto/estilo del botón al pasar y quitar el mouse.           |

## Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [react-hook-form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Créditos y citación de fuentes

**Autor:** Nicolas Tissoni

**Bibliografía utilizada:**

- Banks, A. y Porcello, E. *Learning React: Modern Patterns for Developing React Apps*. 2ª ed. O'Reilly Media; 2020.
- Freeman, E. y Robson, E. *Head First JavaScript Programming*. 1ª ed. Estados Unidos: O'Reilly Media; 2014.
- MDN Web Docs. (s.f.). *DOM events*. Mozilla Corporation. https://developer.mozilla.org/en-US/docs/Web/Events
- React. (s.f.). *Responding to Events*. https://react.dev/learn/responding-to-events
