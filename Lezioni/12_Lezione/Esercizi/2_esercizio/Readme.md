# Sistema di Registrazione Utenti - Documentazione Tecnica

## Panoramica del Sistema

Il Sistema di Registrazione Utenti è un'applicazione web Node.js/Express che permette di:
- Registrare dati anagrafici completi degli utenti
- Inviare automaticamente email di conferma 
- Archiviare i dati in modo persistente in un database SQLite
- Effettuare backup dei dati in localStorage sul client
- Gestire gli utenti tramite un'interfaccia di amministrazione

## Stack Tecnologico

- **Backend**:
  - Node.js con Express
  - SQLite (tramite `sqlite` e `sqlite3`)
  - Nodemailer per l'invio di email
- **Middleware**:
  - cors - Per la gestione delle richieste cross-origin
  - body-parser - Per l'elaborazione dei dati delle richieste
  - dotenv - Per la gestione delle variabili d'ambiente

## Struttura del Database

Il database SQLite utilizza due tabelle principali:

### Tabella `utenti`

```sql
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
```

### Tabella `email_inviate`

```sql
CREATE TABLE IF NOT EXISTS email_inviate (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  utente_id INTEGER,
  oggetto TEXT NOT NULL,
  contenuto TEXT NOT NULL,
  data_invio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utente_id) REFERENCES utenti(id) ON DELETE CASCADE
)
```

## Analisi del Codice Server

### 1. Configurazione dell'Ambiente

```javascript
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
```

Questo blocco inizializza l'ambiente e le variabili necessarie. L'applicazione:
- Carica le variabili d'ambiente dal file `.env`
- Determina il percorso attuale dell'applicazione
- Crea la directory per il database, se non esiste
- Configura il percorso del file del database SQLite

### 2. Middleware e Configurazione Express

```javascript
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Variabile per tenere traccia dello stato del database
let db = null;
let dbAvailable = false;
```

Questa sezione configura l'applicazione Express con i middleware necessari:
- `cors` per gestire le richieste cross-origin
- `bodyParser` per elaborare i dati JSON e form nelle richieste
- Static middleware per servire i file dalla directory 'public'
- Variabili globali per tracciare lo stato della connessione al database

### 3. Inizializzazione del Database

```javascript
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
  // Crea tabelle utenti ed email_inviate
  // ...
}
```

Queste funzioni gestiscono l'inizializzazione del database:
- `setupDatabase()` tenta di aprire una connessione al database SQLite
- Se il file del database non esiste, viene creato automaticamente
- `initDatabase()` crea le tabelle necessarie se non esistono
- Abilita il supporto per le chiavi esterne per mantenere l'integrità referenziale

### 4. Riorganizzazione degli ID

```javascript
// Funzione per riorganizzare gli ID dopo un'eliminazione
async function reorganizeIds() {
  try {
    // Disabilita temporaneamente le chiavi esterne
    await db.exec('PRAGMA foreign_keys = OFF');
    
    // Crea tabelle temporanee, svuota le originali, reinserisce i dati
    // ...
    
    // Riabilita le chiavi esterne
    await db.exec('PRAGMA foreign_keys = ON');

    console.log('ID riorganizzati con successo');
  } catch (error) {
    console.error('Errore durante la riorganizzazione degli ID:', error);
    throw error;
  }
}
```

Questa funzione complessa gestisce la riorganizzazione degli ID dopo l'eliminazione di record:
1. Disabilita temporaneamente le chiavi esterne
2. Crea tabelle temporanee per conservare i dati
3. Elimina i dati dalle tabelle originali
4. Resetta i contatori degli ID automatici
5. Reinserisce tutti i dati con nuovi ID sequenziali
6. Riabilita le chiavi esterne

### 5. Configurazione Nodemailer

```javascript
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
```

Questa parte configura Nodemailer per l'invio di email:
- Crea un trasportatore SMTP utilizzando le credenziali dal file `.env`
- Verifica che la configurazione email sia valida
- Gestisce correttamente il fallimento se le credenziali email non sono configurate

### 6. API per la Registrazione Utente e Invio Email

```javascript
// API endpoint per l'invio delle email e salvataggio dati
app.post('/api/send-email', async (req, res) => {
  let dbSaveSuccess = false;
  let dbId = null;

  try {
    // Estrae i dati utente dalla richiesta
    // ...
    
    // Crea il contenuto HTML dell'email
    // ...
    
    // Salva nel database solo se disponibile
    if (dbAvailable && db) {
      try {
        // Inizia una transazione
        await db.exec('BEGIN TRANSACTION');

        // Inserisci l'utente e l'email nel database
        // ...

        // Commit della transazione
        await db.exec('COMMIT');

        dbSaveSuccess = true;
      } catch (dbError) {
        // Rollback in caso di errore
        await db.exec('ROLLBACK');
        // Continuiamo comunque con l'invio dell'email
      }
    }

    // Invia l'email solo se le credenziali sono configurate
    // ...

    // Risposta di successo
    res.status(200).json({
      success: true,
      message: emailSent ? 'Email inviata con successo' : 'Registrazione completata (email non inviata)',
      dbSaveSuccess,
      dbId
    });
  } catch (error) {
    // Gestione degli errori
    // ...
  }
});
```

