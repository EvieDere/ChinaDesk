const mongoose = require('mongoose');

const PackagesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        }
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Packages', PackagesSchema);