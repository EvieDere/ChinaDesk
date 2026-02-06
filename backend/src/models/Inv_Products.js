const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            required: true,
            unique: true,
            trim: true, //elimina espacios
            lowercase: true //convierte a minúsculas
        },

        costo: {
            type: String,
            required: true
        }
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Inventory', ProductSchema);