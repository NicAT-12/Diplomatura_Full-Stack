import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Producto from './pages/Producto';
import Layout from './components/Layout';
import Login from './pages/Login';
import RutaProtegida from './components/RutaProtegida';

const App = () => {
  const [logueado, setLogueado] = useState(false)

  function handleLogin() {
    setLogueado(true)
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path='contacto' element={<Contacto />} />
          <Route path='nosotros' element={<Nosotros />} />
          <Route element={<RutaProtegida isLoged={logueado} />} >
            <Route path='producto/:id' element={<Producto />} />
          </Route>
          <Route path='login' element={<Login handleLogin={handleLogin} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;