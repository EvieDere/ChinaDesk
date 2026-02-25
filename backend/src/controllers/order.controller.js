const Orders = require('../models/Orders');
const Packages = require('../models/Packages');
const Avail = require('../models/Avail');
const Drinks = require('../models/Drinks');

//POST /api/order/make-order
async function makeorder (req, res, next) {
    const { productID, drinkID, addonID, stewID, payMS  } = req.body;

    const product = await Packages.findById(productID);
    const addon = await Avail.findById(addonID);
    const stew = await Avail.find({
        _id: { $in: stewID }
    });
    const drink = await Drinks.find({
        _id: { $in: drinkID }
    });
        

    if (!product) {
        return res.status(404).json({error: "Producto no encontrado"});
    }

    if (!addon) {
        return res.status(404).json({error: "Complemento no encontrado"});
    }
    
    if (!stew.length) {
        return res.status(404).json({error: "Guiso(s) no encontrado(s)"});
    }

    if (!drink.length) {
        return res.status(404).json({error: "Guiso o Bebida no encontrada"});
    }
    
    if (!payMS) {
        return res.status(400).json({error: "Método de pago no proporcionado"});
    }


    const time = 15;
    const arrTime = new Date(Date.now() + time * 60 * 1000);

    let totalPD = 0;
    for (const item of drink) {
        totalPD += item.price;
    }

    const total = product.price + totalPD;

    const od = await Orders.create(
        {
            package: product.name,
            packagePrice: product.price,
            addon: addon.name,
            stews: stew.map(item => item.name),
            drinks: drink.map(item => item.name),
            drinksPrice: totalPD,
            total: total,
            payM: payMS,
            arrivalTime: arrTime
        });
    return res.status(201).json({od});
};

module.exports = { makeorder };