const express = require('express');
const { addprodav, readinv, updinv, deleteprodinv } = require('../controllers/inventory.controllers')
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//Post /api/inventory/add-product
router.post('/add-product', auth, requireRole("admin"), addprodav);


//Get /api/inventory/read-inv
router.get('/read-inv', auth, requireRole("admin"), readinv);


//Put /api/inventory/:id
router.put('/:id', auth, requireRole("admin"), updinv);


//Delete /api/inventory/:id
router.delete("/:id", auth, requireRole("admin"), deleteprodinv);

module.exports = router;