const Suggestions = require("../models/Suggestions");

async function addsugg (req, res, next) {
    const { user, suggestion } = req.body;
    
    if (user === undefined) {
        return res.status(400).json({error: "Introduce un usuario"});
    }

    if (suggestion === undefined) {
        return res.status(400).json({error: "Escribe tu sugerencia"});
    }

    if (typeof user !== "string" || typeof suggestion !== "string") { //Validación para que los campos sean un string
        return res.status(400).json({error: "La información debe ser una cadena de texto"});
    }

    const sug = await Suggestions.create({ user, suggestion });
    return res.status(201).json({sug});
};

async function readsuggs (req, res, next) {
    const su = await Suggestions.find(); //Find busca los registros del modelo (suggestions)
    return res.status(200).json(su);
};

module.exports = { addsugg, readsuggs };