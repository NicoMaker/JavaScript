const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Campi obbligatori" });

    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) return res.status(400).json({ error: "Email già in uso" });

    const customer = await Customer.create({ name, email, password });
    res.json({ message: "Cliente registrato", customer });
  } catch (error) {
    res.status(500).json({ error: "Errore interno" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });

    if (!customer || !(await bcrypt.compare(password, customer.password))) return res.status(401).json({ error: "Credenziali errate" });

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Errore interno" });
  }
});

module.exports = router;
