export default function Cargando({ texto = 'Cargando...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-slate-600" role="status">
      <span className="h-6 w-6 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600" />
      <span>{texto}</span>
    </div>
  )
}
