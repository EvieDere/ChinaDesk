const mongoose = require('mongoose');

const AvailSchema = new mongoose.Schema(
    {
        name : {
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

module.exports = mongoose.model('Avail', AvailSchema);