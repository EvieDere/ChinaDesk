const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        package: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        
        packagePrice: {
            type: Number,
            required: true
        },

        addon: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        stews:[
            {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            }
        ],

        drinks: [
            {
                type: String,
                required: true,
                trim: true,
                lowercase: true
            }
        ],

        drinkPrice: {
            type: Number,
            required: true
        },

        total: {
            type: Number,
            required: true
        },

        payM: {
            type: String,
            required: true
        },

        arrivalTime: {
            type: Date,
            required: true
        }
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Orders', OrderSchema);