const express = require('express');
const { addsugg, readsuggs } = require('../controllers/suggestions.controller');
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");
const { addingSugg } = require("../validators/suggestions.validator");

const router = express.Router();

//POST /api/suggest/add-sugg
router.post('/add-sugg', auth, requireRole("user"), addingSugg, addsugg);

//GET /api/order/read-orders
router.get('/read-sugg', auth, requireRole("user", "admin"), readsuggs);

module.exports = router;