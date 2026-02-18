const express = require('express');
const { addprodav, readinv, updinv, deleteprodinv } = require('../controllers/inventory.controllers')

const router = express.Router();

//Post
router.post('/add-product', addprodav);


//Get
router.get('/read-inv', readinv);


//Put
router.put('/:id', updinv);


//Delete
router.delete("/:id", deleteprodinv);

module.exports = router;