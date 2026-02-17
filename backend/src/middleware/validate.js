//Validaciones, retroalimentacion, etc

const{ validationResults } = require("express-validator");

//Next hace continuación al algoritmo
function validate(req, res, next){
    const result = validationResults(req);

    if (validationResults.isEmpty()) {
        res.status(400);
        return next(new Error(result.array().map(e => e.msg).join(", ")));
    }
    next();
}

module.exports = { validate };