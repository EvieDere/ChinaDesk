// Encargado previamente a hacer validacion

const { body } = require("express-validator")

const registerValidator = [
    body("email").isEmail().withMessage("Introduce un email válido"),
    body("password").isLength({ min: 16 }).withMessage("Longitud mínima, 16 caracteres")
];

const loginValidator = [
    body("email").isEmail().withMessage("Introduce un email válido"),
    body("password").notEmpty().withMessage("Introduce la contraseña")
];

module.exports = { registerValidator, loginValidator };