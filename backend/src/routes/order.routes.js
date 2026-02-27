const express = require('express');
const { makeorder, readorder } = require('../controllers/order.controller')
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");
const { IDValidate } = require('../middleware/IDvalidation');

const router = express.Router();

//POST /api/order/make-order
router.post('/make-order', auth, requireRole("user"), IDValidate, makeorder);

//GET /api/order/read-orders
router.get('/read-orders', auth, requireRole("admin"), readorder);

module.exports = router;