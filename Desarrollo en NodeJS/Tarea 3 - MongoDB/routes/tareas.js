const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

router.post('/', async (req, res) => {
    try {
        const tarea = await Tarea.create(req.body);
        res.status(201).json(tarea);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});

router.get('/', async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'ID inválido' });
        }
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: 'after',
            runValidators: true
        });
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'ID inválido' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ mensaje: 'Tarea eliminada', tarea });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'ID inválido' });
        }
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

module.exports = router;