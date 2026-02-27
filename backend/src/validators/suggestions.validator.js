const { body } = require("express-validator");

const addingSugg = [
    body("user").notEmpty().isString().withMessage("Introduce un usuario."),
    body("suggestion").notEmpty().isString().withMessage("Escribe tu sugerencia.")
];

module.exports = { addingSugg };