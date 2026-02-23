const express = require('express');
const { addproduct, readproducts, updateproducts, deleteproducts } = require("../controllers/menu.controllers")
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//Post /api/menu/add-product
router.post('/add-product', auth, requireRole("admin"), addproduct);

//Get /api/menu/read-products
router.get('/read-products', auth, requireRole("admin"), readproducts);

//Put /api/menu/:id
router.put('/:id', auth, requireRole("admin"), updateproducts);

//Delete /api/menu/:id
router.delete("/:id", auth, requireRole("admin"), deleteproducts);

module.exports = router;