const Orders = require('../models/Orders');

async function makeorder (req, res, next) {
    const { product, productPrice, stew, drink, drinkPrice, totalPrice, arrivalTime  } = req.body;

    if (product === undefined || productPrice === undefined || stew === undefined || drink === undefined || drinkPrice === undefined || totalPrice === undefined || arrivalTime === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Todos los campos son requeridos"});
    }

    if (typeof product !== "string") {
        return res.status(400).json({error: "Producto debe ser una cadena de texto"});
    }
    if (typeof productPrice !== "number") {
        return res.status(400).json({error: "El precio del producto debe ser un número"});
    }
    if (typeof stew !== "string") {
        return res.status(400).json({error: "El guiso debe ser una cadena de texto"});
    }
    if (typeof drink !== "string") {
        return res.status(400).json({error: "La bebida debe ser una cadena de texto"});
    }
    if (typeof drinkPrice !== "number") {
        return res.status(400).json({error: "El precio de la bebida debe ser un número"});
    }
    if (typeof totalPrice !== "number") {
        return res.status(400).json({error: "El total debe ser un número"});
    }
    if (typeof arrivalTime !== "string") {
        return res.status(400).json({error: "El tiempo de llegada debe ser una cadena de texto"});
    }

    const od = await Orders.create({ product, productPrice, stew, drink, drinkPrice, totalPrice, arrivalTime });
    return res.status(201).json({od});
};

async function readorder (req, res, next) {
    const ord = await Orders.find();
    return res.status(200).json(ord);
};

async function updorder (req, res, next) {
    const { id } = req.params;
    const { product, productPrice, stew, drink, drinkPrice, totalPrice, arrivalTime} = req.body;

    const orde = await Orders.find();
    const indexO = orde.findIndex((t) => t.id === id);
    if (indexO === -1) return res.status(404).json({ error: "ID no encontrado" });

    //Validación para que ambos campos no sean nulos
    if (product === undefined || productPrice === undefined || stew === undefined || drink === undefined || drinkPrice === undefined || totalPrice === undefined || arrivalTime === undefined) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (typeof product !== "string") { 
        return res.status(400).json({error: "Producto debe ser una cadena de texto"});
    }
    orde[indexO].product = product.trim();

    if (typeof productPrice !== "number") { 
        return res.status(400).json({error: "El precio del producto debe ser un número"});
    }
    orde[indexO].productPrice = productPrice;

    if (typeof stew !== "string") {
        return res.status(400).json({error: "El guiso debe ser una cadena de texto"});
    }
    orde[indexO].stew = stew.trim();

    if (typeof drink !== "string") { 
        return res.status(400).json({error: "La bebida debe ser una cadena de texto"});
    }
    orde[indexO].drink = drink.trim();

    if (typeof drinkPrice !== "number") {
        return res.status(400).json({error: "El precio de la bebida debe ser un número"});
    }
    orde[indexO].drinkPrice = drinkPrice;

    if (typeof totalPrice !== "number") { 
        return res.status(400).json({error: "El total debe ser un número"});
    }
    orde[indexO].totalPrice = totalPrice;

    if (typeof arrivalTime !== "string") { 
        return res.status(400).json({error: "El tiempo de llegada debe ser una cadena de texto"});
    }
    orde[indexO].arrivalTime = arrivalTime;

    orde[indexO].updatedAt = new Date().toISOString();

    const UpdatedS = await Orders.findByIdAndUpdate({_id: id}, {product: product, productPrice: productPrice, stew: stew, drink: drink, drinkPrice: drinkPrice, totalPrice: totalPrice, arrivalTime: arrivalTime})
    return res.status(200).json(orde[indexO]);
};

async function deleteorder (req, res, next) {
    const { id } = req.params;

    const delO = await Orders.findOneAndDelete({ _id: id });
    if (!delO) {
        return res.status(404).json({ error: "Orden no encontrada" });
    }

    res.status(204).send({error: "Orden eliminada exitosamente"});
};

module.exports = { makeorder, readorder, updorder, deleteorder };