import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'));
                const documents = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setProductos(documents);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-800">Lista de productos (getDocs)</h2>

            {productos.length === 0 ? (
                <p className="text-sm text-gray-400">No hay productos cargados.</p>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {productos.map((producto) => (
                        <li key={producto.id} className="py-2 flex items-center justify-between text-sm">
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-800">{producto.nombre}</span>
                                <span className="text-xs text-gray-400">ID: {producto.id}</span>
                            </div>
                            <span className="text-gray-500">${producto.precio} · Stock: {producto.stock}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListaProductos;