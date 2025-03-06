[Vai al file Generale](../../readme.md)

# 4 Lezione 06 Marzo 2025

# Legenda

- [API](#api)

  - [Endpoint](#endpoint)

  - [Metodi HTTP principali usati nelle API](#metodi-http-principali-usati-nelle-api)

    - [GET](#1-esempio-di-richiesta-get-ottenere-dati)
    - [POST](#2-esempio-di-richiesta-post-inviare-dati)
    - [PUT](#3-esempio-di-richiesta-put-aggiornare-dati)
    - [DELETE](#4-esempio-di-richiesta-delete-eliminare-dati)

  - [Axios](https://axios-http.com/docs/intro)

    - [Installazione di Axios](#installazione-di-axios)
    - [Metodi HTTP Principali usati nelle API](#metodi-http-principali-usati-nelle-api)
      - [GET](#1-esempio-di-richiesta-get-ottenere-dati-1)
      - [POST](#2-esempio-di-richiesta-post-inviare-dati-1)
      - [PUT](#3-esempio-di-richiesta-put-aggiornare-dati-1)
      - [DELETE](#4-esempio-di-richiesta-delete-eliminare-dati-1)

- [Funzioni](#funzioni)

- [Esercizi](#esercizi)

## **API**

Un'**API (Application Programming Interface)** è un insieme di regole e protocolli che permettono a diverse applicazioni software di comunicare tra loro. Nel contesto del web, le API vengono spesso usate per recuperare o inviare dati tra client (come un browser) e server.

Le API web più comuni si basano su **REST (Representational State Transfer)** e utilizzano il protocollo **HTTP** per eseguire operazioni su risorse remote.

### Endpoint

In termini generali, un "endpoint" rappresenta un punto di interazione o di connessione in un sistema. Questo concetto si applica in diversi ambiti, ma l'idea di base rimane la stessa: un punto dove qualcosa inizia o finisce, o dove avviene uno scambio.

Ecco alcuni contesti in cui il termine "endpoint" è comunemente usato:

- **Reti informatiche:**
  - Un endpoint è un dispositivo che si connette a una rete, come un computer, uno smartphone o un server.
  - È il punto in cui i dati entrano o escono dalla rete.
  - La sicurezza degli endpoint è cruciale per proteggere le reti da minacce.
- **API (Application Programming Interfaces):**
  - Un endpoint API è un URL specifico che permette a un'applicazione di accedere a una determinata risorsa o funzione di un'altra applicazione.
  - Gli endpoint API sono essenziali per l'integrazione tra diverse applicazioni e servizi.
- **Sicurezza informatica:**
  - In questo contesto, "endpoint" si riferisce a qualsiasi dispositivo che può essere un potenziale punto di ingresso per attacchi informatici.
  - La protezione degli endpoint è una parte fondamentale della sicurezza informatica.
- **Studio clinico:**
  - In questo caso l'endpoint rappresenta la misurazione del risultato di uno studio clinico.

In sintesi, un endpoint è un punto cruciale in un sistema, dove avviene un'interazione o una connessione. La sua funzione varia a seconda del contesto, ma l'idea di base di un punto di interazione rimane costante.

---

### **Metodi HTTP principali usati nelle API**

Quando comunichi con un'API REST, usi diversi metodi HTTP:

- **GET** → Recupera dati (es. ottenere una lista di utenti)
- **POST** → Invia dati al server (es. creare un nuovo utente)
- **PUT** → Aggiorna dati esistenti (es. modificare un utente)
- **DELETE** → Elimina dati (es. cancellare un utente)

---

### **Esempi di comunicazione con un'API in JavaScript**

In JavaScript, puoi interagire con un'API utilizzando `fetch()`, che è un metodo asincrono per effettuare richieste HTTP.

#### **1. Esempio di richiesta GET (ottenere dati)**

```javascript
fetch("https://jsonplaceholder.typicode.com/users") // API di esempio
  .then((response) => response.json()) // Converti la risposta in JSON
  .then((data) => console.log(data)) // Stampa i dati in console
  .catch((error) => console.error("Errore:", error)); // Gestione errori
```

💡 **Cosa fa questo codice?**

- Fa una richiesta **GET** all'API
- Converte la risposta in formato JSON
- Stampa i dati in console

---

#### **2. Esempio di richiesta POST (inviare dati)**

```javascript
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST", // Metodo HTTP
  headers: {
    "Content-Type": "application/json", // Tipo di contenuto
  },
  body: JSON.stringify({
    // Converti oggetto JS in JSON
    title: "Nuovo Post",
    body: "Contenuto del post",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Risposta dal server:", data))
  .catch((error) => console.error("Errore:", error));
```

💡 **Cosa fa questo codice?**

- Invia un nuovo post all'API
- Specifica il metodo `POST`
- Invia dati JSON nel `body`
- Riceve la risposta e la stampa in console

---

#### **3. Esempio di richiesta PUT (aggiornare dati)**

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Post aggiornato",
    body: "Nuovo contenuto",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("Dati aggiornati:", data))
  .catch((error) => console.error("Errore:", error));
```

💡 **Cosa fa questo codice?**

- Aggiorna il post con `id=1`
- Specifica `PUT` come metodo HTTP
- Invia i nuovi dati JSON

---

#### **4. Esempio di richiesta DELETE (eliminare dati)**

```javascript
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => console.log("Post eliminato con successo"))
  .catch((error) => console.error("Errore:", error));
```

💡 **Cosa fa questo codice?**

- Elimina il post con `id=1`
- Non invia un `body`, perché non serve

---

### **Alternative a `fetch()`**

Un'altra libreria molto usata per fare richieste API in JavaScript è **Axios**, che offre una sintassi più pulita:

**_Axios_**\* è una libreria basata su promesse che facilita le richieste HTTP sia nel browser che in Node.js. Offre una sintassi più pulita e semplice rispetto a **`fetch()`**.\*

### _Installazione di Axios_

_È possibile installare Axios utilizzando npm o includendo direttamente lo script nella tua pagina HTML:_

```bash
npm install axios
```

Oppure, includendo lo script:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

### 1. Esempio di richiesta GET (ottenere dati)

```javascript
axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Errore:", error));
```

**Cosa fa questo codice?**

- Recupera la lista degli utenti dall'API.
- Stampa i dati ricevuti nella console.
- Gestisce eventuali errori.

### 2. Esempio di richiesta POST (inviare dati)

```javascript
axios
  .post("https://jsonplaceholder.typicode.com/posts", {
    title: "Nuovo Post",
    body: "Contenuto del post",
    userId: 1,
  })
  .then((response) => console.log("Risposta dal server:", response.data))
  .catch((error) => console.error("Errore:", error));
```

**Cosa fa questo codice?**

- Invia un nuovo post all'API.
- Riceve la risposta dal server e la stampa nella console.
- Gestisce eventuali errori.

### 3. Esempio di richiesta PUT (aggiornare dati)

```javascript
axios
  .put("https://jsonplaceholder.typicode.com/posts/1", {
    title: "Post aggiornato",
    body: "Nuovo contenuto",
    userId: 1,
  })
  .then((response) => console.log("Dati aggiornati:", response.data))
  .catch((error) => console.error("Errore:", error));
```

**Cosa fa questo codice?**

- Aggiorna il post con `id=1` sull'API.
- Riceve la risposta e la stampa nella console.
- Gestisce eventuali errori.

### 4. Esempio di richiesta DELETE (eliminare dati)

```javascript
axios
  .delete("https://jsonplaceholder.typicode.com/posts/1")
  .then(() => console.log("Post eliminato con successo"))
  .catch((error) => console.error("Errore:", error));
```

**Cosa fa questo codice?**

- Elimina il post con `id=1` sull'API.
- Stampa un messaggio di conferma nella console.
- Gestisce eventuali errori.

---

### **Conclusione**

Le API sono fondamentali per la comunicazione tra applicazioni. JavaScript fornisce strumenti potenti come `fetch()` e `Axios` per inviare e ricevere dati in modo asincrono.

## Funzioni

In JavaScript, le funzioni sono blocchi di codice che possono essere eseguiti quando vengono chiamati. Possono accettare parametri (entrate), eseguire operazioni, e restituire un risultato (uscita). Ecco una descrizione base delle funzioni:

1. **Dichiarazione della funzione**: Una funzione può essere dichiarata usando la parola chiave `function`, seguita dal nome della funzione e dalle parentesi tonde. All'interno delle parentesi puoi definire i parametri della funzione, se necessari.

   ```javascript
   function saluta(nome) {
     console.log("Ciao, " + nome);
   }
   ```

2. **Parametri e argomenti**: I parametri sono variabili che riceveranno i valori (argomenti) quando la funzione verrà chiamata.

   ```javascript
   function somma(a, b) {
     return a + b;
   }
   ```

3. **Chiamata della funzione**: Per eseguire una funzione, si usa il nome della funzione seguito da parentesi tonde, con gli argomenti dentro (se necessari).

   ```javascript
   saluta("Marco"); // Stampa "Ciao, Marco"
   console.log(somma(5, 3)); // Stampa 8
   ```

4. **Valore di ritorno (return)**: Le funzioni possono restituire un valore tramite la parola chiave `return`. Questo valore può essere utilizzato successivamente.

   ```javascript
   function moltiplica(x, y) {
     return x * y;
   }
   let risultato = moltiplica(4, 5); // risultato sarà 20
   ```

5. **Funzioni anonime**: Le funzioni possono anche essere dichiarate senza un nome. Vengono chiamate "funzioni anonime" e sono spesso utilizzate come argomenti per altre funzioni.

   ```javascript
   let salutaAnonimo = function (nome) {
     console.log("Ciao, " + nome);
   };
   salutaAnonimo("Luca"); // Stampa "Ciao, Luca"
   ```

6. **Funzioni arrow (freccia)**: Un modo più conciso di scrivere una funzione. La sintassi è più compatta e viene spesso usata per le funzioni anonime.

   ```javascript
   const sommaArrow = (a, b) => a + b;
   console.log(sommaArrow(2, 3)); // Stampa 5
   ```

## Esercizi

- [1 Esercizio](Esercizi/1_Esercizio/Esempi.js)
