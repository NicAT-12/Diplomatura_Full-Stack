import ActualizarProducto from "./components/ActualizarProducto"
import AgregarProducto from "./components/AgregarProducto"
import AgregarProductoConId from "./components/AgregarProductoConId"
import EliminarDocumento from "./components/EliminarDocumento"
import ListaProductos from "./components/ListaProductos"
import Login from "./components/Login"
import ProductosEnTiempoReal from "./components/ProductosEnTiempoReal"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-lg font-semibold text-gray-800">Firebase Parte 2 — CRUD Firestore</h1>
          <Login />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <AgregarProducto />
        <AgregarProductoConId />
        <ListaProductos />
        <ProductosEnTiempoReal />
        <ActualizarProducto />
        <EliminarDocumento />
      </main>
    </div>
  )
}

export default App