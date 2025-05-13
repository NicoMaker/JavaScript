import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';

// Configurazione ambiente
dotenv.config();

// Configurazione Express
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assicurati che la directory del database esista
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Percorso del database SQLite
const dbPath = path.join(dbDir, 'registrazione.db');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Variabile per tenere traccia dello stato del database
let db = null;
let dbAvailable = false;

// Inizializzazione del database SQLite
async function setupDatabase() {
  try {
    // Apri la connessione al database (verrà creato se non esiste)
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    console.log('Connessione al database SQLite stabilita con successo');

    // Inizializza il database
    await initDatabase();

    return true;
  } catch (error) {
    console.error('Errore nella configurazione del database SQLite:', error);
    return false;
  }
}

// Inizializzazione del database
async function initDatabase() {
  try {
    // Crea la tabella utenti se non esiste
    await db.exec(`
      CREATE TABLE IF NOT EXISTS utenti (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cognome TEXT NOT NULL,
        indirizzo TEXT NOT NULL,
        codice_fiscale TEXT NOT NULL,
        data_nascita TEXT NOT NULL,
        comune TEXT NOT NULL,
        provincia TEXT NOT NULL,
        telefono TEXT NOT NULL,
        email TEXT NOT NULL,
        data_registrazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crea la tabella email se non esiste
    await db.exec(`
      CREATE TABLE IF NOT EXISTS email_inviate (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        utente_id INTEGER,
        oggetto TEXT NOT NULL,
        contenuto TEXT NOT NULL,
        data_invio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (utente_id) REFERENCES utenti(id) ON DELETE CASCADE
      )
    `);

    // Abilita il supporto per le chiavi esterne
    await db.exec('PRAGMA foreign_keys = ON');

    console.log('Database inizializzato con successo');
  } catch (error) {
    console.error('Errore durante l\'inizializzazione del database:', error);
    throw error;
  }
}

// Inizializza il database all'avvio
setupDatabase().then(available => {
  dbAvailable = available;
});

// Configurazione Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
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

// API endpoint per l'invio delle email e salvataggio dati
app.post('/api/send-email', async (req, res) => {
  let dbSaveSuccess = false;
  let dbId = null;

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

    // Salva nel database solo se disponibile
    if (dbAvailable && db) {
      try {
        // Inizia una transazione
        await db.exec('BEGIN TRANSACTION');

        // Inserisci l'utente nel database
        const result = await db.run(
          `INSERT INTO utenti (nome, cognome, indirizzo, codice_fiscale, data_nascita, comune, provincia, telefono, email)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [nome, cognome, indirizzo, codiceFiscale, dataNascita, comune, provincia, telefono, email]
        );

        dbId = result.lastID;

        // Salva l'email inviata nel database
        await db.run(
          `INSERT INTO email_inviate (utente_id, oggetto, contenuto)
           VALUES (?, ?, ?)`,
          [dbId, 'Conferma registrazione', htmlContent]
        );

        // Commit della transazione
        await db.exec('COMMIT');

        dbSaveSuccess = true;
        console.log('Dati salvati nel database con successo');
      } catch (dbError) {
        // Rollback in caso di errore
        await db.exec('ROLLBACK');
        console.error('Errore nel salvataggio nel database:', dbError);
        // Continuiamo comunque con l'invio dell'email
      }
    } else {
      console.log('Database non disponibile, i dati saranno salvati solo in localStorage');
    }

    // Configura l'email
    const mailOptions = {
      from: `"Sistema di Registrazione" <${process.env.EMAIL_USER || 'noreply@example.com'}>`,
      to: email,
      subject: 'Conferma registrazione',
      html: htmlContent
    };

    // Invia l'email solo se le credenziali sono configurate
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (emailError) {
        console.error('Errore nell\'invio dell\'email:', emailError);
        // Continuiamo comunque con la risposta
      }
    } else {
      console.log('Credenziali email non configurate, email non inviata');
    }

    // Risposta di successo
    res.status(200).json({
      success: true,
      message: emailSent ? 'Email inviata con successo' : 'Registrazione completata (email non inviata)',
      dbSaveSuccess,
      dbId
    });
  } catch (error) {
    console.error('Errore nella gestione della richiesta:', error);
    res.status(500).json({ success: false, message: 'Errore nella gestione della richiesta', error: error.message });
  }
});

