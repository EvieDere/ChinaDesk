const express = require('express');
const { auth } = require('../middleware/auth');
const { addprodav, readinv, updinv, deleteprodinv } = require('../controllers/inventory.controllers')

const router = express.Router();

//Post
router.post('/add-product', auth, addprodav);


//Get
router.get('/read-inv', auth, readinv);


//Put
router.put('/:id', auth, updinv);


//Delete
router.delete("/:id", auth, deleteprodinv);

module.exports = router;