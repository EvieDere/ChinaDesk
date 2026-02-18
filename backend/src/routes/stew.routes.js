const express = require('express');
const Stew = require('../models/Stew');
const auth = require('../middleware/auth');

const router = express.Router();

//router.use(auth);

//Post
router.post('/create-stew', async (req, res) => {
    const { stew, availability } = req.body;
    
    if (stew === undefined || availability === undefined) { //Validación para que el producto no sea nulo
        return res.status(400).json({error: "Both fields need to be filled out"});
    }

    const existe = await Stew.findOne({ stew }); //findOne busca una sola coincidencia
    if (existe) return res.status(400).json({error: "Stew already exists"});

    if (typeof availability !== "boolean") { //Validación para que availability sea valor booleano
        return res.status(400).json({error: "Availability must be a boolean"});
    }

    const sw = await Stew.create({ stew, availability });
    return res.status(201).json({sw});
});


//Get
router.get('/read-stew', async (req, res) => {
    const sws = await Stew.find(); //Find busca los registros del modelo (stew)
    return res.status(200).json(sws);
});


//Put
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { stew, availability } = req.body;

    const stw = await Stew.find();
    const indexS = stw.findIndex((t) => t.id === id);
    if (indexS === -1) return res.status(404).json({ error: "ID not found" });

    //Validación para que ambos campos no sean nulos
    if (stew === undefined || availability === undefined) {
        return res.status(400).json({ error: "Both stew and availability must be provided" });
    }

    const existe = await Stew.findOne({ stew });
    if (existe) return res.status(400).json({error: "Stew already exists"});

    if (typeof stew != "string" || !stew.trim()) {
            return res.status(400).json({ error: "Stew must be a string" });
    }
    stw[indexS].stew = stew.trim();

    if (typeof availability != "boolean") {
        return res.status(400).json({error: "Availability must be a boolean"});
    }
    stw[indexS].availability = availability;
    stw[indexS].updatedAt = new Date().toISOString();

    const UpdatedS = await Stew.findByIdAndUpdate({_id: id}, {stew: stew, availability: availability})
    return res.status(200).json(stw[indexS]);
});


//Delete
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const delS = await Stew.findOneAndDelete({ _id: id });
    if (!delS) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send({error: "Product deleted succesfully"});
});

module.exports = router;