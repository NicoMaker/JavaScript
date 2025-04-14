require("dotenv").config(); // Carica le variabili da .env

const express = require("express");
const bodyParser = require("body-parser");
const { Telegraf } = require("telegraf");

const app = express();
const port = 3000;

// Inizializza il bot con il token dal file .env
const bot = new Telegraf(process.env.BOT_TOKEN);

// Variabile per memorizzare il chatId una volta ottenuto tramite /chatid
let chatId = null;

// Comando per ottenere il chatId
bot.command("chatid", (ctx) => {
  chatId = ctx.chat.id; // Salva il chatId per inviarlo in seguito
  console.log(`✅ Chat ID ricevuto: ${chatId}`);
  ctx.reply(`Il tuo Chat ID è: ${chatId}`);
});

// Avvia il bot
bot.launch();
console.log(
  "🤖 Bot avviato! Scrivigli su Telegram /chatid per ricevere il tuo chat ID"
);

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // per servire index.html

// Endpoint del form
app.post("/submit-form", (req, res) => {
  const dati = req.body;

  const messaggio =
    `📬 *Nuova registrazione:*\n\n` +
    `👤 *Nome:* ${dati.nome}\n` +
    `👤 *Cognome:* ${dati.cognome}\n` +
    `📞 *Cellulare:* ${dati.cellulare}\n` +
    `🏠 *Indirizzo:* ${dati.indirizzo}\n` +
    `🆔 *Codice Fiscale:* ${dati.cf}\n` +
    `📧 *Email:* ${dati.email}\n` +
    `📍 *Provincia:* ${dati.provincia}`;

  // Controlla se il chatId è stato recuperato
  if (chatId) {
    bot.telegram
      .sendMessage(chatId, messaggio, { parse_mode: "Markdown" })
      .then(() => res.send("✅ Dati inviati con successo!"))
      .catch((err) => {
        console.error("❌ Errore Telegram:", err);
        res.status(500).send("Errore nell'invio dei dati.");
      });
  } else {
    res
      .status(400)
      .send(
        "❌ Chat ID non ancora disponibile. Usa il comando /chatid nel bot."
      );
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`🚀 Server in ascolto su http://localhost:${port}`);
});
