export function validarPelicula(peli) {
    const errores = { titulo: null, anio: null, genero: null }

    if (!peli.titulo.trim()) {
        errores.titulo = "El título es obligatorio"
    }

    if (!peli.anio || peli.anio === 0) {
        errores.anio = "El año es obligatorio"
    }

    if (!peli.genero.trim()) {
        errores.genero = "El género es obligatorio"
    }

    return {
        valido: errores.titulo === null && errores.anio === null && errores.genero === null,
        errores
    }
}