import { Link } from "react-router-dom";

const Inicio = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Inicio</h1>

            <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Productos</h3>
                <div className="flex flex-wrap gap-3">
                    <Link to="/producto/1?color=rojo" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Ver producto 1</Link>
                    <Link to="/producto/2?color=verde" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Ver producto 2</Link>
                    <Link to="/producto/3?color=violeta" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Ver producto 3</Link>
                    <Link to="/producto/4?color=amarillo" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Ver producto 4</Link>
                </div>
            </div>
        </div>
    )
}

export default Inicio;