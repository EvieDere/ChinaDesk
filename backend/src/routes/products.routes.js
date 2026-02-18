const express = require('express');
const Products = require('../models/Products');
const auth = require('../middleware/auth');

const router = express.Router();

//router.use(auth);

//Post
router.post('/create-product', async (req, res) => {
    const { product, price } = req.body;
    
    if (product === undefined || price === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Both fields need to be filled out"});
    }

    const exists = await Products.findOne({ product }); //findOne busca una sola coincidencia
    if (exists) return res.status(400).json({error: "Product already exists"})

    if (typeof price !== "number") { //Validación para que el precio sea un número
        return res.status(400).json({error: "Price must be a number"});
    }

    const ps = await Products.create({ product, price });
    return res.status(201).json({ps});
});


//Get
router.get('/read-products', async (req, res) => {
    const products = await Products.find(); //Find busca los registros del modelo (productos)
    return res.status(200).json(products);
});


//Put
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { product, price } = req.body;

    const prods = await Products.find();
    const indexP = prods.findIndex((t) => t.id === id);
    if (indexP === -1) return res.status(404).json({ error: "Product not found" });

    //Validación para que product o price no sean nulos
    if (product === undefined || price === undefined) {
        return res.status(400).json({ error: "Both product and price must be provided" });
    }

    if (typeof product != "string" || !product.trim()) {
            return res.status(400).json({ error: "Product must be a string" });
    }
    product[indexP].product = product.trim();
    

    if (typeof price != "number") {
        return res.status(400).json({error: "Price must be a number"});
    }
    product[indexP].price = price;

    product[indexP].updatedAt = new Date().toISOString();

    const UpdatedP = await Products.findByIdAndUpdate({_id: id}, {product: product, price: price})
    return res.status(200).json(prods[indexP]);
});


//Delete
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const del = await Products.findOneAndDelete({ _id: id });
    if (!del) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send({error: "Product deleted succesfully"});
});

module.exports = router;