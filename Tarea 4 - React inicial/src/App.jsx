import './App.css';

import fullstackImg from './assets/images/full-stack-image.png';
import cocineroImg from './assets/images/cocinero-image.jpg';
import baristaImg from './assets/images/barista-image.jpg';

import Tarjeta from './components/Tarjeta';

function App() {
  return (
    <div className="contenedor-tarjetas">
      <Tarjeta
        nombre="Nicolas"
        profesion="Desarrollador Web"
        imagen={fullstackImg}
        descripcion="Desarrollador web junior fullstack"
      />

      <Tarjeta
        nombre="Federico"
        profesion="Cocinero"
        imagen={cocineroImg}
        descripcion="Cocinero 5 estrellas michelin"
      />

      <Tarjeta
        nombre="Amanda"
        profesion="Barista"
        imagen={baristaImg}
        descripcion="Barista de cafetería"
      />
    </div>
  )
}

export default App;