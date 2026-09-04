import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="bg-indigo-600 px-6 py-4 flex justify-end gap-6">
            <Link 
                to="/" 
                className="text-white font-medium hover:text-indigo-200 transition-colors"
            >
                Inicio
            </Link>
            <Link 
                to="/pelicula/nueva" 
                className="text-white font-medium hover:text-indigo-200 transition-colors"
            >
                Agregar película
            </Link>
        </nav>
    )
}

export default NavBar