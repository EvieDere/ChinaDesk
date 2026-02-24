const Orders = require('../models/Orders');
const Menu = require('../models/Menu');
const Inventory = require('../models/Inventory');

//POST /api/order/make-order
async function makeorder (req, res, next) {
    const { productID, drinkID, addonID, sdID  } = req.body;

    const product = await Menu.findById(productID);
    const drink = await Menu.findById(drinkID);
    const addon = await Inventory.findById(addonID);
    const food = await Inventory.find({
        _id: { $in: sdID }
    });

    if (!product) {
        return res.status(404).json({error: "Producto no encontrado"});
    }

    if (!drink) {
        return res.status(404).json({error: "Guiso o Bebida no encontrada"});
    }

    if (!addon) {
        return res.status(404).json({error: "Complemento no encontrado"});
    }

    if (!food) {
        return res.status(404).json({error: "Guiso(s) no encontrado(s)"});
    }

    const total = product.price + drink.price;

    const time = 15;
    const arrTime = new Date(Date.now() + time * 60 * 1000);

    const od = await Orders.create(
        {
            product: product.product,
            productPrice: product.price,
            addon: addon.product,
            stew: food.map(item => item.product),
            drink: drink.product,
            drinkPrice: drink.price,
            totalPrice: total,
            arrivalTime: arrTime
        });
    return res.status(201).json({od});
};

module.exports = { makeorder };