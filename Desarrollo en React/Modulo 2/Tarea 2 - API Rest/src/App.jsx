import Usuarios from "./components/Usuarios";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 text-center py-8">
        Listado de usuarios
      </h1>
      <Usuarios />
    </div>
  )
}

export default App;