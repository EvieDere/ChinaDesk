const { body } = require("express-validator");

const createPV = [
    body("name").notEmpty().isString().withMessage("Introduce el nombre del paquete."),
    body("price").notEmpty().isFloat({ min: 0}).withMessage("Introduce el precio del paquete.")
];

const updatePV = [
    body("name").isString().withMessage("Nombre de paquete inválido."),
    body("price").isFloat({ min: 0}).withMessage("El precio debe ser un número mayor a 0.")
];

module.exports = { createPV, updatePV };