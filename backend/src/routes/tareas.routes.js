const express = require('express');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const store = require('../services/tareas_storage');

const router = express.Router();

// Realizar autenticación en cada ruta

router.use(auth); //Declaración principal para implementar authentication de rutas

//Declarar get para validar y leer tareas
router.get("/", asyncHandler(async (req, res) => { //Ruta raíz para obtener todas las tareas
    const tareas = await store.readAll();
    res.json(tareas);
})
);
// Post para crear tareas
router.post("/", asyncHandler(async (req, res) => {
    const { titulo, descripcion = "" } = req.body;
        if (!titulo || typeof titulo != "string" ||  !titulo.trim()) {
            return res.status(400).json({ error: "Introduce el título" });
        }

        const tareas = await store.readAll();

        const nueva_tarea = {
            id: crypto.randomUUID(),
            titulo: titulo.trim(),
            descripcion: typeof descripcion == "string" ? descripcion.trim() : "",
            completada: false,
            createdAt: new Date().toISOString()
        };

        tareas.push(nueva_tarea); //Agregar la nueva tarea al final de la lista de tareas
        await store.writeAll(tareas);

        res.status(201).json(nueva_tarea);
    })
);

//Actualizar tareas
router.put("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, completada } = req.body;

    const tareas = await store.readAll();
    const idx = tareas.findIndex((t) => t.id === id); // === significa que el id debe ser igual en tipo y valor

    if (idx === -1) return res.status(404).json({ error: "No se encontró la tarea" });

    //Algoritmo para actualizar

    if (titulo !== undefined) {
    if (typeof titulo != "string" || !titulo.trim()) {
            return res.status(400).json({ error: "Título inválido" });
    }
    tareas[idx].titulo = titulo.trim();
    }

    if (descripcion !== undefined) {
        if (typeof descripcion != "string") {
            return res.status(400).json({ error: "Descripción inválida" });
        }
        tareas[idx].descripcion = descripcion.trim();
    }

    //Validacion de status undefined
    if (completada !== undefined) {
        tareas[idx].completada = Boolean(completada);
    }

    tareas[idx].updatedAt = new Date().toISOString(); //Actualizar la fecha de actualización cada vez que se modifica una tarea
    
    await store.writeAll(tareas);
    res.json(tareas[idx]);

    })
);

//Delete eliminar tareas

router.delete("/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;

    const tareas = await store.readAll();
    const exists = tareas.some((t) => t.id === id);

    if (!exists) return res.status(404).json({ error: "Tarea no encontrada" });

    const updated = tareas.filter((t) => t.id !== id);

    await store.writeAll(updated);
    res.status(204).send();
})
);

module.exports = router;