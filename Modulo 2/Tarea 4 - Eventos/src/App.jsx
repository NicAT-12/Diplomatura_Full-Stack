import { useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { onBlur: rhfOnBlurName, onChange: rhfOnChangeName, ...restName } = register("nombre", { required: "Este campo es obligatorio" });
  const { onBlur: rhfOnBlurEmail, onChange: rhfOnChangeEmail, ...restEmail } = register("email", { required: "Este campo es obligatorio" });

  function onSubmit(data) {
    console.log(data);
  };

  function handleFocus(e) {
    console.log(`Campo "${e.target.id}" enfocado`);
  }

  function handleBlur(e) {
    console.log(`Campo "${e.target.id}" desenfocado`);
  }

  function combinedChangeName(e) {
    rhfOnChangeName(e);
    console.log(e.target.value);
  }

  function combinedChangeEmail(e) {
    rhfOnChangeEmail(e)
    console.log(e.target.value);
  }

  function combinedBlurName(e) {
    rhfOnBlurName(e)
    handleBlur(e)
  }

  function combinedBlurEmail(e) {
    rhfOnBlurEmail(e)
    handleBlur(e)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      console.log(`Se presionó Enter en el campo "${e.target.id}"`);
    }
  }

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Formulario
          </h1>
          <p className="text-slate-500 mt-2">
            Completá los datos para continuar.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-slate-700"
          >
            Nombre
          </label>

          <input
            id="nombre"
            type="text"
            placeholder="Ingresá tu nombre"
            {...restName}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onBlur={combinedBlurName}
            onChange={(e) => combinedChangeName(e)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {errors.nombre && <span>{errors.nombre.message}</span>}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            type="text"
            placeholder="Ingresá tu email"
            {...restEmail}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onBlur={combinedBlurEmail}
            onChange={(e) => combinedChangeEmail(e)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <button
          type="submit"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-95"
        >
          {isHovered ? "¡Enviar ahora!" : "Enviar"}
        </button>
      </form>
    </main>
  );
};

export default App;