import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="flex gap-6 p-4 bg-gray-800 text-white shadow-md">
                <Link to="/" className="hover:text-blue-300 font-medium">Inicio</Link>
                <Link to="/contacto" className="hover:text-blue-300 font-medium">Contacto</Link>
                <Link to="/nosotros" className="hover:text-blue-300 font-medium">Nosotros</Link>
            </nav>

            <main className="p-6 max-w-3xl mx-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout