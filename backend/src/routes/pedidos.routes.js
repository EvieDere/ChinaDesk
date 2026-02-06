const express = require('express');
const User = require('../models/User');

const router = express.Router(); // encargado de direccionar

router.post('/make-order', async (req, res) => {
    const userId = req.body.userId;
    
    if (!userId) {
        return res.status(401).json({ error: "Es necesario iniciar sesión" });
    }
});

module.exports = router;