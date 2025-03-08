# Fondamenti di JavaScript

JavaScript è un linguaggio di programmazione versatile che consente agli sviluppatori di creare applicazioni web dinamiche e interattive. Questo testo copre i concetti e le funzionalità fondamentali di JavaScript, fornendo una base per comprendere i suoi principi essenziali.

## Cos'è JavaScript?

JavaScript è un linguaggio di programmazione ad alto livello e interpretato, utilizzato principalmente per migliorare le pagine web. Permette agli sviluppatori di creare elementi interattivi come menu a discesa, validazioni di moduli, animazioni e molto altro. A differenza di HTML e CSS, che definiscono la struttura e lo stile delle pagine web, JavaScript controlla il comportamento e le funzionalità.

## Variabili

Le variabili memorizzano dati che possono essere utilizzati e manipolati all'interno del programma. In JavaScript, è possibile dichiarare variabili usando `var`, `let` o `const`.

- **var**: Utilizzato tradizionalmente per dichiarare variabili. Ha uno scope globale o a livello di funzione.
- **let**: Introdotto in ES6, è limitato a un blocco di codice e previene molti problemi comuni con `var`.
- **const**: Dichiara variabili che non possono essere riassegnate.

```javascript
let età = 25;
const nome = "Giovanni";
var studente = true;
```

## Tipi di dati

JavaScript ha diversi tipi di dati:

- **Tipi primitivi**: `string`, `number`, `boolean`, `null`, `undefined`, e `symbol`.
- **Oggetti**: Collezioni di coppie chiave-valore, inclusi array e funzioni.

```javascript
let numero = 10; // Numero
let saluto = "ciao"; // Stringa
let attivo = true; // Booleano
```

## Operatori

JavaScript include operatori aritmetici (`+`, `-`, `*`, `/`), di assegnazione (`=`, `+=`, `-=`), di confronto (`==`, `===`, `!=`, `!==`, `<`, `>`) e logici (`&&`, `||`, `!`).

```javascript
let x = 5;
let y = 10;
console.log(x + y); // 15
console.log(x === y); // false
```

## Funzioni

Le funzioni sono blocchi di codice riutilizzabili che svolgono compiti specifici. Possono accettare parametri e restituire valori.

```javascript
function somma(a, b) {
  return a + b;
}
console.log(somma(5, 3)); // 8
```

Le funzioni possono anche essere anonime o a freccia:

```javascript
const saluta = () => console.log("Ciao, mondo!");
saluta();
```

## Strutture di controllo

Le strutture di controllo consentono agli sviluppatori di determinare il flusso di esecuzione di un programma.

### Istruzioni condizionali

Utilizza `if`, `else if` ed `else` per eseguire codice in base a condizioni.

```javascript
let voto = 85;
if (voto >= 90) console.log("Voto A");
else if (voto >= 80) console.log("Voto B");
else console.log("Voto C");
```

### Cicli

JavaScript supporta cicli come `for`, `while` e `do-while` per eseguire compiti ripetitivi.

#### Esempio di ciclo FOR

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

#### Esempio di ciclo WHILE

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

#### Esempio di ciclo DO WHILE

```javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
```

## Array

Gli array sono usati per memorizzare più valori in una singola variabile.

```javascript
let frutta = ["mela", "banana", "ciliegia"];
console.log(frutta[1]); // banana

frutta.push("dattero");
console.log(frutta); // ["mela", "banana", "ciliegia", "dattero"]
```

## Oggetti

Gli oggetti memorizzano dati in coppie chiave-valore.

```javascript
let persona = {
  nome: "Alice",
  età: 30,
  impiegata: true,
};
console.log(persona.nome); // Alice
```

## Manipolazione del DOM

Il Document Object Model (DOM) rappresenta la struttura di una pagina web. JavaScript può interagire con il DOM per modificare dinamicamente gli elementi.

```javascript
let titolo = document.getElementById("titolo");
titolo.textContent = "Benvenuto!";
titolo.style.color = "blu";
```

## Eventi

JavaScript gestisce eventi come click, pressione di tasti o movimenti del mouse.

```javascript
document.getElementById("bottone").addEventListener("click", () => {
  alert("Hai cliccato il bottone!");
});
```

## Gestione degli errori

Utilizza `try`, `catch` e `finally` per gestire gli errori.

```javascript
try {
  let risultato = operazioneRischiosa();
  console.log(risultato);
} catch (errore) {
  console.error("Si è verificato un errore:", errore);
} finally {
  console.log("Operazione completata.");
}
```

## Funzionalità ES6

JavaScript ha introdotto molte funzionalità in ES6 e versioni successive, tra cui:

- **Template Literals**:

```javascript
let messaggio = `Ciao, ${nome}!`;
```

- **Destructuring**:

```javascript
let { nome, età } = persona;
console.log(nome, età);
```

- **Moduli**:

```javascript
export function saluta() {
  console.log("Ciao!");
}

import { saluta } from "./saluta.js";
saluta();
```

## Conclusione

JavaScript è uno strumento potente per creare applicazioni web dinamiche. Padroneggiando le basi—variabili, funzioni, strutture di controllo, manipolazione del DOM e funzionalità ES6—puoi sviluppare una solida base per costruire progetti più complessi.
