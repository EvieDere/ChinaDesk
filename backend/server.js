const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const tareasRoutes = require('./src/routes/tareas.routes');
const errorHandler = require('./src/middleware/error_handler');

const orderRoutes = require('./src/routes/order.routes');
const productsRoutes = require('./src/routes/products.routes');
const stewRoutes = require('./src/routes/stew.routes');

const app = express();

app.use(cors());
app.use(express.json()); //Ayuda a 'interpretar' el json



//Health check: ayuda a saber si no la regamos al levantar el servidor
app.get('/health', (req, res) => {
    res.json({  ok: true, ts: new Date().toISOString()});
});



//Routes (definir rutas)
app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/stew", stewRoutes);


//En caso de que no llamamos a Health y API
//Empty Error
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});



//Error Handler
app.use(errorHandler);



async function start() {
    const port = process.env.PORT || 3000

    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI no está configurado");
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET no configurado");

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado");

    app.listen(port, () => console.log(`API exitosamente ejecutada http://localhost:${port}`));
};

start().catch((err) => {
    console.error("Error al iniciar", err.message);
    process.exit(1);
});

