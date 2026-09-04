import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';

const AgregarProducto = () => {
    const [producto, setProducto] = useState({ nombre: "", precio: "", stock: "" });
    const [productoFinal, setProductoFinal] = useState(null);

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productsCollection = collection(db, 'productos');

            const docRef = await addDoc(productsCollection, {
                nombre: producto.nombre,
                precio: Number(producto.precio),
                stock: Number(producto.stock)
            });

            setProductoFinal({
                id: docRef.id,
                nombre: producto.nombre
            });

            console.log(productoFinal.id)

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
            <h2 className="text-base font-semibold text-gray-800">Agregar producto (addDoc)</h2>

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
                Agregar producto
            </button>

            {productoFinal && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    {`Producto agregado — Nombre: ${productoFinal.nombre} — ID: ${productoFinal.id}`}
                </p>
            )}
        </form>
    );
}

export default AgregarProducto;