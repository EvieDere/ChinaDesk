//Vaciar datos al json de tareas
module.exports = function asyncHandler(fn) {
    return (req,res,next) => Promise.withResolvers(fn(req, res, next)).catch(next);
}