Questo endpoint API gestisce la registrazione degli utenti:
1. Estrae i dati dell'utente dalla richiesta
2. Formatta i dati e crea un contenuto HTML per l'email
3. Salva i dati nel database SQLite (se disponibile) utilizzando una transazione
4. Invia un'email di conferma (se configurata)
5. Restituisce una risposta di successo con informazioni sullo stato del salvataggio

### 7. API per la Gestione degli Utenti

#### 7.1 Ottenere tutti gli utenti

```javascript
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
      ORDER BY u.id ASC
    `);

    res.status(200).json({ success: true, data: rows, dbAvailable: true });
  } catch (error) {
    // Gestione errori
    // ...
  }
});
```

#### 7.2 Ottenere le email di un utente

```javascript
app.get('/api/utenti/:id/email', async (req, res) => {
  // Verifica disponibilità database
  // Recupera e restituisce le email di un utente specifico
  // ...
});
```

#### 7.3 Eliminare un utente

```javascript
app.delete('/api/utenti/:id', async (req, res) => {
  // Verifica disponibilità database
  // Elimina l'utente e le sue email in una transazione
  // Riorganizza gli ID
  // ...
});
```

#### 7.4 Eliminare tutti gli utenti

```javascript
app.delete('/api/utenti', async (req, res) => {
  // Verifica disponibilità database
  // Elimina tutti gli utenti e le email in una transazione
  // Resetta i contatori degli ID
  // ...
});
```

#### 7.5 Verificare lo stato del database

```javascript
app.get('/api/db-status', (req, res) => {
  res.status(200).json({
    dbAvailable,
    message: dbAvailable ? 'Database disponibile' : 'Database non disponibile. Utilizzando solo localStorage.'
  });
});
```

### 8. Avvio del Server

```javascript
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});
```

## Flusso dei Dati nel Sistema

1. **Registrazione Utente**:
   - Il client invia i dati anagrafici dell'utente al server
   - Il server tenta di salvare i dati nel database SQLite
   - Se il database è disponibile, i dati vengono salvati in una transazione
   - Se non è disponibile, i dati vengono comunque processati per l'invio email
   - Il server formatta un'email di conferma con i dati dell'utente
   - Se le credenziali email sono configurate, viene inviata l'email
   - Il server restituisce una risposta con lo stato dell'operazione

2. **Gestione Utenti**:
   - Il client può richiedere l'elenco degli utenti registrati
   - Il server recupera gli utenti dal database con il conteggio delle email inviate
   - Il client può richiedere le email inviate a un utente specifico
   - Il client può eliminare un singolo utente o tutti gli utenti
   - Dopo l'eliminazione, gli ID vengono riorganizzati per mantenere una sequenza ordinata

3. **Gestione degli Errori**:
   - Se il database non è disponibile, il server informa il client di utilizzare localStorage
   - Se ci sono errori durante il salvataggio, viene eseguito un rollback della transazione
   - Se ci sono errori nell'invio dell'email, la registrazione procede comunque

## Caratteristiche di Resilienza

1. **Flessibilità del Database**:
   - L'applicazione funziona anche se il database SQLite non è disponibile
   - In assenza del database, i dati possono essere salvati in localStorage sul client

2. **Flessibilità dell'Invio Email**:
   - L'applicazione funziona anche se le credenziali email non sono configurate
   - La registrazione degli utenti procede anche in assenza di invio email

3. **Transazioni Database**:
   - Tutte le operazioni multi-tabella sono eseguite in transazioni
   - In caso di errore, viene eseguito un rollback per mantenere l'integrità dei dati

4. **Riorganizzazione degli ID**:
   - Dopo l'eliminazione di record, gli ID vengono riorganizzati per evitare "buchi"
   - Questo mantiene una sequenza ordinata degli ID per una migliore gestione

## Configurazione del Sistema

Le seguenti variabili d'ambiente possono essere configurate nel file `.env`:

```
PORT=3000               # Porta su cui il server sarà in ascolto
EMAIL_HOST=smtp.example.com  # Host del server SMTP
EMAIL_PORT=587          # Porta del server SMTP (tipicamente 587 o 465)
EMAIL_USER=user@example.com  # Username per l'autenticazione SMTP
EMAIL_PASSWORD=password      # Password per l'autenticazione SMTP
```

## Installazione e Avvio

1. Installare le dipendenze:
   ```
   npm install
   ```

2. Creare un file `.env` con le configurazioni necessarie

3. Avviare il server:
   ```
   npm start
   ```

## Best Practices Implementate

1. **Validazione dei dati**: Tutti i dati utente sono validati prima dell'elaborazione
2. **Transazioni database**: Uso delle transazioni per garantire l'integrità dei dati
3. **Query parametrizzate**: Prevenzione delle iniezioni SQL
4. **Gestione resiliente**: L'applicazione funziona anche con componenti mancanti
5. **Logging completo**: Registrazione dettagliata di operazioni ed errori
6. **Struttura modulare**: Codice ben organizzato e facile da mantenere
7. **Gestione degli errori**: Cattura e gestione appropriata di tutti gli errori


[Readme Frontend](public/Readme.md)