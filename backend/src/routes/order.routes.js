const express = require('express');
const { auth } = require('../middleware/auth');
const { makeorder, readorder, updorder, deleteorder } = require('../controllers/order.controllers')

const router = express.Router();

router.post('/make-order', auth, makeorder);

router.get('/read-orders', auth, readorder);

router.put('/:id', auth, updorder);

router.delete("/:id", auth, deleteorder);

module.exports = router;