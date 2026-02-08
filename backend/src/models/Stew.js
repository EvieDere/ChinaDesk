const mongoose = require('mongoose');

const StewSchema = new mongoose.Schema(
    {
        stew: {
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

module.exports = mongoose.model('Stew', StewSchema);