// API per ottenere tutti gli utenti
app.get('/api/utenti', async (req, res) => {
  if (!dbAvailable || !db) {
    return res.status(503).json({
      success: false,
      message: 'Database non disponibile. Utilizzare localStorage.',
      dbAvailable: false
    });
  }

  try {
    const rows = await db.all(`
      SELECT u.*, 
             (SELECT COUNT(*) FROM email_inviate WHERE utente_id = u.id) AS email_count
      FROM utenti u
      ORDER BY u.data_registrazione DESC
    `);

    res.status(200).json({ success: true, data: rows, dbAvailable: true });
  } catch (error) {
    console.error('Errore nel recupero degli utenti:', error);
    res.status(500).json({ success: false, message: 'Errore nel recupero degli utenti', error: error.message });
  }
});

// API per ottenere le email inviate a un utente
app.get('/api/utenti/:id/email', async (req, res) => {
  if (!dbAvailable || !db) {
    return res.status(503).json({
      success: false,
      message: 'Database non disponibile. Utilizzare localStorage.',
      dbAvailable: false
    });
  }

  try {
    const { id } = req.params;
    const rows = await db.all(
      `SELECT * FROM email_inviate WHERE utente_id = ? ORDER BY data_invio DESC`,
      [id]
    );

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Errore nel recupero delle email:', error);
    res.status(500).json({ success: false, message: 'Errore nel recupero delle email', error: error.message });
  }
});

// API per eliminare un utente
app.delete('/api/utenti/:id', async (req, res) => {
  if (!dbAvailable || !db) {
    return res.status(503).json({
      success: false,
      message: 'Database non disponibile. Utilizzare localStorage.',
      dbAvailable: false
    });
  }

  try {
    const { id } = req.params;

    // Inizia una transazione
    await db.exec('BEGIN TRANSACTION');

    // Elimina l'utente (le email verranno eliminate automaticamente grazie al CASCADE)
    await db.run('DELETE FROM utenti WHERE id = ?', [id]);

    // Commit della transazione
    await db.exec('COMMIT');

    res.status(200).json({ success: true, message: 'Utente eliminato con successo' });
  } catch (error) {
    // Rollback in caso di errore
    await db.exec('ROLLBACK');
    console.error('Errore nell\'eliminazione dell\'utente:', error);
    res.status(500).json({ success: false, message: 'Errore nell\'eliminazione dell\'utente', error: error.message });
  }
});

// API per eliminare tutti gli utenti
app.delete('/api/utenti', async (req, res) => {
  if (!dbAvailable || !db) {
    return res.status(503).json({
      success: false,
      message: 'Database non disponibile. Utilizzare localStorage.',
      dbAvailable: false
    });
  }

  try {
    // Inizia una transazione
    await db.exec('BEGIN TRANSACTION');

    // Elimina tutte le email
    await db.run('DELETE FROM email_inviate');

    // Elimina tutti gli utenti
    await db.run('DELETE FROM utenti');

    // Commit della transazione
    await db.exec('COMMIT');

    res.status(200).json({ success: true, message: 'Tutti gli utenti sono stati eliminati con successo' });
  } catch (error) {
    // Rollback in caso di errore
    await db.exec('ROLLBACK');
    console.error('Errore nell\'eliminazione degli utenti:', error);
    res.status(500).json({ success: false, message: 'Errore nell\'eliminazione degli utenti', error: error.message });
  }
});

// API per verificare lo stato del database
app.get('/api/db-status', (req, res) => {
  res.status(200).json({
    dbAvailable,
    message: dbAvailable ? 'Database disponibile' : 'Database non disponibile. Utilizzando solo localStorage.'
  });
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});