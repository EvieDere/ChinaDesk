const Packages = require('../models/Packages');
const Avail = require('../models/Avail');
const Drinks = require('../models/Drinks');


//ID validacion por existencias en modelos
async function IDValidate (req, res, next) {
    const { packageID, drinksIDQ, addonID, stewID, payMS  } = req.body;

    
    const package = await Packages.findById(packageID);
    const addon = await Avail.findById(addonID);
    const stew = await Avail.find({
        _id: { $in: stewID }
    });

    const drinkIDs = drinksIDQ.map(d => d.id);
    
    const drink = await Drinks.find({
        _id: { $in: drinkIDs }
    });
        

    if (!package) {
        return res.status(404).json({error: "Paquete no encontrado"});
    }

    if (!addon) {
        return res.status(404).json({error: "Complemento no encontrado"});
    }
    
    if (!stew.length) {
        return res.status(404).json({error: "Guiso(s) no encontrado(s)"});
    }

    if (drink.length !== drinkIDs.length) {
        return res.status(404).json({ error: "Una o más bebidas no existen."});
    }
    
    if (!payMS) {
        return res.status(400).json({error: "Método de pago no proporcionado"});
    }
    
    req.package = package;
    req.addon = addon;
    req.stew = stew;
    req.drink = drink;
    req.payMS = payMS;

    next();
};

module.exports = { IDValidate };