const Product = require("../models/Products");

async function create (req, res, next) {
    const {
        name,
        category,
        price,
        stock = 0,
        description = "",
        isActive = true } =req.body;

    const product = await Product.create({
        name,
        category,
        price,
        stock,
        description,
        isActive
    });

    res.status(201).json(product);
};

//Get api/products?page&limit&search&category&sort
async function list (req, res, next) {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1); //Cada página de la lista va a tomar un formato de número en base a 10

    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 100);

    const skip = (page - 1) * limit;



    const search = (req.query.search || "").trim();

    const category = (req.query.category || "").trim();

    const sort = (req.query.sort || "-price").trim();

    const filter = {};
    if (category) filter.category = category;
    if(search) filter.name = {$regex: search, $options: "i"};

    const [items, total] = await Promise.all([
        Product.find(filter).sort(sort).skip(skip).limit(limit),
        Product.countDocuments(filter)
    ]);

    res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        items
    });
};

async function getById (req, res, next){
    const { id } = req.params;

    const product = await Product.findById(id);

    if(!product) {
        res.status(404);
        return next(new Error("Producto no encontrado"));
    }
    res.json(product);
};

async function update (req, res, next) {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!product) {
        res.status(404);
        return next(new Error("Producto no encontrado"));
    }
    res.json(product);
};

async function remove (req, res, next) {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        res.status(404);
        return next(new Error("Producto no encontrado"));
    }
    res.json({ ok: true });
};

module.exports = { create, list, getById, update, remove };