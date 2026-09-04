import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from 'firebase/firestore';

const ProductosEnTiempoReal = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
            const documents = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setProductos(documents); 
        });

        return unsubscribe; 
    }, []);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-gray-800">Productos (tiempo real — onSnapshot)</h2>
                <span className="flex items-center gap-1 text-xs text-green-600">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    en vivo
                </span>
            </div>

            {productos.length === 0 ? (
                <p className="text-sm text-gray-400">No hay productos cargados.</p>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {productos.map((producto) => (
                        <li key={producto.id} className="py-2 flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-800">{producto.nombre}</span>
                            <span className="text-gray-500">${producto.precio} · Stock: {producto.stock}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProductosEnTiempoReal;