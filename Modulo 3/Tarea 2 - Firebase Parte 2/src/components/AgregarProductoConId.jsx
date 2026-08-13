import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from 'firebase/firestore';

const AgregarProductoConId = () => {
    const productoRef = doc(db, "productos", "producto001");

    const [producto, setProducto] = useState({ nombre: "", precio: "", stock: "" });

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await setDoc(productoRef, {
                nombre: producto.nombre,
                precio: Number(producto.precio),
                stock: Number(producto.stock)
            });

            setProducto({ nombre: "", precio: "", stock: "" });
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4"
        >
            <h2 className="text-base font-semibold text-gray-800">Agregar producto con ID definido (setDoc)</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={producto.precio}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={producto.stock}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
                Agregar producto (ID fijo)
            </button>
        </form>
    );
}

export default AgregarProductoConId;