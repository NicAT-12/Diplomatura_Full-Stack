import { useCallback, useEffect, useState } from 'react'
import { obtenerTareas } from './services/tareasApi.js'
import Cargando from './components/Cargando.jsx'
import MensajeError from './components/MensajeError.jsx'
import ListaTareas from './components/ListaTareas.jsx'
import FormularioTarea from './components/FormularioTarea.jsx'

export default function App() {
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controlador = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const datos = await obtenerTareas(controlador.signal)
        setTareas(datos)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message)
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargar()
    return () => controlador.abort()
  }, [intento])

  const reintentar = useCallback(() => setIntento((n) => n + 1), [])

  function agregarTarea(nueva) {
    setTareas((actuales) => [...actuales, nueva])
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-2xl space-y-8 px-4 py-10">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Gestor de Tareas</h1>
          <p className="mt-1 text-slate-600">Frontend en React conectado a una API en Express</p>
        </header>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-800">Nueva tarea</h2>
          <FormularioTarea onTareaCreada={agregarTarea} />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-800">Tareas</h2>
          {cargando && <Cargando texto="Cargando tareas..." />}
          {!cargando && error && <MensajeError mensaje={error} onReintentar={reintentar} />}
          {!cargando && !error && <ListaTareas tareas={tareas} />}
        </section>
      </main>
    </div>
  )
}
