import { useState, useEffect } from 'react';

import UsuarioCard from './UsuarioCard';
import PropTypes from 'prop-types';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchText, setSearchText] = useState("");

    const API = "https://jsonplaceholder.typicode.com/users"

    async function getData() {
        try {
            const response = await fetch(API);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);

            setUsuarios(data);
        } catch (error) {
            console.error('Network or parsing error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getData();
    }, [])

    function handleReload() {
        setLoading(true);
        setError("");
        setUsuarios([]);
        getData();
    }

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const search = searchText.toLowerCase();

        return usuario.name.toLowerCase().includes(search)
    })

    let contenido;

    if (loading) {
        contenido = <h3 className="text-gray-500 text-center py-10">Cargando usuarios...</h3>;
    } else if (error) {
        contenido = <h3 className="text-red-500 text-center py-10">{error}</h3>;
    } else if (usuariosFiltrados.length > 0) {
        contenido = (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {usuariosFiltrados.map((usuario) => (
                    <UsuarioCard key={usuario.id} usuario={usuario} />
                ))}
            </ul>
        );
    } else {
        contenido = <h3 className="text-gray-400 text-center py-10">No se encontraron usuarios</h3>;
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                    type="text"
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    placeholder="Buscar usuario"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
                <button
                    onClick={handleReload}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200"
                >
                    Recargar
                </button>
            </div>

            {contenido}
        </div>
    )
}

Usuarios.propTypes = {
    usuario: PropTypes.string.isRequired   
};

export default Usuarios