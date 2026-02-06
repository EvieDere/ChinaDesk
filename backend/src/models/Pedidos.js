const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userID: ObjectID,
        product: [
            {
                productID: ObjectID,
                costo: Number
            }
        ],
        stew: [
            {
                stewID: ObjectID
            }
        ],
        total: Number,
        arrivalTime: Date
    },
    
    { timestamps: true}
);

module.exports = mongoose.model('Orders', OrderSchema);