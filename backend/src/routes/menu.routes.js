const express = require('express');
const { addproduct, readproducts, updateproducts, deleteproducts } = require("../controllers/menu.controllers")

const router = express.Router();

//Post
router.post('/add-product', addproduct);

//Get
router.get('/read-products', readproducts);

//Put
router.put('/:id', updateproducts);

//Delete
router.delete("/:id", deleteproducts);

module.exports = router;