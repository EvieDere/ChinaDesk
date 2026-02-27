const mongoose = require('mongoose');

const DrinksSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        stock: {
            type: Number,
            required: true,
            min: 0
        },
        
        price: {
            type: Number,
            required: true,
            min: 0
        }
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Drinks', DrinksSchema);