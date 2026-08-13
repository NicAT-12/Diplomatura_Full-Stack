import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from 'firebase/firestore';

const BuscarProducto = () => {
    const [searchId, setSearchId] = useState("");
    const [foundProduct, setFoundProduct] = useState(undefined);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productoRef = doc(db, "productos", searchId);

        try {
            const docSnap = await getDoc(productoRef);

            if (docSnap.exists()) {
                setFoundProduct({ ...docSnap.data(), id: docSnap.id });
            } else {
                setFoundProduct(null);
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Buscar producto por ID</h2>
                <input
                    type="text"
                    placeholder="ID del producto"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>

            {foundProduct && (
                <p>{foundProduct.nombre} — ${foundProduct.precio} — Stock: {foundProduct.stock}</p>
            )}
            {foundProduct === null && <p>Producto no encontrado</p>}
        </div>
    );
}

export default BuscarProducto;