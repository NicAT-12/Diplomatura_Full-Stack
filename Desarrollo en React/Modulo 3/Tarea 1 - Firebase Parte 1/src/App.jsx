import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";

function App() {
  const [loading, setLoading] = useState(true);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState("");
  const [quantityFiles, setQuantityFiles] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        setSuccessful(true);
        console.log(querySnapshot);
        setQuantityFiles(querySnapshot.size);
      } catch (fail) {
        setError(fail.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  let contenido;

  if (loading) {
    contenido = <h2 className="text-slate-300 text-lg">Cargando...</h2>;
  } else if (successful) {
    contenido = (
      <h3 className="text-green-400 text-lg font-medium">
        {`Conexión exitosa, se encontraron ${quantityFiles} documentos`}
      </h3>
    );
  } else if (error !== "") {
    contenido = <h3 className="text-red-400 text-lg font-medium">{error}</h3>;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-sky-400 text-2xl font-bold mb-4 text-center">
        Verificación de conexión con la base de datos
      </h1>
      {contenido}
    </div>
  );
}

export default App;