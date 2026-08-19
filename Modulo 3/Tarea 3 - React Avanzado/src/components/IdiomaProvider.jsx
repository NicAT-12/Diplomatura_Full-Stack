import { useState, useMemo, useCallback } from "react";
import  IdiomaContext  from "./IdiomaContext";

const IdiomaProvider = ({ children }) => {
    const [idioma, setIdioma] = useState("esp");

    const cambiarIdioma = useCallback((nuevoIdioma) => {
        setIdioma(nuevoIdioma)
    }, [setIdioma])

    const value = useMemo(() => {
        return { idioma, cambiarIdioma };
    }, [idioma, cambiarIdioma]);

    return (
        <IdiomaContext.Provider value={value}>
            {children}
        </IdiomaContext.Provider>
    );
}

export default IdiomaProvider;