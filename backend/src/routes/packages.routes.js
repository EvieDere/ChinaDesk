const express = require('express');
const { addproduct, readproducts, updateproducts, deleteproducts } = require("../controllers/packages.controller")
const { createPV, updatePV } = require("../validators/packages.validator");
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//Post /api/packages/add-product
router.post('/add-product', auth, requireRole("admin"), createPV, addproduct);

//Get /api/packages/read-products
router.get('/read-products', auth, requireRole("admin"), readproducts);

//Put /api/packages/:id
router.put('/:id', auth, requireRole("admin"), updatePV, updateproducts);

//Delete /api/packages/:id
router.delete("/:id", auth, requireRole("admin"), deleteproducts);

module.exports = router;