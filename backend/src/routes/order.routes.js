const express = require('express');
const { makeorder, readorder, updorder, deleteorder } = require('../controllers/order.controllers')
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post('/make-order', auth, requireRole("user"), makeorder);

router.get('/read-orders', auth, requireRole("user"), readorder);

router.put('/:id', auth, requireRole("user"), updorder);

router.delete("/:id", auth, requireRole("user"), deleteorder);

module.exports = router;