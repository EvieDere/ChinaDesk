const Packages = require('../models/Packages');

async function addproduct (req, res, next) {
    const { name, price } = req.body;
    
    if (name === undefined || price === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Ambos campos deben de llenarse."});
    }

    const exists = await Packages.findOne({ name }); //findOne busca una sola coincidencia
    if (exists) return res.status(400).json({error: "El producto ya existe"})

    if (typeof price !== "number") { //Validación para que el precio sea un número
        return res.status(400).json({error: "El precio debe ser un número"});
    }

    const ps = await Packages.create({ name, price });
    return res.status(201).json({ps});
};

async function readproducts (req, res, next) {
    const pc = await Packages.find(); //Find busca los registros del modelo (packages)
    return res.status(200).json(pc);
};

async function updateproducts (req, res, next) {
    const { id } = req.params;
    const { name, price } = req.body;

    if (name === undefined || price === undefined) {
        return res.status(400).json({ error: "Introduce un nombre o precio" });
    }

    if (typeof name !== "string") {
            return res.status(400).json({ error: "El nombre del paquete debe ser una cadena de texto" });
    }

    if (typeof price !== "number") {
        return res.status(400).json({error: "El precio debe ser un número"});
    }

    const UpdatedP = await Packages.findByIdAndUpdate(
        id,
        {
            name: name.trim().toLowerCase(),
            price: price
        },
        { new: true, runValidators: true }
    );

    if (!UpdatedP) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(UpdatedP);
};

async function deleteproducts (req, res, next) {
    const { id } = req.params;

    const del = await Packages.findOneAndDelete({ _id: id });
    if (!del) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(204).send({ message: "Producto eliminado exitosamente" });
};

module.exports = { addproduct, readproducts, updateproducts, deleteproducts };