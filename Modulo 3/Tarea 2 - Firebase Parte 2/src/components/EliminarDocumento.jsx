import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const EliminarDocumento = () => {
    const [id, setId] = useState("");

    const handlerDeleteProduct = async (e) => {
        e.preventDefault();

        const docRef = doc(db, "productos", id);

        try {
            await deleteDoc(docRef);
            setId("");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-800">Eliminar producto (deleteDoc)</h2>
            <form onSubmit={handlerDeleteProduct} className="flex gap-3">
                <input
                    type="text"
                    placeholder="ID del producto a eliminar"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors"
                >
                    Eliminar
                </button>
            </form>
        </div>
    );
}

export default EliminarDocumento;