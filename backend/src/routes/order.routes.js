const express = require('express');
const { makeorder, readorder, updorder, deleteorder } = require('../controllers/order.controllers')

const router = express.Router();

router.post('/make-order', makeorder);

router.get('/read-orders', readorder);

router.put('/:id', updorder);

router.delete("/:id", deleteorder);

module.exports = router;