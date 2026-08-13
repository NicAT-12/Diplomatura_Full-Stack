import { useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const productoRef = doc(db, "productos", "producto001");

const ActualizarProducto = () => {
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const handlerUpdatePrice = async (e) => {
        e.preventDefault();
        try {
            await setDoc(productoRef, { precio: Number(precio) }, { merge: true });

            setPrecio("");
        } catch (error) {
            console.error("Error chaging price: ", error);
        }
    };

    const handleUpdateStock = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(productoRef, {
                stock: Number(stock),
            });

            setStock("");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <h2 className="text-base font-semibold text-gray-800">Actualizar producto (producto001)</h2>

            <form onSubmit={handlerUpdatePrice} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">Actualizar precio (setDoc + merge)</h3>
                <div className="flex gap-3">
                    <input
                        type="number"
                        placeholder="Nuevo precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 active:bg-amber-700 transition-colors"
                    >
                        Actualizar precio
                    </button>
                </div>
            </form>

            <form onSubmit={handleUpdateStock} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">Actualizar stock (updateDoc)</h3>
                <div className="flex gap-3">
                    <input
                        type="number"
                        placeholder="Nuevo stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 active:bg-amber-700 transition-colors"
                    >
                        Actualizar stock
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ActualizarProducto;