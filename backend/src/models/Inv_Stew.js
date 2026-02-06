const mongoose = require('mongoose');

const StewSchema = new mongoose.Schema(
    {
        stew: {
            type: String,
            required: true,
            unique: true,
            trim: true, //elimina espacios
        },
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('StewInfo', StewSchema);