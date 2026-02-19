const express = require('express');
const { addproduct, readproducts, updateproducts, deleteproducts } = require("../controllers/menu.controllers")
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//Post
router.post('/add-product', auth, requireRole("admin"), addproduct);

//Get
router.get('/read-products', auth, requireRole("admin"), readproducts);

//Put
router.put('/:id', auth, requireRole("admin"), updateproducts);

//Delete
router.delete("/:id", auth, requireRole("admin"), deleteproducts);

module.exports = router;