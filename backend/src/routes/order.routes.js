const express = require('express');
const Orders = require('../models/Orders');
const router = express.Router(); 
const auth = require('../middleware/auth');
router.use(auth);

router.post('/make-order', async (req, res) => {
    const { product, productPrice, stew, drink, drinkPrice, totalPrice, arrivalTime  } = req.body;

    if (product === undefined || productPrice === undefined || stew === undefined || drink === undefined || drinkPrice === undefined || totalPrice === undefined || arrivalTime === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "All fields must be provided"});
    }

    if (typeof product !== "string") { 
        return res.status(400).json({error: "product must be a string"});
    }
    if (typeof productPrice !== "number") { 
        return res.status(400).json({error: "productPrice must be a number"});
    }
    if (typeof stew !== "string") {
        return res.status(400).json({error: "stew must be a string"});
    }
    if (typeof drink !== "string") { 
        return res.status(400).json({error: "drink must be a string"});
    }
    if (typeof drinkPrice !== "number") {
        return res.status(400).json({error: "drinkPrice must be a number"});
    }
    if (typeof totalPrice !== "number") { 
        return res.status(400).json({error: "totalPrice must be a number"});
    }
    if (typeof arrivalTime !== "string") { 
        return res.status(400).json({error: "arrivalTime must be a string"});
    }

    const od = await Orders.create({ product, productPrice, stew, drink, drinkPrice, totalPrice, arrivalTime });
    return res.status(201).json({od});
});

router.get('/read-Orders', async (req, res) => {
    const ord = await Orders.find(); 
    return res.status(200).json(ord);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { product, productPrice, stew, drink, drinkPrice, totalPrice, arrivalTime} = req.body;

    const orde = await Orders.find();
    const indexO = orde.findIndex((t) => t.id === id);
    if (indexO === -1) return res.status(404).json({ error: "ID not found" });

    //Validación para que ambos campos no sean nulos
    if (product === undefined || productPrice === undefined || stew === undefined || drink === undefined || drinkPrice === undefined || totalPrice === undefined || arrivalTime === undefined) {
        return res.status(400).json({ error: "All fields must be provided" });
    }

    if (typeof product !== "string") { 
        return res.status(400).json({error: "product must be a string"});
    }
    orde[indexO].product = product.trim();

    if (typeof productPrice !== "number") { 
        return res.status(400).json({error: "productPrice must be a number"});
    }
    orde[indexO].productPrice = productPrice;

    if (typeof stew !== "string") {
        return res.status(400).json({error: "stew must be a string"});
    }
    orde[indexO].stew = stew.trim();

    if (typeof drink !== "string") { 
        return res.status(400).json({error: "drink must be a string"});
    }
    orde[indexO].drink = drink.trim();

    if (typeof drinkPrice !== "number") {
        return res.status(400).json({error: "drinkPrice must be a number"});
    }
    orde[indexO].drinkPrice = drinkPrice;

    if (typeof totalPrice !== "number") { 
        return res.status(400).json({error: "totalPrice must be a number"});
    }
    orde[indexO].totalPrice = totalPrice;

    if (typeof arrivalTime !== "string") { 
        return res.status(400).json({error: "arrivalTime must be a string"});
    }
    orde[indexO].arrivalTime = arrivalTime;

    orde[indexO].updatedAt = new Date().toISOString();

    const UpdatedS = await Orders.findByIdAndUpdate({_id: id}, {product: product, productPrice: productPrice, stew: stew, drink: drink, drinkPrice: drinkPrice, totalPrice: totalPrice, arrivalTime: arrivalTime})
    return res.status(200).json(orde[indexO]);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const delO = await Orders.findOneAndDelete({ _id: id });
    if (!delO) {
        return res.status(404).json({ error: "Order not found" });
    }

    res.status(204).send({error: "Order deleted succesfully"});
});



module.exports = router;