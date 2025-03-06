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

  - [Conclusioni](#conclusione)

- [Funzioni](#funzioni)

- [Classi](#classi-in-javascript)

  - [Sintassi](#sintassi-delle-classi)

    - [Costruttore](#1-costruttore-constructor)
    - [Metodi](#2-metodi)
    - [Creazione Oggetti](#3-creazione-di-oggetti)
    - [Ereditarietà nelle classi](#4-ereditarietà-nelle-classi)
    - [Super](#5-super)
    - [Getters e Setters](#6-getters-e-setters)

  - [Vantaggi](#vantaggi-delle-classi-in-javascript)

- [Funzioni Asincrone / Sincrone](#funzioni-asincrone--sincrone)

  - Opzioni

    - [Operazioi Sincrone (Sync)](#1-operazioni-sincrone-sync)
    - [Operazioni Asincrone (Async)](#2-operazioni-asincrone-async)
    - [Promise](#3-promise-promessa)
    - [Async Await](#4-async--await)

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

---

## Classi in JavaScript

Le **classi** in JavaScript sono un costrutto introdotto con ECMAScript 6 (ES6) che permette di creare oggetti e gestire l'ereditarietà in modo più intuitivo rispetto alla tradizionale funzione costruttrice. Le classi offrono una sintassi più semplice e leggibile per la creazione di oggetti e la gestione dei metodi associati.

### Sintassi delle Classi

Una classe viene definita utilizzando la parola chiave `class`, seguita dal nome della classe e da un corpo che contiene un costruttore e metodi. Ecco un esempio di base:

```javascript
class Persona {
  // Costruttore per inizializzare le proprietà
  constructor(nome, eta) {
    this.nome = nome;
    this.eta = eta;
  }

  // Metodo per presentarsi
  saluta() {
    console.log(`Ciao, mi chiamo ${this.nome} e ho ${this.eta} anni.`);
  }
}

// Creazione di un oggetto 'persona1' della classe Persona
const persona1 = new Persona("Marco", 25);
persona1.saluta(); // Stampa: "Ciao, mi chiamo Marco e ho 25 anni."
```

### 1. **Costruttore (`constructor`)**

Il **costruttore** è un metodo speciale di una classe che viene chiamato automaticamente quando un oggetto viene creato con la parola chiave `new`. Viene utilizzato per inizializzare le proprietà dell'oggetto.

```javascript
class Persona {
  constructor(nome, eta) {
    this.nome = nome;
    this.eta = eta;
  }
}
```

### 2. **Metodi**

I metodi di una classe sono funzioni che vengono associati agli oggetti creati dalla classe. Possono essere invocati sull'oggetto tramite la notazione punto.

```javascript
class Persona {
  saluta() {
    console.log(`Ciao, mi chiamo ${this.nome}`);
  }
}
```

### 3. **Creazione di Oggetti**

Per creare un oggetto da una classe, si utilizza la parola chiave `new` seguita dal nome della classe.

```javascript
const persona1 = new Persona("Alice", 30);
persona1.saluta(); // Stampa: "Ciao, mi chiamo Alice"
```

### 4. **Ereditarietà nelle Classi**

Le classi in JavaScript supportano l'ereditarietà, il che significa che una classe può estendere un'altra classe. La parola chiave `extends` viene utilizzata per creare una classe che eredita le proprietà e i metodi di un'altra classe.

```javascript
class Studente extends Persona {
  constructor(nome, eta, corso) {
    // Chiamata al costruttore della classe base (Persona)
    super(nome, eta);
    this.corso = corso;
  }

  // Metodo aggiuntivo
  saluta() {
    console.log(`Ciao, mi chiamo ${this.nome} e studio ${this.corso}.`);
  }
}

const studente1 = new Studente("Luca", 22, "Informatica");
studente1.saluta(); // Stampa: "Ciao, mi chiamo Luca e studio Informatica."
```

### 5. **Super()**

La parola chiave `super` viene utilizzata per invocare il costruttore della classe base o per richiamare i metodi della classe genitore.

```javascript
class Animale {
  constructor(nome) {
    this.nome = nome;
  }

  parla() {
    console.log(`${this.nome} fa un suono.`);
  }
}

class Cane extends Animale {
  constructor(nome, razza) {
    super(nome); // Chiamata al costruttore della classe Animale
    this.razza = razza;
  }

  parla() {
    console.log(`${this.nome} abbaia.`);
  }
}

const cane1 = new Cane("Rex", "Pastore Tedesco");
cane1.parla(); // Stampa: "Rex abbaia."
```

### 6. **Getters e Setters**

Le classi possono includere **getter** e **setter** per accedere o modificare le proprietà private di un oggetto.

```javascript
class Persona {
  constructor(nome) {
    this._nome = nome;
  }

  // Getter per ottenere il nome
  get nome() {
    return this._nome;
  }

  // Setter per cambiare il nome
  set nome(nuovoNome) {
    this._nome = nuovoNome;
  }
}

const persona2 = new Persona("Giovanni");
console.log(persona2.nome); // Stampa: "Giovanni"
persona2.nome = "Francesco"; // Modifica il nome
console.log(persona2.nome); // Stampa: "Francesco"
```

---

### Vantaggi delle Classi in JavaScript:

- **Sintassi più chiara**: Le classi offrono una sintassi più intuitiva rispetto alle funzioni costruttrici.
- **Integrazione con l'ereditarietà**: La sintassi `extends` rende l'ereditarietà più facile da implementare.
- **Modularità e riusabilità**: Le classi permettono di definire oggetti e metodi riutilizzabili, migliorando l'organizzazione del codice.

Le classi sono un concetto potente che rende JavaScript più simile ad altri linguaggi orientati agli oggetti, migliorando la gestione di oggetti complessi e la manutenzione del codice.

# Funzioni Asincrone / Sincrone

In JavaScript, le operazioni possono essere eseguite in **modo sincrono (sync)** o **asincrono (async)**. Questi due approcci determinano come vengono gestite le operazioni, specialmente quando si tratta di operazioni che richiedono tempo, come richieste di rete o lettura di file. Ecco una spiegazione con esempi di entrambe le modalità.

### 1. **Operazioni Sincrone (Sync)**

Le operazioni **sincrone** vengono eseguite una dopo l'altra, nell'ordine in cui sono scritte nel codice. Ogni operazione aspetta che quella precedente sia completata prima di essere eseguita.

#### Esempio di codice sincrono:

```javascript
console.log("Inizio");

function operazioneSincrona() {
  console.log("Operazione sincrona in corso...");
}

operazioneSincrona(); // Questo blocca il codice successivo fino al termine
console.log("Fine");
```

**Output**:

```
Inizio
Operazione sincrona in corso...
Fine
```

Nel caso sopra, `operazioneSincrona()` viene eseguita prima di passare alla `console.log("Fine")`. JavaScript aspetta che la funzione finisca di eseguire prima di proseguire.

### 2. **Operazioni Asincrone (Async)**

Le operazioni **asincrone** permettono a JavaScript di continuare l'esecuzione del codice senza aspettare che un'operazione lunga (come una richiesta di rete) venga completata. Invece, una callback o una promessa (`Promise`) viene utilizzata per gestire il risultato dell'operazione quando è pronta.

#### Esempio di codice asincrono con `setTimeout`:

```javascript
console.log("Inizio");

setTimeout(function () {
  console.log("Operazione asincrona in corso...");
}, 2000); // Ritarda l'esecuzione di 2 secondi

console.log("Fine");
```

**Output**:

```
Inizio
Fine
Operazione asincrona in corso...
```

Nel caso sopra, `setTimeout` è una funzione asincrona che simula un'operazione che richiede del tempo. Non blocca l'esecuzione del codice successivo, quindi `"Fine"` viene stampato subito dopo `"Inizio"`, mentre `"Operazione asincrona in corso..."` viene stampato dopo 2 secondi.

### 3. **Promise (Promessa)**

Le **promesse** sono un meccanismo per gestire operazioni asincrone in modo più controllato e leggibile. Una promessa è un oggetto che rappresenta il completamento (o il fallimento) di un'operazione asincrona.

#### Esempio con `Promise`:

```javascript
function operazioneAsincrona() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Operazione completata");
    }, 2000); // L'operazione richiede 2 secondi
  });
}

console.log("Inizio");

operazioneAsincrona()
  .then((result) => {
    console.log(result); // Stampa "Operazione completata" dopo 2 secondi
  })
  .catch((error) => {
    console.log(error);
  });

console.log("Fine");
```

**Output**:

```
Inizio
Fine
Operazione completata
```

In questo caso, `operazioneAsincrona` restituisce una `Promise`. Quando l'operazione è completata, la promessa viene "risolta" (`resolve`), e il risultato viene gestito tramite il metodo `.then()`. Nel frattempo, il codice continua a eseguire la parte successiva senza aspettare il completamento della promessa.

### 4. **Async / Await**

Le parole chiave **`async`** e **`await`** offrono un modo più semplice e leggibile di gestire operazioni asincrone, rendendo il codice che utilizza `Promise` più simile al codice sincrono, senza bloccare l'esecuzione.

#### Esempio con `async` / `await`:

```javascript
async function eseguiOperazione() {
  console.log("Inizio");

  const risultato = await operazioneAsincrona();
  console.log(risultato); // Stampa "Operazione completata" dopo 2 secondi

  console.log("Fine");
}

eseguiOperazione();
```

**Output**:

```
Inizio
Operazione completata
Fine
```

In questo esempio, la funzione `eseguiOperazione` è dichiarata con `async`, il che significa che possiamo usare `await` all'interno di essa per "attendere" il completamento di `operazioneAsincrona()`. Mentre JavaScript attende la risposta della promessa, il flusso di esecuzione non viene bloccato e altre operazioni possono continuare.

### Differenza tra **Sync** e **Async**:

- **Sincrono**: Il codice viene eseguito riga per riga. Ogni operazione deve essere completata prima che la successiva venga eseguita.
- **Asincrono**: Il codice non blocca l'esecuzione. Le operazioni che richiedono tempo (come chiamate di rete, operazioni su file, ecc.) vengono eseguite "in parallelo", e una callback o promessa viene utilizzata per gestire il risultato quando è pronto.

---

In sintesi:

- **Sincrono**: Le operazioni vengono eseguite una per volta.
- **Asincrono**: Le operazioni possono essere eseguite in parallelo, e il flusso di esecuzione non è bloccato. Si utilizzano callback, promesse o `async/await` per gestire il risultato.

## Esercizi

- [1 Esercizio](Esercizi/1_Esercizio/Esempi.js)
- [2 Esercizio](Esercizi/2_Esercizio/Object_Programming.js)
- [3 Esercizio](Esercizi/3_Esercizio)
- [4 Esercizio](Esercizi/4_Esercizio)
- [5 Esercizio](Esercizi/5_Esercizio/)
- [6 Esercizio](Esercizi/6_Esercizio/)
- [7 Esercizio](Esercizi/7_Esercizio/)
- [8 Esercizio](Esercizi/8_Esercizio/)