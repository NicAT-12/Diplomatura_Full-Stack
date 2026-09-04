import { useContext } from "react";
import IdiomaContext from "./IdiomaContext";

const SelectorIdioma = () => {
    const { cambiarIdioma } = useContext(IdiomaContext);

    return (
        <div className="flex justify-center gap-3 py-4">
            <button
                onClick={() => cambiarIdioma("esp")}
                className="px-4 py-2 rounded-full bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
            >
                Español
            </button>
            <button
                onClick={() => cambiarIdioma("eng")}
                className="px-4 py-2 rounded-full bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
            >
                English
            </button>
            <button
                onClick={() => cambiarIdioma("por")}
                className="px-4 py-2 rounded-full bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
            >
                Português
            </button>
        </div>
    );
}

export default SelectorIdioma;