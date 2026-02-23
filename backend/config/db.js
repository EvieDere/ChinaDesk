const mongoose = require('mongoose');

async function connectDB() {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI no está configurado");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");
}

module.exports = { connectDB };