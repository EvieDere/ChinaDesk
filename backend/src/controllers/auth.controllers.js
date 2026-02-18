//Rutas de auth y lógica de negocio

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require("../models/Session");

//const router = express.Router(); // encargado de direccionar

function cookieOptions() {
    return {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    }
}

//Llamar metodos HTTP y logica necesaria para interpretarlos

async function register (req, res, next) {
    const{ email, password } = req.body; //desempaqueta en email y pswd

    if (!email || !password) {
        return res.status(400).json({error: "email y password son requeridos"}); //Mensajes genéricos para no batallar
    }

    //ya que realizó la validación, verificaremos el usuario dentro de la base
    const exists = await User.findOne({ email }); //findOne busca una sola coincidencia
    if (exists) return res.status(409).json({error: "Usuario no válido"})

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, role: "user" });

    return res.status(200).json(
        {
            id: user._id,
            email: user.email,
            role: user.role
        }); //fetch desde la tabla (muestra el valor)
};

async function login (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "email y password son requeridos" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Credenciales no válidas" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

    const expiredMinutes = 10;
    const expiresAt = new Date(Date.now() + expiredMinutes * 60 * 1000);

    const session = await Session.create(
        {
            userId: user._id,
            expiresAt
        }
    );

    const token = jwt.sign(
        {
            sub: String(user._id),
            email: user.email,
            role: user.role,
            sid: String(session._id)
        },
        process.env.JWT_SECRET,
        { expiresIn: `${expiredMinutes}m`}
    );

    // return res.status(201).json({ jwt_token: token });
    res
    .cookie("access_token", token, cookieOptions())
    .cookie("session_id", String(session._id), cookieOptions())
    .json({ ok: true});
};

async function logout(req, res, next) {
    const sessionId = req.cookies?.sessionId;

    if(sessionId) {
        await Session.findByIdAndUpdate(sessionId, { revokedAt: new Date() })
    }

    res
        .clearCookie("access_token", cookieOptions())
        .clearCookie("session_id", cookieOptions())
        .json({ ok: true});
};

async function me(req, res) {
    res.json(req.user);
};

module.exports = { register, login, logout, me };