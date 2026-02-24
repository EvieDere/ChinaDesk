const express = require('express');
const { makeorder, readorder } = require('../controllers/order.controllers')
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//POST /api/order/make-order
router.post('/make-order', auth, requireRole("user"), makeorder);

//GET /api/order/read-orders
//router.get('/read-orders', auth, requireRole("user", "admin"), readorder);

//PUT /api/order/:id
//router.put('/:id', auth, requireRole("user"), updorder);

//GET /api/order/:id
//router.delete("/:id", auth, requireRole("user"), deleteorder);

module.exports = router;