# Mi app con Contexto Global — Idioma

Tarea 3 - React Avanzado | Módulo 3, Unidad 3 | Diplomatura Full-Stack (UTN)

## Descripción del caso

Esta aplicación resuelve el problema de compartir el **idioma seleccionado** (`"esp"`, `"eng"` o `"por"`) entre distintos componentes de la app sin necesidad de pasarlo manualmente por props (prop drilling).

Mediante **Context API** de React, se crea un `IdiomaContext` que almacena el idioma actual y una función `cambiarIdioma` para modificarlo. Cualquier componente dentro del árbol puede acceder a ese valor global o modificarlo usando `useContext`, sin importar en qué nivel de anidamiento se encuentre.

- `Header`: muestra el idioma actualmente seleccionado.
- `SelectorIdioma`: expone tres botones para cambiar el idioma entre español, inglés y portugués.

El valor del contexto está optimizado con `useMemo`, y la función `cambiarIdioma` con `useCallback`, para evitar renders innecesarios en los componentes consumidores.

## Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/NicAT-12/Diplomatura_Full-Stack.git
   ```
2. Ingresar a la carpeta del proyecto:
   ```bash
   cd "Diplomatura_Full-Stack/Modulo 3/Tarea 3 - React Avanzado"
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Ejecutar el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

## Capturas

**Idioma por defecto (español):**

![Idioma por defecto - Español](screenshots/idioma_por-defecto_esp.png)

**Idioma en inglés:**

![Idioma en inglés](screenshots/idioma_eng.png)

**Idioma en portugués:**

![Idioma en portugués](screenshots/idioma_por.png)

## Créditos

Nicolas Tissoni
UTN — Diplomatura Full-Stack
Módulo 3, Tarea 3 - React Avanzado

## Bibliografía

- React. (s.f.-a). *Passing Data Deeply with Context*. https://react.dev/learn/passing-data-deeply-with-context
- React. (s.f.-b). *useContext*. https://react.dev/reference/react/useContext
- React. (s.f.-c). *useMemo*. https://react.dev/reference/react/useMemo
