const express = require('express');
const { addprodav, readav, updav, deleteprodav } = require('../controllers/avail.controller')
const { createAV, updateAV } = require("../validators/avail.validator");
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//Post /api/avail/add-product
router.post('/add-product', auth, requireRole("admin"), createAV, addprodav);


//Get /api/avail/read-inv
router.get('/read-inv', auth, requireRole("admin", "user"), readav);


//Put /api/avail/:id
router.put('/:id', auth, requireRole("admin"), updateAV, updav);


//Delete /api/avail/:id
router.delete("/:id", auth, requireRole("admin"), deleteprodav);

module.exports = router;