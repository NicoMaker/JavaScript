# Analisi del Front-end - Sistema di Registrazione

## Panoramica

Questo file JavaScript gestisce l'interfaccia utente del sistema di registrazione, fornendo tutte le funzionalità necessarie per:

- Raccogliere e validare i dati utente
- Inviare i dati al server
- Visualizzare le registrazioni salvate
- Gestire modalità offline con localStorage
- Eliminare singole registrazioni o tutti i dati

## Componenti Principali

### 1. Inizializzazione e Riferimenti DOM

Il codice inizia recuperando i riferimenti a tutti gli elementi HTML necessari come:

- Form di registrazione e suoi campi
- Pulsanti di invio e azioni
- Elementi modali per feedback e visualizzazione
- Indicatori di stato del database

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Elementi DOM
  const form = document.getElementById("registrationForm");
  const submitBtn = document.getElementById("submitBtn");
  // ... altri elementi
});
```

### 2. Gestione dello Stato dell'Applicazione

L'applicazione mantiene uno stato interno che tiene traccia di:

- Disponibilità del database (online/offline)
- Elenco degli utenti registrati
- Stato del form (validità)

```javascript
// Stato dell'applicazione
let dbAvailable = false;
let registeredUsers = [];
```

### 3. Verifica della Disponibilità del Database

All'avvio, l'applicazione verifica se il database è disponibile chiamando l'API `/api/db-status`:

- Se disponibile, carica i dati dal server
- Se non disponibile, utilizza il localStorage come fallback

```javascript
fetch("/api/db-status")
  .then((response) => response.json())
  .then((data) => {
    dbAvailable = data.dbAvailable;
    updateDbStatusIndicator();
    if (dbAvailable) {
      loadDataFromDB();
    } else {
      loadDataFromLocalStorage();
    }
  });
```

### 4. Sistema di Validazione dei Dati

Il codice implementa un sistema completo di validazione in tempo reale per tutti i campi del form:

- **Validatori specifici per tipo di dato**:
  - Campi richiesti
  - Lunghezza minima/massima
  - Formato codice fiscale (regex)
  - Verifica età (maggiorenne)
  - Controllo provincia valida
  - Formato telefono e email

```javascript
function validateField(fieldName, value) {
  // ...
  switch (fieldName) {
    case "nome":
    case "cognome":
      error = validateLength(value, 2, 50, fieldName);
      break;
    case "codiceFiscale":
      error = validateFiscalCode(value);
      break;
    // ...altri campi
  }
}
```

### 5. Gestione dei Form e Invio Dati

L'invio del form è gestito con i seguenti passaggi:

1. Prevenzione del comportamento di default
2. Validazione completa dei dati
3. Visualizzazione del loader durante l'attesa
4. Invio dati al server tramite fetch API
5. Gestione della risposta (successo/errore)
6. Salvataggio di backup in localStorage

```javascript
function submitForm() {
  // Mostra loader e disabilita pulsante
  loader.style.display = "flex";
  submitBtn.disabled = true;

  // Creazione oggetto dati
  const formData = {
    nome: fields.nome.element.value,
    // ...altri campi
  };

  // Invio al server
  fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).then(/* gestione risposta */);
}
```

### 6. Gestione Visualizzazione Dati

L'applicazione offre funzionalità per visualizzare i dati registrati:

- Caricamento dal database o localStorage
- Renderizzazione in una tabella HTML
- Gestione dei casi di assenza dati

```javascript
function renderTable(data, isFromDB) {
  if (data.length === 0) {
    noDataMessage.style.display = "block";
    // ...
    return;
  }

  // Popolamento tabella
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    // ...costruzione riga
    tableBody.appendChild(row);
  });

  // Aggiunta listener ai pulsanti di eliminazione
  document.querySelectorAll(".delete-btn").forEach(/* ... */);
}
```

### 7. Funzionalità di Eliminazione Dati

L'applicazione supporta:

- Eliminazione di singole registrazioni
- Eliminazione di massa (tutti i dati)
- Conferma prima dell'eliminazione tramite modal
- Gestione differenziata database/localStorage

```javascript
function deleteItem(id, index, fromDB) {
  if (fromDB && dbAvailable) {
    // Eliminazione dal database tramite API
    fetch(`/api/utenti/${id}`, {
      method: "DELETE",
    });
    // ...gestione risposta
  } else {
    // Eliminazione dal localStorage
    const savedData = JSON.parse(localStorage.getItem("formSubmissions")) || [];
    savedData.splice(index, 1);
    localStorage.setItem("formSubmissions", JSON.stringify(savedData));
    // ...
  }
}
```

### 8. Autocompletamento Province

Il codice include una funzionalità di autocompletamento per il campo provincia:

- Caricamento dei dati da un file JSON di province italiane
- Creazione di un datalist per l'autocomplete
- Validazione con controllo delle province valide

```javascript
function setupProvinceAutocomplete(inputElement, provinceList) {
  // Creazione datalist
  const datalistId = inputElement.id + "List";
  let datalist = document.getElementById(datalistId);
  // ...

  // Popolazione opzioni
  provinceList.forEach((provincia) => {
    const option = document.createElement("option");
    // ...
  });

  // Tooltip per nome completo provincia
  inputElement.addEventListener("input", function () {
    // ...
  });
}
```

### 9. Gestione Modali e Notifiche

L'interfaccia utente utilizza modali per:

- Conferma di successo
- Notifiche di errore
- Visualizzazione dei dati registrati
- Conferma prima dell'eliminazione di massa

```javascript
document
  .getElementById("closeSuccessModal")
  .addEventListener("click", () => (successModal.style.display = "none"));
// ...altri listener per chiusura modali

window.addEventListener("click", (event) => {
  if (event.target === successModal) successModal.style.display = "none";
  // ...gestione altri modali
});
```

## Caratteristiche Avanzate

### 1. Resilienza e Modalità Offline

Il codice gestisce perfettamente scenari di connettività problematica:

- Funzionamento anche senza database (fallback su localStorage)
- Sincronizzazione tra database e storage locale
- Indicatore visivo dello stato della connessione al database

### 2. Feedback Visivo

L'interfaccia fornisce feedback visivi costanti all'utente:

- Loader durante le operazioni asincrone
- Messaggi di errore specifici
- Feedback in tempo reale sulla validità dei campi
- Modali informativi

### 3. Validazione Completa

Il sistema di validazione è completo e include:

- Validazione in tempo reale durante l'input
- Validazione alla submission del form
- Gestione errori personalizzati per ogni tipo di campo
- Controlli specifici per campi italiani (Codice Fiscale, Province)

### 4. Integrazione con l'API

Il front-end si interfaccia perfettamente con il backend attraverso:

- Chiamate API per salvataggio dati
- Gestione della risposta e degli errori
- Adattamento ai dati provenienti dal backend
- Sincronizzazione stato locale con server

[Readme Backend](../Readme.md)