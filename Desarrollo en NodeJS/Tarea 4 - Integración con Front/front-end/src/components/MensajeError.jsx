export default function MensajeError({ mensaje, onReintentar }) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800" role="alert">
      <p>{mensaje}</p>
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          className="mt-3 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
