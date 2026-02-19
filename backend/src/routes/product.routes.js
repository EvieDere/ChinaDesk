const express = require("express");

// Middlewares
const { auth } = require("../middleware/auth");
const { requireRole } = require("../middleware/requireRole");
const { validate } = require("../middleware/validate");

// Validators
const {
    createProductValidator,
    updateProductValidator,
    listProductsValidator
} = require("../validators/product.validator");

// Controllers
const productController = require("../controllers/product.controller");

const router = express.Router();

// Public Routes
router.get("/", listProductsValidator, validate, productController.list);
router.get("/:id", productController.getById);

//Protected Routes - authentication
router.post("/", auth, createProductValidator, validate, productController.create);
router.put("/:id", auth, updateProductValidator, validate, productController.update);

// Role Based Routes
router.delete("/:id", auth, requireRole("admin"), productController.remove);

module.exports = router;