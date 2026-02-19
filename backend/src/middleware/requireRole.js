// Para ver si requiere o no un rol

// '...' significa (un arreglo) que va a leer una serie de varios roles, no está limitado a uno solo
function requireRole (...roles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401);
            return next(new Error("No Autenticado"))
        }
        if(!roles.includes(req.user.role)) {
            res.status(403);
            return next(new Error("No Autorizado"))
        }

        next();
    };
}

module.exports = { requireRole };