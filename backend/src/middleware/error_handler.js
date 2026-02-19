//_Lógica para procesar errores

module.exports = function errorHandler(err, req, res, next) {
    console.error(err);

    if(err?.name == "CastError") {
        return res.status(400).json({ error: "ID inválido"})
    }

    const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    return res.status(500).json({ error: err.message || "Error Interno del Servidor"});
}