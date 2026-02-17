//lectura de archivos

const fs = require('fs/promises')
const path = require('path')

//dirname: nombre directorio de modulo actual, el punto de partida
const filePath = path.join(__dirname, "..", "..", "data", "tareas.json") //del punto de par. de ese dir. pasa a src, backend, y  entra a data

async function readAll() {
    const raw = await fs.readFile(filePath, "utf-8");

    if(!raw.trim()) return [];
    return JSON.parse(raw);
}

async function writeAll(tareas) {
    await fs.writeFile(filePath, JSON.stringify(tareas, null, 2), "utf-8");
}

module.exports = { readAll, writeAll };