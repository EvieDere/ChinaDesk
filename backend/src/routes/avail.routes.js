const express = require('express');
const { addprodav, readav, updav, deleteprodav } = require('../controllers/avail.controller')
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//Post /api/avail/add-product
router.post('/add-product', auth, requireRole("admin"), addprodav);


//Get /api/avail/read-inv
router.get('/read-inv', auth, requireRole("admin"), readav);


//Put /api/avail/:id
router.put('/:id', auth, requireRole("admin"), updav);


//Delete /api/avail/:id
router.delete("/:id", auth, requireRole("admin"), deleteprodav);

module.exports = router;