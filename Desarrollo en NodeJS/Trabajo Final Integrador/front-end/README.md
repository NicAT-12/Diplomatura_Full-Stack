# Clon de Chat (front-end)

Cliente hecho con React, Vite y TailwindCSS que consume la API de chat. Permite registrarse, iniciar sesión, ver la lista de chats, crear un chat 1 a 1 eligiendo a otra persona, enviar mensajes, buscar mensajes, eliminar mensajes propios, eliminar chats y eliminar la propia cuenta. Los mensajes y chats se actualizan cada pocos segundos mediante consultas periódicas.

## Instalación y ejecución

1. Entrar a la carpeta del front-end:

   ```bash
   cd "Desarrollo en NodeJS/Trabajo Final Integrador/front-end"
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env` a partir de `.env.example`:

   | Variable | Descripción |
   | --- | --- |
   | `VITE_API_URL` | URL base de la API (en local, `http://localhost:3000`) |

4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La aplicación queda disponible en `http://localhost:5173`. La API tiene que estar corriendo y su variable `CORS_ORIGIN` debe incluir esa URL.

5. Generar la versión de producción:

   ```bash
   npm run build
   ```

## Despliegue en Vercel

1. Importar el repositorio en Vercel.
2. Indicar como directorio raíz `Desarrollo en NodeJS/Trabajo Final Integrador/front-end`. Vercel detecta Vite automáticamente (build `npm run build`, salida `dist`).
3. Cargar la variable de entorno `VITE_API_URL` con la URL pública de la API en Render.
4. Agregar la URL que asigne Vercel a la variable `CORS_ORIGIN` de la API.
