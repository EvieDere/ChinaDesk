const { body, query } = require("express-validator");

const createProductValidator = [
    body("name").isString().notEmpty().withMessage("Nombre del producto requerido"),
    body("category").isString().notEmpty().withMessage("Categoría del producto requerida"),
    body("price").isFloat({ min: 0 }).withMessage("El precio debe ser mayor a 0"),
    body("stock").optional().isInt( { min: 0 }).withMessage("Introduce la cantidad de stock"),
    body("description").optional().isString().withMessage("Introduce descripcion"),
    body("isActive").optional().isBoolean().withMessage("Introduce un valor válido")
];

const updateProductValidator = [
    body("name").optional().isString().notEmpty().withMessage("Nombre inválido"),
    body("category").optional().isString().notEmpty().withMessage("Categoría inválida"),
    body("price").optional().isFloat({ min: 0 }).withMessage("Precio inválido"),
    body("stock").optional().isInt( { min: 0 }).withMessage("Stock inválido"),
    body("description").optional().isString().withMessage("Descripción inválida"),
    body("isActive").optional().isBoolean().withMessage("Valor inválido")
];

const listProductsValidator = [
    query("page").optional().isInt({ min: 1 }).withMessage("Página inválida"),
    query("limit").optional().isInt({ min: 1, max: 300 }).withMessage("Limite inválido"),
    query("search").optional().isString().withMessage("Búsqueda inválida"),
    query("category").optional().isString().withMessage("Categoría inválida"),
    query("sort").optional().isString().withMessage("Ordenamiento inválido")
];

module.exports = {
    createProductValidator,
    updateProductValidator,
    listProductsValidator
};