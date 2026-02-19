const express = require('express');
const { addprodav, readinv, updinv, deleteprodinv } = require('../controllers/inventory.controllers')
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//Post
router.post('/add-product', auth, requireRole("admin"), addprodav);


//Get
router.get('/read-inv', auth, requireRole("admin"), readinv);


//Put
router.put('/:id', auth, requireRole("admin"), updinv);


//Delete
router.delete("/:id", auth, requireRole("admin"), deleteprodinv);

module.exports = router;