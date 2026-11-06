export default function ListaTareas({ tareas }) {
  if (tareas.length === 0) {
    return <p className="py-6 text-center text-slate-500">Todavía no hay tareas cargadas.</p>
  }

  return (
    <ul className="space-y-3">
      {tareas.map((tarea) => (
        <li key={tarea._id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-slate-800">{tarea.titulo}</h3>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                tarea.completada ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {tarea.completada ? 'Completada' : 'Pendiente'}
            </span>
          </div>
          {tarea.descripcion && <p className="mt-1 text-sm text-slate-600">{tarea.descripcion}</p>}
        </li>
      ))}
    </ul>
  )
}
