# Tarea 2 - Directivas y Formularios

## Descripción

Proyecto correspondiente a la Unidad 2 del Módulo 1 (Angular básico. Directivas y Formularios) de la Diplomatura Full-Stack. Implementa un componente `registro` con un formulario reactivo (`FormBuilder`), validaciones de campos, y directivas de Angular (`*ngIf`, `*ngFor`, `[ngClass]`, `[ngStyle]`) para mostrar mensajes de error dinámicos, resaltar campos inválidos y controlar el estado del botón de envío.

# Consigna

## Estructura inicial

- Crear un nuevo componente llamado `registro`.
- En la plantilla, incluir un título y un breve texto descriptivo sobre el formulario.

## Formulario reactivo

- Definir un formulario con `FormBuilder` que tenga al menos los siguientes campos:
  - `nombre` (obligatorio, mínimo 3 caracteres).
  - `email` (obligatorio, formato válido).
  - `mensaje` (opcional).
- Configurar las validaciones indicadas.

## Directivas

- Utilizar `*ngIf` para mostrar un mensaje de "Formulario enviado" cuando el formulario se envíe correctamente.
- Utilizar `*ngFor` para mostrar una lista de mensajes de error para cada campo inválido.
- Aplicar `[ngClass]` para resaltar en rojo los campos inválidos.
- Aplicar `[ngStyle]` para cambiar el color del texto del título si el formulario es válido.

## Botón de envío

- Deshabilitar el botón de envío mientras el formulario sea inválido.
- Al hacer clic en "Enviar", mostrar los datos en consola y resetear el formulario.

## Instrucciones para clonar, instalar dependencias y ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/NicAT-12/Diplomatura_Full-Stack.git

# Ingresar a la carpeta del proyecto
cd "Diplomatura_Full-Stack/Tarea 2 - Directivas y Formularios"

# Instalar dependencias
npm install

# Ejecutar el servidor de desarrollo
ng serve
```

La aplicación queda disponible en `http://localhost:4200/`.

## Ejemplo de ejecución en consola

Al completar el formulario con los siguientes datos:

- **nombre:** `ejemplo`
- **email:** `email-de-ejemplo@ejemplo.com`
- **mensaje:** `Texto de ejemplo`

y presionar el botón **Enviar**, la consola del navegador muestra:

```js
{
  nombre: 'ejemplo',
  email: 'email-de-ejemplo@ejemplo.com',
  mensaje: 'Texto de ejemplo'
}
```

Luego del envío, el formulario se resetea y se muestra el mensaje "Formulario enviado" en pantalla.

## Capturas de pantalla

Ubicadas en la carpeta `screenshots/`:

- `captura_error-campo-obligatorio.png` — campo obligatorio sin completar.
- `captura_error-minimo-tres-formato-email.png` — errores de longitud mínima y formato de email.
- `captura_campos-validos.png` — formulario con todos los campos válidos.
- `captura_formulario-enviado.png` — formulario enviado correctamente.

## Créditos del autor

- **Nombre:** Nicolas Tissoni
- **Curso:** Diplomatura Full-Stack
- **Unidad:** Módulo 1 - Unidad 2, Angular básico. Directivas y Formularios

## Bibliografía y créditos

- Angular. (s.f.-a). *Reactive forms*. https://angular.dev/guide/forms/reactive-forms
- Angular. (s.f.-b). *Built-in directives*. https://angular.dev/guide/directives
- Angular. (s.f.-c). *Forms in Angular*. https://angular.dev/guide/forms
