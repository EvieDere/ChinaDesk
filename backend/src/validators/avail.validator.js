const { body } = require("express-validator");

const createAV = [
    body("name").notEmpty().isString().withMessage("Introduce el nombre del guiso."),
    body("availability").notEmpty().isBoolean().withMessage("Introduce la disponibilidad del guiso.")
];

const updateAV = [
    body("name").isString().withMessage("Nombre de guiso inválido."),
    body("availability").isBoolean().withMessage("La disponibilidad debe ser un valor booleano.")
];

module.exports = { createAV, updateAV };