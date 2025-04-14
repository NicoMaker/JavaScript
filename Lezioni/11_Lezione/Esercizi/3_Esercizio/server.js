const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();

const BOT_TOKEN = "TUO_BOT_TOKEN";
const CHAT_ID = "TUO_CHAT_ID";

app.use(express.static("public"));
app.use(express.json());

app.post("/send-message", async (req, res) => {
  const {
    nome,
    cognome,
    cellulare,
    indirizzo,
    codiceFiscale,
    email,
    provincia,
  } = req.body;

  const messaggio = `
📋 Nuova registrazione:
👤 Nome: ${nome} ${cognome}
📞 Cellulare: ${cellulare}
🏠 Indirizzo: ${indirizzo}
🧾 Codice Fiscale: ${codiceFiscale}
📧 Email: ${email}
📍 Provincia: ${provincia}
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: messaggio }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      res.sendStatus(200);
    } else {
      res.status(500).send("Errore Telegram");
    }
  } catch (error) {
    console.error("Errore invio Telegram:", error);
    res.status(500).send("Errore server");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
