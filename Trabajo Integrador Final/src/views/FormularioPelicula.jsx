import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { crearPelicula, editarPelicula, obtenerPeliculaPorId } from "../services/peliculasService"
import { validarPelicula } from "../validators/validarPelicula"

const FormularioPelicula = () => {
    const inputTituloRef = useRef(null);
    const [errorValidador, setErrorValidador] = useState({})
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { id } = useParams()
    const modoEdicion = id ? true : false;
    const [peli, setPeli] = useState({
        titulo: '',
        descripcion: '',
        portada: '',
        anio: 0,
        genero: '',
        rating: 0,
        favorita: false
    })
    const [cargando, setCargando] = useState(modoEdicion)

    function handleChange(e) {
        if (e.target.type === "checkbox") {
            setPeli({ ...peli, [e.target.name]: e.target.checked })
        } else {
            setPeli({ ...peli, [e.target.name]: e.target.value })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { valido, errores } = validarPelicula(peli)

        if (!valido) {
            setErrorValidador(errores)
            return
        }

        const { id: _idPeli, ...peliSinId } = peli;

        try {
            if (modoEdicion) {
                const resultado = await editarPelicula(id, peliSinId)
                if (resultado) {
                    navigate('/');
                } else {
                    setError("Error al editar pelicula")
                }
            } else {
                const resultado = await crearPelicula(peli);
                if (resultado) {
                    navigate('/');
                } else {
                    setError("Error al agregar pelicula")
                }
            }
        } catch (error) {
            console.error('Error al agregar el documento: ', error);
        }
    }

    useEffect(() => {
        if (!modoEdicion) {
            return;
        }

        const obtenerDocumento = async () => {
            try {
                setPeli(await obtenerPeliculaPorId(id))
            } catch (error) {
                setError(error.message)
            } finally {
                setCargando(false)
            }
        };

        obtenerDocumento()
    }, [id, modoEdicion]);

    useEffect(() => {
        if (inputTituloRef.current) {
            inputTituloRef.current.focus();
        }
    }, [cargando]);

    if (cargando) return <p className="text-gray-500 text-lg">Cargando...</p>;
    if (!peli) return <p className="text-gray-500 text-lg">No se encontró el documento.</p>;

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="max-w-lg mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {modoEdicion ? "Editar Película" : "Nueva Película"}
            </h1>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Portada</label>
                <input
                    name="portada"
                    value={peli.portada}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Portada..."
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Título</label>
                <input
                    name="titulo"
                    value={peli.titulo}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Título..."
                    ref={inputTituloRef}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errorValidador.titulo && (
                    <span className="text-red-500 text-xs">{errorValidador.titulo}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Descripción</label>
                <input
                    name="descripcion"
                    value={peli.descripcion}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Descripción..."
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Año</label>
                <input
                    name="anio"
                    value={peli.anio}
                    onChange={(e) => handleChange(e)}
                    type="number"
                    placeholder="Año..."
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errorValidador.anio && (
                    <span className="text-red-500 text-xs">{errorValidador.anio}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Género</label>
                <input
                    name="genero"
                    value={peli.genero}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Género..."
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errorValidador.genero && (
                    <span className="text-red-500 text-xs">{errorValidador.genero}</span>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Rating</label>
                <input
                    name="rating"
                    value={peli.rating}
                    onChange={(e) => handleChange(e)}
                    type="number"
                    placeholder="Rating..."
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="1"
                    max="10"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    name="favorita"
                    checked={peli.favorita}
                    onChange={(e) => handleChange(e)}
                    type="checkbox"
                    className="h-4 w-4 accent-indigo-600"
                />
                <label className="text-sm font-medium text-gray-600">Favorita</label>
            </div>

            <button
                type="submit"
                className="cursor-pointer mt-2 bg-indigo-600 text-white font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
                Enviar
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    )
}

export default FormularioPelicula