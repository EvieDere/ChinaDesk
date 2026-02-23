const mongoose = require('mongoose');

const SuggestionsSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        suggestion: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Suggestions', SuggestionsSchema);