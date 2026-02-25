const express = require('express');
const { addDrink, readDrinks, updateDrink, deleteDrink } = require("../controllers/drinks.controller")
const { requireRole } = require("../middleware/requireRole");
const { auth } = require("../middleware/auth");

const router = express.Router();

//Post /api/drinks/add-drink
router.post('/add-drink', auth, requireRole("admin"), addDrink);

//Get /api/drinks/read-drinks
router.get('/read-drinks', auth, requireRole("admin"), readDrinks);

//Put /api/drinks/:id
router.put('/:id', auth, requireRole("admin"), updateDrink);

//Delete /api/drinks/:id
router.delete("/:id", auth, requireRole("admin"), deleteDrink);

module.exports = router;