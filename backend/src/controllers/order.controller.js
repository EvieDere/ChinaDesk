const Orders = require('../models/Orders');

//POST /api/order/make-order
async function makeorder (req, res, next) {
    const { drinksIDQ } = req.body;

    const package = req.package;
    const addon = req.addon;
    const stew = req.stew;
    const drink = req.drink;
    const payMS = req.payMS;

    let totalPD = 0;
    let drinkNames = [];

    for (const d of drinksIDQ) {

    const foundDrink = drink.find(item =>
        item._id.toString() === d.id
    );

    if (!foundDrink) {
        return res.status(400).json({
            error: "Bebida no encontrada en validación"
        });
    }

    const quantity = Number(d.quantity);

    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: "Cantidad inválida." });
    }

    if (foundDrink.stock < quantity) {
        return res.status(400).json({
            error: `Stock insuficiente para ${foundDrink.name}`
        });
    }

    totalPD += foundDrink.price * quantity;

    drinkNames.push({ drk: foundDrink, quantity });
}

    for (const item of drinkNames) {
        item.drk.stock -= item.quantity;
        await item.drk.save();
    }

    const time = 15;
    const arrTime = new Date(Date.now() + time * 60 * 1000);

    const total = package.price + totalPD;

    const drkNames = drinkNames.map(item =>
        `${item.drk.name} x${item.quantity}`
    );

    const od = await Orders.create(
        {
            package: package.name,
            packagePrice: package.price,
            addon: addon.name,
            stews: stew.map(item => item.name),
            drinks: drkNames,
            drinkPrice: totalPD,
            total: total,
            payM: payMS,
            arrivalTime: arrTime
        });
    return res.status(201).json({od});
};

async function readorder (req, res, next) {
    const or = await Orders.find(); //Find busca los registros del modelo (orders)
    return res.status(200).json(or);
};

module.exports = { makeorder, readorder };