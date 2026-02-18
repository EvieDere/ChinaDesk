const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        price: {
            type: Number,
            required: true
        }
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Menu', MenuSchema);