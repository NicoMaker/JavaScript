const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const Order = require("../models/Order");
const Product = require("../models/Product");

console.log("authenticate importato come:", typeof authenticate); // <--- LOG DI DEBUG


const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const order = await Order.create({ customer_id: req.customerId, product_id, quantity });
    res.json({ message: "Ordine creato", order });
  } catch (error) {
    res.status(500).json({ error: "Errore interno" });
  }
});

module.exports = router;
