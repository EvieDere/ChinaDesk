const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

// Importación de rutas (Asegúrate de que estos archivos existan en src/routes/)
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/error_handler');

const inventoryRoutes = require('./routes/inventory.routes');
const menuRoutes = require('./routes/menu.routes');
const orderRoutes = require('./routes/order.routes');
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());

// Manejo de errores global
app.use(errorHandler);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.use("/api/order", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/menu", menuRoutes);

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