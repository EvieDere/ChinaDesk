const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

// Importación de rutas (Asegúrate de que estos archivos existan en src/routes/)
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const errorHandler = require('./middleware/error_handler');
const stewRoutes = require('./routes/stew.routes');
const productRoutes = require('./routes/products.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Manejo de errores global
app.use(errorHandler);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/stew", stewRoutes);
app.use("/api/product", productRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json(
        {
            ok: true,
            ts: new Date().toISOString()
        }
    );
});

// Empty Error
app.use((req, res) => {
    res.status(404).json(
        {
            error: "Not Found"
        }
    );
});

module.exports = app;