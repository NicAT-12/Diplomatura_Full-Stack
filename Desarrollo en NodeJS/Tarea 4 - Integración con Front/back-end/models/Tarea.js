const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    descripcion: {
        type: String
    },
    completada: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Tarea', tareaSchema);