import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { obtenerPeliculaPorId } from "../services/peliculasService";

const DetallePelicula = () => {
    const { id } = useParams();
    const [detallePelicula, setDetallePelicula] = useState({ titulo: "", descripcion: "", portada: "" });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        const obtenerDocumento = async () => {
            try {
                setDetallePelicula(await obtenerPeliculaPorId(id))
            } catch (error) {
                console.error('Error al traer el documento:', error);
                setError(error.message)
            } finally {
                setCargando(false);
            }
        };

        obtenerDocumento();
    }, [id]);

    if (cargando) return <p className="text-gray-500 text-lg">Cargando...</p>;

    if (!detallePelicula) return <p className="text-gray-500 text-lg">Película no encontrada.</p>;

    return (
        <div>
            {
                error ? <h3>{error}</h3>
                    : <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="relative">
                            <img
                                src={detallePelicula.portada}
                                alt={detallePelicula.titulo}
                                className="w-full h-80 object-cover bg-gray-100"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={detallePelicula.favorita ? "#ef4444" : "none"}
                                stroke={detallePelicula.favorita ? "#ef4444" : "#ffffff"}
                                strokeWidth="2"
                                className="absolute top-3 right-3 w-8 h-8 drop-shadow-md"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between gap-4 mb-1">
                                <h1 className="text-2xl font-bold text-gray-800">{detallePelicula.titulo}</h1>
                                <span className="shrink-0 bg-indigo-50 text-indigo-700 text-sm font-semibold px-2.5 py-1 rounded-md">
                                    {detallePelicula.rating}/10
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">
                                {detallePelicula.anio} · {detallePelicula.genero}
                            </p>
                            <p className="text-gray-600 leading-relaxed">{detallePelicula.descripcion}</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default DetallePelicula