const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

// **Lista clienti**
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// **Dettaglio di un cliente per ID**
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// **Creazione di un nuovo cliente**
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nome, email e password sono obbligatori" });
    }

    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ error: "Email già in uso" });
    }

    const customer = await Customer.create({ name, email, password });
    res.status(201).json({ message: "Cliente creato con successo", customer });
  } catch (error) {
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// **Eliminazione di un cliente**
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Customer.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }
    res.json({ message: "Cliente eliminato con successo" });
  } catch (error) {
    res.status(500).json({ error: "Errore interno del server" });
  }
});

module.exports = router;
