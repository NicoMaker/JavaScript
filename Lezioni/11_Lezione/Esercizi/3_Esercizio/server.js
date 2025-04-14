require("dotenv").config(); // Carica variabili dal file .env
const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Per ricevere dati dal form

const BOT_TOKEN = process.env.BOT_TOKEN;

// Route per ricevere i dati dal form
app.post("/submit-form", async (req, res) => {
  const { nome, cognome, cellulare, indirizzo, cf, email, provincia } =
    req.body;

  // Crea il messaggio da inviare su Telegram
  const messaggio = `
📋 Dati ricevuti:
👤 Nome: ${nome}
👤 Cognome: ${cognome}
📞 Cellulare: ${cellulare}
🏠 Indirizzo: ${indirizzo}
🧾 Codice Fiscale: ${cf}
📧 Email: ${email}
📍 Provincia: ${provincia}
`;

  // Invia i dati a Telegram
  try {
    await sendMessageToTelegram(messaggio);
    res.send("Dati inviati correttamente a Telegram!");
  } catch (error) {
    console.error("Errore invio dati a Telegram:", error);
    res.status(500).send("Errore nell'invio dei dati a Telegram");
  }
});

// Funzione per inviare il messaggio a Telegram
async function sendMessageToTelegram(text) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: "@YOUR_CHANNEL_OR_CHAT_ID", text }), // Usa @nomecanale o un chat_id diretto
      }
    );

    const data = await response.json();
    console.log("Risposta di Telegram:", data);
  } catch (error) {
    console.error("Errore invio messaggio a Telegram:", error);
  }
}

// Imposta la porta del server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
