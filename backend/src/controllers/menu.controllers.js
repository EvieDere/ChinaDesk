const Menu = require('../models/Menu');

async function addproduct (req, res, next) {
    const { product, price } = req.body;
    
    if (product === undefined || price === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Both fields need to be filled out"});
    }

    const exists = await Menu.findOne({ product }); //findOne busca una sola coincidencia
    if (exists) return res.status(400).json({error: "Product already exists"})

    if (typeof price !== "number") { //Validación para que el precio sea un número
        return res.status(400).json({error: "Price must be a number"});
    }

    const ps = await Menu.create({ product, price });
    return res.status(201).json({ps});
};

async function readproducts (req, res, next) {
    const me = await Menu.find(); //Find busca los registros del modelo (productos)
    return res.status(200).json(me);
};

async function updateproducts (req, res, next) {
    const { id } = req.params;
    const { product, price } = req.body;

    const men = await Menu.find();
    const indexM = men.findIndex((t) => t.id === id);
    if (indexM === -1) return res.status(404).json({ error: "Product not found" });

    //Validación para que product o price no sean nulos
    if (product === undefined || price === undefined) {
        return res.status(400).json({ error: "Both product and price must be provided" });
    }

    if (typeof product != "string" || !product.trim()) {
            return res.status(400).json({ error: "Product must be a string" });
    }
    men[indexM].product = product.trim();
    

    if (typeof price != "number") {
        return res.status(400).json({error: "Price must be a number"});
    }
    men[indexM].price = price;

    men[indexM].updatedAt = new Date().toISOString();

    const UpdatedP = await Menu.findByIdAndUpdate({_id: id}, {product: product, price: price})
    return res.status(200).json(men[indexM]);
};

async function deleteproducts (req, res, next) {
    const { id } = req.params;

    const del = await Menu.findOneAndDelete({ _id: id });
    if (!del) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send({error: "Product deleted succesfully"});
};

module.exports = { addproduct, readproducts, updateproducts, deleteproducts };