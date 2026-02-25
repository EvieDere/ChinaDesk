const Drinks = require('../models/Drinks');

async function addDrink (req, res, next) {
    const { name, stock, price } = req.body;

    if (name === undefined || stock === undefined || price === undefined) {
        return res.status(400).json({error: "Todos los campos son requeridos."});
    }

    const exists = await Drinks.findOne({ name });
    if (exists) return res.status(400).json({error: "La bebida ya existe"});

    if (typeof name !== "string") {
        return res.status(400).json({error: "El nombre de la bebida debe ser una cadena de texto"});
    }

    if (typeof stock !== "number" || typeof price !== "number") {
        return res.status(400).json({error: "El stock y el precio deben ser números"});
    }

    const dr = await Drinks.create({ name, stock, price });
    return res.status(201).json({dr});
};

async function readDrinks (req, res, next) {
    const drk = await Drinks.find();
    return res.status(200).json(drk);
};

async function updateDrink (req, res, next) {
    const { id } = req.params;
    const { name, stock, price } = req.body;

    if (name === undefined || stock === undefined || price === undefined) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (typeof name !== "string") {
        return res.status(400).json({ error: "El nombre de la bebida debe ser una cadena de texto" });
    }

    if (typeof stock !== "number" || typeof price !== "number") {
        return res.status(400).json({ error: "El stock y el precio deben ser números" });
    }

    const UpdatedD = await Drinks.findByIdAndUpdate(
        id,
        {
            name: name.trim().toLowerCase(),
            stock: stock,
            price: price
        },
        { new: true, runValidators: true }
    );

    if (!UpdatedD) {
        return res.status(404).json({ error: "Bebida no encontrada" });
    }

    return res.status(200).json(UpdatedD);
};

async function deleteDrink (req, res, next) {
    const { id } = req.params;

    const del = await Drinks.findByIdAndDelete(id);
    if (!del) {
        return res.status(404).json({ error: "Bebida no encontrada" });
    }

    return res.status(200).json({ message: "Bebida eliminada exitosamente" });
};

module.exports = { addDrink, readDrinks, updateDrink, deleteDrink };
