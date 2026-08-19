import { useContext } from "react";
import IdiomaContext from "./IdiomaContext";

const Header = () => {
    const { idioma } = useContext(IdiomaContext);

    return (
        <header className="bg-slate-800 text-white py-4 px-6 text-center">
            <p className="text-lg font-medium">Idioma actual: {idioma}</p>
        </header>
    );
}

export default Header;