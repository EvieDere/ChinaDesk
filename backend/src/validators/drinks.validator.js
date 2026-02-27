const { body } = require("express-validator");

const createDV = [
    body("name").notEmpty().isString().withMessage("Nombre de bebida requerido."),
    body("stock").notEmpty().isInt({ min: 0 }).withMessage("Introduce la cantidad de stock."),
    body("price").notEmpty().isFloat({ min: 0 }).withMessage("Introduce el precio de la bebida.")
];

const updateDV = [
    body("name").isString().withMessage("Nombre de bebida inválido."),
    body("stock").isInt({ min: 0 }).withMessage("El stock debe ser un número mayor a 0."),
    body("price").isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor a 0.")
];

module.exports = { createDV, updateDV };