const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
    {
        product : {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        availability: {
            type: Boolean,
            required: true
        }
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Inventory', InventorySchema);