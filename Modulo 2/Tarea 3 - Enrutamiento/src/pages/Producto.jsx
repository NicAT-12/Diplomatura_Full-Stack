import { useParams, useNavigate, useSearchParams } from "react-router-dom";

const Producto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    function volverInicio() {
        navigate('/')
    }

    const color = searchParams.get('color');

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Producto numero: {id}</h2>
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">{color}</span>
            <div>
                <button onClick={volverInicio} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Volver</button>
            </div>
        </div>
    )
}

export default Producto;