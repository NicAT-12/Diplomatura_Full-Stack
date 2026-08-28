import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import ListaPeliculas from "../views/ListaPeliculas";
import DetallePelicula from "../views/DetallePelicula";
import FormularioPelicula from "../views/FormularioPelicula";
import PaginaNoEncontrada from "../views/PaginaNoEncontrada";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <ListaPeliculas /> },
            { path: "pelicula/:id", element: <DetallePelicula /> },
            { path: "pelicula/nueva", element: <FormularioPelicula /> },
            { path: "pelicula/:id/editar", element: <FormularioPelicula /> },
            { path: "*", element: <PaginaNoEncontrada /> },
        ],
    },
]);

const MainRouter = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default MainRouter;