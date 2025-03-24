const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Errore interno" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.create({ name, price });
    res.json({ message: "Prodotto creato", product });
  } catch (error) {
    res.status(500).json({ error: "Errore interno" });
  }
});

module.exports = router;
