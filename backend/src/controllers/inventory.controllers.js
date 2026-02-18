const Inventory = require('../models/Inventory');

async function addprodav (req, res, next) {
    const { product, availability } = req.body;
    
    if (product === undefined || availability === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Both fields need to be filled out"});
    }

    const existe = await Inventory.findOne({ product }); //findOne busca una sola coincidencia
    if (existe) return res.status(400).json({error: "Product already exists"});

    if (typeof availability !== "boolean") { //Validación para que availability sea valor booleano
        return res.status(400).json({error: "Availability must be a boolean"});
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
    if (indexI === -1) return res.status(404).json({ error: "ID not found" });

    //Validación para que ambos campos no sean nulos
    if (product === undefined || availability === undefined) {
        return res.status(400).json({ error: "Both product and availability must be provided" });
    }

    const existe = await Inventory.findOne({ product });
    if (existe) return res.status(400).json({error: "Product already exists"});

    if (typeof product != "string" || !product.trim()) {
            return res.status(400).json({ error: "Product must be a string" });
    }
    inve[indexI].product = product.trim();

    if (typeof availability != "boolean") {
        return res.status(400).json({error: "Availability must be a boolean"});
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
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send({error: "Product deleted succesfully"});
};

module.exports = { addprodav, readinv, updinv, deleteprodinv };