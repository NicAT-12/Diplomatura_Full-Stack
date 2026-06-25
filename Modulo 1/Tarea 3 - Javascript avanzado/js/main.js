class Tarea {
    constructor(id, titulo, completada) {
        this.id = id;
        this.titulo = titulo;
        this.completada = completada;
    }

    toggleEstado() {
        this.completada = !this.completada;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = [];
    }

    agregarTarea(titulo) {
        const nuevaTarea = new Tarea(Date.now(), titulo, false);

        this.tareas.push(nuevaTarea);
    }

    listarTareas() {
        this.tareas.forEach((tarea) => {
            console.log(tarea.titulo);
        });
    }

    buscarPorTitulo(titulo) {
        const tareaBuscada = this.tareas.find((tarea) =>
            tarea.titulo === titulo
        );

        return tareaBuscada;
    }

    listarCompletadas() {
        const tareasCompletadas = this.tareas.filter((tarea) =>
            tarea.completada === true
        );

        return tareasCompletadas;
    }
}

function cargarTareas() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                new Tarea(1, 'Estudiar', false),
                new Tarea(2, 'Ir a correr', false),
                new Tarea(3, 'Limpiar', false)
            ])
        }, 2000)
    });
}

async function main() {
    const tareas = await cargarTareas();

    const gestor = new GestorTareas();

    gestor.tareas = tareas;

    console.log("Tareas cargadas correctamente");

    gestor.listarTareas();

    gestor.agregarTarea("Hacer compras");

    gestor.listarTareas();

    const tarea = gestor.buscarPorTitulo('Estudiar');

    tarea.toggleEstado();

    const completadas = gestor.listarCompletadas();

    console.log("Completadas: ", completadas);
}

main();