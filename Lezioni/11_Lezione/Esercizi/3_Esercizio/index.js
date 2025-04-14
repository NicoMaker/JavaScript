
const express = require("express");
const bodyParser = require("body-parser");
const { Telegraf } = require("telegraf");

const app = express();
const port = 3000;

// Inserisci il tuo token e chat ID
const bot = new Telegraf("INSERISCI_IL_TUO_TOKEN_BOT");
const chatId = "INSERISCI_CHAT_ID";

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/submit-form", (req, res) => {
  const dati = req.body;
  const messaggio = `Nuova registrazione:\n
Nome: ${dati.nome}
Cognome: ${dati.cognome}
Cellulare: ${dati.cellulare}
Indirizzo: ${dati.indirizzo}
Codice Fiscale: ${dati.cf}
Email: ${dati.email}
Provincia: ${dati.provincia}`;

  bot.telegram.sendMessage(chatId, messaggio)
    .then(() => res.send("Dati inviati con successo!"))
    .catch((err) => {
      console.error("Errore Telegram:", err);
      res.status(500).send("Errore nell'invio dei dati.");
    });
});

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
