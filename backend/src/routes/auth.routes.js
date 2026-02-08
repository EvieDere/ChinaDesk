//Rutas de auth y lógica de negocio

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router(); // encargado de direccionar

//Llamar metodos HTTP y logica necesaria para interpretarlos

router.post('/register', async (req, res) => {
    const{ email, password } = req.body; //desempaqueta en email y pswd

    if (!email || !password) {
        return res.status(400).json({error: "email y password son requeridos"}); //Mensajes genéricos para no batallar
    }

    //ya que realizó la validación, verificaremos el usuario dentro de la base
    const exists = await User.findOne({ email }); //findOne busca una sola coincidencia

    if (exists) return res.status(409).json({error: "Usuario no válido"})

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, passwordHash });

    return res.status(200).json({ jwt_token: token }); //fetch desde la tabla (muestra el valor)

});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "email y password son requeridos" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Credenciales no válidas" });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

        const token = jwt.sign(
            { sub: String(user.id), email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.status(200).json({ jwt_token: token });

    } catch (err) {
        return res.status(200).json({
    token: token,
    jwt_token: token
})
    }
});


module.exports = router;