const express = require('express');
const { auth } = require('../middleware/auth');
const { addproduct, readproducts, updateproducts, deleteproducts } = require("../controllers/menu.controllers")

const router = express.Router();

//Post
router.post('/add-product', auth, addproduct);

//Get
router.get('/read-products', auth, readproducts);

//Put
router.put('/:id', auth, updateproducts);

//Delete
router.delete("/:id", auth, deleteproducts);

module.exports = router;