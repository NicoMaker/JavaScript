import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// Configurazione ambiente
dotenv.config();

// Configurazione Express
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurazione Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_PORT === '465', // true per 465, false per altri porti
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verifica la configurazione del trasportatore
transporter.verify(function (error, success) {
  if (error) {
    console.log('Errore nella configurazione del server email:', error);
  } else {
    console.log('Server email pronto per inviare messaggi');
  }
});

// API endpoint per l'invio delle email
app.post('/api/send-email', async (req, res) => {
  try {
    const {
      nome,
      cognome,
      indirizzo,
      codiceFiscale,
      dataNascita,
      comune,
      provincia,
      telefono,
      email
    } = req.body;

    // Formatta la data di nascita
    const formattedDate = new Date(dataNascita).toLocaleDateString('it-IT');
    const registrationDate = new Date().toLocaleString('it-IT');

    // Crea il contenuto HTML dell'email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #4f46e5; text-align: center;">Conferma di Registrazione</h2>
        <p>Gentile <strong>${nome} ${cognome}</strong>,</p>
        <p>grazie per esserti registrato. Di seguito trovi i dati che hai fornito:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Nome:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${nome}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Cognome:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${cognome}</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Indirizzo:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${indirizzo}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Codice Fiscale:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${codiceFiscale}</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Data di Nascita:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Comune:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${comune}</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Provincia:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${provincia}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Telefono:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${telefono}</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${email}</td>
          </tr>
        </table>
        
        <p>Data di registrazione: <strong>${registrationDate}</strong></p>
        <p>Grazie per la tua registrazione!</p>
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280;">
          <p>&copy; 2025 Sistema di Registrazione. Tutti i diritti riservati.</p>
        </div>
      </div>
    `;

    // Configura l'email
    const mailOptions = {
      from: `"Sistema di Registrazione" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Conferma registrazione',
      html: htmlContent
    };

    // Invia l'email
    await transporter.sendMail(mailOptions);

    // Risposta di successo
    res.status(200).json({ success: true, message: 'Email inviata con successo' });
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    res.status(500).json({ success: false, message: 'Errore nell\'invio dell\'email', error: error.message });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});