import { useState, useEffect } from "react";
import { signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Login = () => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user
                ? setUser(user)
                : setUser(null);
        });

        return unsubscribe;
    }, []);

    const handleLogin = async () => {
        try {
            await signInAnonymously(auth);
        } catch (error) {
            console.error("Anonymous auth error:", error);
        }
    };

    const handleLogOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    let contenido;

    if (user === undefined) {
        contenido = <p className="text-sm text-gray-500 animate-pulse">cargando...</p>;
    } else if (user === null) {
        contenido = (
            <button
                onClick={() => handleLogin()}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
                Iniciar Sesión
            </button>
        );
    } else {
        contenido = (
            <button
                onClick={() => handleLogOut()}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors"
            >
                Cerrar Sesión
            </button>
        );
    }

    return (
        <div className="flex items-center justify-end p-4">
            {contenido}
        </div>
    );
}

export default Login;