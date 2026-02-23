require('dotenv').config();
const app = require("./src/app");
const { connectDB } = require("./config/db");

async function start() {
    const port = process.env.PORT || 3000
    if (!process.env.JWT_SECRET) throw new Error ("JWT_SECRET no configurado");
    await connectDB();
    app.listen(port, () => console.log(`API exitosamente ejecutada http://localhost:${port}`));
}

start().catch((err) => {
    console.error("Error al iniciar", err.message);
    process.exit(1);
});