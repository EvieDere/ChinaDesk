const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        
        productPrice: {
            type: Number,
            required: true
        },

        stew: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        drink: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        drinkPrice: {
            type: Number,
            required: true
        },

        totalPrice: {
            type: Number,
            required: true
        },

        arrivalTime: {
            type: String,
            required: true
        }
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Orders', OrderSchema);