const Inventory = require('../models/Inventory');

async function addprodav (req, res, next) {
    const { product, availability } = req.body;
    
    if (product === undefined || availability === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Ambos campos deben de llenarse"});
    }

    const existe = await Inventory.findOne({ product }); //findOne busca una sola coincidencia
    if (existe) return res.status(400).json({error: "Producto ya existe"});

    if (typeof availability !== "boolean") { //Validación para que availability sea valor booleano
        return res.status(400).json({error: "La disponibilidad debe ser un dato booleano"});
    }

    const inv = await Inventory.create({ product, availability });
    return res.status(201).json({inv});
};

async function readinv (req, res, next) {
    const iny = await Inventory.find(); //Find busca los registros del modelo (Inventory)
    return res.status(200).json(iny);
};

async function updinv (req, res, next) {
    const { id } = req.params;
    const { product, availability } = req.body;

    const inve = await Inventory.find();
    const indexI = inve.findIndex((t) => t.id === id);
    if (indexI === -1) return res.status(404).json({ error: "ID no encontrado" });

    //Validación para que ambos campos no sean nulos
    if (product === undefined || availability === undefined) {
        return res.status(400).json({ error: "Ambos campos son requeridos" });
    }

    const existe = await Inventory.findOne({ product });
    if (existe) return res.status(400).json({error: "Producto ya existe"});

    if (typeof product != "string" || !product.trim()) {
            return res.status(400).json({ error: "El producto debe ser una cadena de texto" });
    }
    inve[indexI].product = product.trim();

    if (typeof availability != "boolean") {
        return res.status(400).json({error: "La disponibilidad debe ser un dato booleano"});
    }
    inve[indexI].availability = availability;
    inve[indexI].updatedAt = new Date().toISOString();

    const UpdatedI = await Inventory.findByIdAndUpdate({_id: id}, {product: product, availability: availability})
    return res.status(200).json(inve[indexI]);
};

async function deleteprodinv (req, res, next) {
    const { id } = req.params;

    const delI = await Inventory.findOneAndDelete({ _id: id });
    if (!delI) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(204).send({error: "Producto eliminado exitosamente"});
};

module.exports = { addprodav, readinv, updinv, deleteprodinv };