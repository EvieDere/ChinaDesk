//Validaciones, retroalimentacion, etc
const { validationResult } = require("express-validator");

//Next hace continuación al algoritmo
function validate (req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400);
        return next(new Error(result.array().map(e => e.msg).join(", ")));
    }
    next();
}

module.exports = { validate };