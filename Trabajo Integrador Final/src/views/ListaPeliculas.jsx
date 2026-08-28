import { useState, useEffect, useMemo } from "react";
import { eliminarPelicula, obtenerPeliculas } from "../services/peliculasService";
import { Link } from "react-router-dom";

const ListaPeliculas = () => {
    const [listaPelis, setListaPelis] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        const getPelis = async () => {
            try {
                const peliculas = await obtenerPeliculas()
                setListaPelis(peliculas);
            } catch (error) {
                console.error("Error al obtener las peliculas: ", error);
                setError(error.message);
            } finally {
                setCargando(false);
            }
        }
        getPelis();
    }, []);

    const listaFiltrada = useMemo(() => {
        return listaPelis.filter(peli =>
            peli.titulo.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [listaPelis, busqueda]);

    if (cargando) return <h3 className="text-gray-500 text-lg">Cargando...</h3>;

    const handleDelete = async (id) => {
        const decision = confirm("Estas seguro?")
        if (decision) {
            const peliEliminada = await eliminarPelicula(id)
            if (peliEliminada) {
                setListaPelis(listaPelis.filter((peli) => peli.id !== id))
            } else {
                setError("No se pudo eliminar la película. Intentá de nuevo.")
            }
        } else {
            return
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Lista de Películas
            </h1>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Búsqueda
                </label>

                <input
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar"
                    className="w-full sm:w-72 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {listaFiltrada.map((peli) => {
                    return (
                        <div
                            key={peli.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="relative">
                                <img
                                    src={peli.portada}
                                    alt={peli.titulo}
                                    className="w-full aspect-[2/3] object-contain bg-gray-100"
                                />

                                {peli.favorita && (
                                    <span className="absolute top-2 right-2 bg-white text-red-500 text-lg rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                                        ❤️
                                    </span>
                                )}
                            </div>

                            <div className="p-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {peli.titulo}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-4">
                                        {peli.anio}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(peli.id)}
                                        className="cursor-pointer bg-red-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Eliminar
                                    </button>

                                    <Link
                                        to={`pelicula/${peli.id}/editar`}
                                        className="cursor-pointer bg-blue-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Editar
                                    </Link>

                                    <Link
                                        to={`pelicula/${peli.id}`}
                                        className="cursor-pointer bg-blue-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Detalle
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListaPeliculas