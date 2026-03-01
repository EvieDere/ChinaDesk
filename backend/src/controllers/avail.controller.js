const Avail = require('../models/Avail');

async function addprodav (req, res, next) {
    const { name, availability, type } = req.body;
    
    if (name === undefined || availability === undefined || type === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Todos los campos deben de llenarse"});
    }

    const existe = await Avail.findOne({ name }); //findOne busca una sola coincidencia
    if (existe) return res.status(400).json({error: "Producto ya existe"});

    if (typeof availability !== "boolean") { //Validación para que availability sea valor booleano
        return res.status(400).json({error: "La disponibilidad debe ser un dato booleano"});
    }

    if (typeof name !== "string") {
        return res.status(400).json({ error: "El nombre del producto debe ser una cadena de texto" });
    }

    const av = await Avail.create({ name, availability, type });
    return res.status(201).json({av});
};

async function readav (req, res, next) {
    const avl = await Avail.find(); //Find busca los registros del modelo (Avail)
    return res.status(200).json(avl);
};

async function updav (req, res, next) {
    const { id } = req.params;
    const { name, availability, type } = req.body;

    if (name === undefined || availability === undefined || type === undefined) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (typeof name !== "string") {
            return res.status(400).json({ error: "El nombre del producto debe ser una cadena de texto" });
    }

    if (typeof availability !== "boolean") {
        return res.status(400).json({error: "La disponibilidad debe ser un dato booleano"});
    }

    if (typeof type !== "string") {
        return res.status(400).json({ error: "El tipo del producto debe ser una cadena de texto" });
    }

    const UpdatedA = await Avail.findByIdAndUpdate(
        id,
        {
            name: name.trim().toLowerCase(),
            availability: availability,
            type: type.trim().toLowerCase()
        },
        { new: true, runValidators: true }
    );

    if (!UpdatedA) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(UpdatedA);
};

async function deleteprodav (req, res, next) {
    const { id } = req.params;

    const delI = await Avail.findOneAndDelete({ _id: id });
    if (!delI) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(204).send({error: "Producto eliminado exitosamente"});
};

module.exports = { addprodav, readav, updav, deleteprodav };