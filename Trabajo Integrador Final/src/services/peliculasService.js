import { getDocs, collection, deleteDoc, doc, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export async function obtenerPeliculas() {
    const querySnapshot = await getDocs(collection(db, "peliculas"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function obtenerPeliculaPorId(id) {
    try {
        const docRef = doc(db, 'peliculas', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const peli = { id: docSnap.id, ...docSnap.data() };
            return peli
        } else {
            return false
        }

    } catch (error) {
        console.error("Error al traer la pelicula", error)
        return false
    }
}

export async function eliminarPelicula(id) {
    try {
        const peliRef = doc(db, "peliculas", id);

        await deleteDoc(peliRef);

        console.log("Pelicula eliminada con éxito");

        return true;
    } catch (error) {
        console.error("Error al eliminar la pelicula: ", error);

        return false;
    }
}

export async function crearPelicula(peli) {
    try {
        const docRef = await addDoc(collection(db, 'peliculas'), peli);
        return docRef.id;
    } catch (error) {
        console.error('Error al agregar el documento: ', error);
        return false
    }
}

export async function editarPelicula(id, peliSinId) {
    try {
        const docRef = doc(db, 'peliculas', id);
        await updateDoc(docRef, peliSinId);
        return true;
    } catch (error) {
        console.error("Error al editar ", error);
        return false;
    }
}