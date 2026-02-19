const express = require('express');
const { makeorder, readorder, updorder, deleteorder } = require('../controllers/order.controllers')
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post('/make-order', auth, requireRole("admin"), makeorder);

router.get('/read-orders', auth, requireRole("admin"), readorder);

router.put('/:id', auth, requireRole("admin"), updorder);

router.delete("/:id", auth, requireRole("admin"), deleteorder);

module.exports = router;