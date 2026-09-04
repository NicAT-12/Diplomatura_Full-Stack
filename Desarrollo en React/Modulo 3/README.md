# Prácticas del Módulo 3 - Firebase y React Avanzado

## Descripción

Este repositorio reúne las actividades realizadas durante el Módulo 3, enfocadas en la integración de React con Firebase (configuración, Firestore y autenticación) y en conceptos avanzados de React como el manejo de estado global mediante Context API.

---

## Tarea 1 - Firebase Parte 1

Conexión de una primera app React con Firebase.

### Conceptos trabajados

* Creación de un proyecto en Firebase Console y vinculación con una app web.
* Instalación del SDK de Firebase e inicialización única de la app.
* Uso de variables de entorno (`VITE_...`) para proteger las credenciales, excluidas del repositorio con `.gitignore`.
* Importación selectiva de módulos de Firebase.
* Verificación real de la conexión mediante una consulta a Firestore (`getDocs`).
* Diagnóstico de errores de reglas de seguridad de Firestore.

---

## Tarea 2 - Firebase Parte 2

CRUD completo sobre una colección de productos en Firestore.

### Conceptos trabajados

* Operaciones de creación con `addDoc` (ID automático) y `setDoc` (ID definido).
* Lectura puntual con `getDocs` y `getDoc`, y lectura en tiempo real con `onSnapshot`.
* Actualización parcial con `setDoc` (`merge: true`) y `updateDoc`.
* Eliminación de documentos con `deleteDoc`.
* Autenticación anónima con Firebase Authentication (`signInAnonymously`).
* Reglas de seguridad de Firestore restringiendo la escritura a usuarios autenticados, con pruebas de acceso denegado y permitido.

---

## Tarea 3 - React Avanzado

Aplicación con contexto global para selección de idioma.

### Conceptos trabajados

* Creación y uso de Context API (`IdiomaContext`) para evitar prop drilling.
* Acceso y modificación de estado global con `useContext`.
* Optimización de renders con `useMemo` (valor del contexto) y `useCallback` (función de cambio de idioma).
* Separación de componentes consumidores (`Header`, `SelectorIdioma`).

---

## Tecnologías Utilizadas

* React
* Vite
* Firebase (Firestore y Authentication)
* Context API
* TailwindCSS
* Git
* GitHub

---

## Objetivos Alcanzados

* Integrar una app React con servicios de Firebase de forma segura, usando variables de entorno.
* Implementar operaciones CRUD completas sobre Firestore, incluyendo lecturas en tiempo real.
* Aplicar reglas de seguridad basadas en autenticación y verificar su comportamiento.
* Manejar estado global en React con Context API, optimizando renders innecesarios.

---

## Autor

**Nicolás Tissoni**

---

## Curso

Desarrollo Web Full Stack - Módulo 3

---

## Bibliografía y Recursos

* Documentación oficial de Firebase.
* Documentación oficial de React (Context API).
* Gupta, S. *Getting Started with Firebase*. 1ª ed. Packt Publishing; 2017.
* Banks, A. y Porcello, E. *Learning React: Modern Patterns for Developing React Apps*. 2ª ed. O'Reilly Media; 2020.
