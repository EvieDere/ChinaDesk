//_Lógica para procesar errores

module.exports = function errorHandler(err, req, res, next) {
    console.error(err);

    if(err?.name == "CastError") {
        return res.status(400).json({ error: "ID inválido"})
    }

    return res.status(500).json({ error: "Error Interno del Servidor"});
}