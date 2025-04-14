require("dotenv").config(); // Carica variabili dal file .env
const express = require("express");
const fetch = require("node-fetch"); // Assicurati di avere node-fetch installato
const app = express();

// Carica il BOT_TOKEN dal file .env
const BOT_TOKEN = process.env.BOT_TOKEN;

// Imposta Express per servire i file statici
app.use(express.static("public"));
app.use(express.json()); // Per poter leggere il body JSON

// Route per ricevere i messaggi da Telegram (Webhook)
app.post("/webhook", async (req, res) => {
  const update = req.body;

  // Verifica che il messaggio contenga il comando /start
  if (update.message && update.message.text === "/start") {
    const chatId = update.message.chat.id;

    // Risposta del bot al comando /start
    const welcomeMessage = "Benvenuto! Ora invierò i dati che hai richiesto.";
    await sendMessageToTelegram(chatId, welcomeMessage);

    // Invia i dati subito dopo il comando /start
    const messaggio = `
📋 Dati ricevuti:
👤 Nome: Mario
📞 Cellulare: 1234567890
🏠 Indirizzo: Via Roma, 123
🧾 Codice Fiscale: RSSMRA80A01H501Z
📧 Email: mario.rossi@email.it
📍 Provincia: Roma
    `;
    await sendMessageToTelegram(chatId, messaggio);

    return res.status(200).send("Messaggi inviati.");
  }

  // Risposta per altre interazioni
  res.sendStatus(200);
});

// Funzione per inviare messaggi tramite Telegram
async function sendMessageToTelegram(chatId, text) {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      }
    );

    const data = await response.json();
    console.log("Risposta di Telegram:", data);

    if (data.ok) {
      console.log("Messaggio inviato con successo!");
    } else {
      console.error("Errore Telegram:", data.description);
    }
  } catch (error) {
    console.error("Errore invio Telegram:", error);
  }
}

// Imposta il webhook per ricevere i messaggi da Telegram
app.post("/set-webhook", async (req, res) => {
  const webhookUrl = "https://tuo-dominio.com/webhook"; // Sostituisci con il tuo URL pubblico
  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${webhookUrl}`
  );
  const data = await response.json();
  if (data.ok) {
    res.send("Webhook impostato correttamente!");
  } else {
    res.status(500).send("Errore nell'impostare il webhook");
  }
});

// Imposta la porta del server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
