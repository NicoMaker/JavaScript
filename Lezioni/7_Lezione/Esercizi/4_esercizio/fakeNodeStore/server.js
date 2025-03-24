delete require.cache[require.resolve("./middleware/authMiddleware")];
console.log("Cache di authMiddleware.js cancellata!");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
console.log("Tipo di authenticate in server.js:", typeof authenticate); // <--- LOG DI DEBUG

const sequelize = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// **Collega le route ai rispettivi percorsi**
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/customers", customerRoutes);

//  **Stato del Backend**
app.get("/status", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "Backend is running", database: "Connected", timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: "Backend running", database: "Connection failed", error: error.message });
  }
});

//  **Avvio server**
const PORT = process.env.PORT || 8080;
// aggiunto il sync perchè nelle versioni più recenti di sequelize, di defult, non lo fa più in automatico
sequelize
  .sync({ force: false })
  .then(() =>
    app.listen(PORT, () => console.log(`Server in esecuzione su porta ${PORT}`))
  );