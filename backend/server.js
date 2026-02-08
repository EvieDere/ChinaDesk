const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Importación de rutas (Asegúrate de que estos archivos existan en src/routes/)
const authRoutes = require('./src/routes/auth.routes');
const tareasRoutes = require('./src/routes/tareas.routes');
const orderRoutes = require('./src/routes/order.routes');
const errorHandler = require('./src/middleware/error_handler');
const stewRoutes = require('./src/routes/stew.routes');

const app = express();

const router = express.Router();
router.get('/', (req, res) => res.json({ ok: true }));
module.exports = router;

// Middlewares
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());


app.use(express.static(__dirname));

// Health check
app.get('/health', (req, res) => {
    res.json({ ok: true, ts: new Date().toISOString() });
});

// Ruta principal: Carga promocional
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Promocional.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/stew", stewRoutes);


// Manejo de 404
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores global
app.use(errorHandler);

async function start() {
    const port = process.env.PORT || 3000;

    try {
        if (!process.env.MONGODB_URI) throw new Error("Falta MONGODB_URI en .env");
        if (!process.env.JWT_SECRET) throw new Error("Falta JWT_SECRET en .env");

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Conectado a MongoDB");

        app.listen(port, () =>
            console.log(`Servidor activo en: http://localhost:${port}`
        ));
    } catch (err) {
        console.error("❌ Error al iniciar:", err.message);
        process.exit(1);
    }
}

start().catch((err) => {
    console.error("Error al iniciar", err.message);
    process.exit(1);
});

