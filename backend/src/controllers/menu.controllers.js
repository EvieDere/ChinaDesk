 const Menu = require('../models/Menu');

async function addproduct (req, res, next) {
    const { product, price } = req.body;
    
    if (product === undefined || price === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Ambos campos deben de llenarse."});
    }

    const exists = await Menu.findOne({ product }); //findOne busca una sola coincidencia
    if (exists) return res.status(400).json({error: "El producto ya existe"})

    if (typeof price !== "number") { //Validación para que el precio sea un número
        return res.status(400).json({error: "El precio debe ser un número"});
    }

    const ps = await Menu.create({ product, price });
    return res.status(201).json({ps});
};

async function readproducts (req, res, next) {
    const me = await Menu.find(); //Find busca los registros del modelo (menu)
    return res.status(200).json(me);
};

async function updateproducts (req, res, next) {
    const { id } = req.params;
    const { product, price } = req.body;

    const men = await Menu.find();
    const indexM = men.findIndex((t) => t.id === id);
    if (indexM === -1) return res.status(404).json({ error: "Producto no encontrado" });

    //Validación para que product o price no sean nulos
    if (product === undefined || price === undefined) {
        return res.status(400).json({ error: "Introduce un producto o precio" });
    }

    if (typeof product != "string" || !product.trim()) {
            return res.status(400).json({ error: "El producto debe ser una cadena de texto" });
    }
    men[indexM].product = product.trim();
    

    if (typeof price != "number") {
        return res.status(400).json({error: "El precio debe ser un número"});
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
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(204).send({error: "Producto eliminado exitosamente"});
};

module.exports = { addproduct, readproducts, updateproducts, deleteproducts };