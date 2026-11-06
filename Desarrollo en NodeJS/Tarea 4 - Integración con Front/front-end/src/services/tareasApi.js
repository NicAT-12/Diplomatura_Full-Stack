const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

async function pedir(ruta, opciones) {
  let respuesta
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, opciones)
  } catch {
    throw new Error('No se pudo conectar con el servidor. Intentá de nuevo en unos minutos.')
  }

  let datos = null
  try {
    datos = await respuesta.json()
  } catch {
    datos = null
  }

  if (!respuesta.ok) {
    throw new Error(datos?.error || `Error ${respuesta.status} al comunicarse con el servidor.`)
  }

  return datos
}

export function obtenerTareas(signal) {
  return pedir('/tareas', { signal })
}

export function crearTarea(tarea) {
  return pedir('/tareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarea),
  })
}
