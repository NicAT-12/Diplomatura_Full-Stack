import { useState } from 'react'
import { crearTarea } from '../services/tareasApi.js'
import MensajeError from './MensajeError.jsx'

export default function FormularioTarea({ onTareaCreada }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [exito, setExito] = useState(null)

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setEnviando(true)
    setError(null)
    setExito(null)

    try {
      const nueva = await crearTarea({ titulo: titulo.trim(), descripcion: descripcion.trim() })
      onTareaCreada(nueva)
      setTitulo('')
      setDescripcion('')
      setExito('La tarea se creó correctamente.')
    } catch (e) {
      setError(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={manejarEnvio} className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <label htmlFor="titulo" className="mb-1 block text-sm font-medium text-slate-700">
          Título
        </label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          disabled={enviando}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-100"
        />
      </div>

      <div>
        <label htmlFor="descripcion" className="mb-1 block text-sm font-medium text-slate-700">
          Descripción
        </label>
        <textarea
          id="descripcion"
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          disabled={enviando}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-100"
        />
      </div>

      {error && <MensajeError mensaje={error} />}
      {exito && (
        <p className="rounded-lg border border-green-300 bg-green-50 p-3 text-green-800" role="status">
          {exito}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {enviando ? 'Enviando...' : 'Agregar tarea'}
      </button>
    </form>
  )
}
