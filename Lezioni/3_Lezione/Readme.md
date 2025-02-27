[Vai al file Generale](../../readme.md)

# 3 Lezione 27 Febbraio 2025

# Legenda

- [Variabili](#variabili)

  - [`var`](#var)
  - [`let`](#let)
  - [`const`](#const)

- [If else if else](#condizioni-if-else-if-else-in-javascript)
- [Array](#array-in-javascript)
- [Modulo](#modulo)

- [Esercizi](#esercizi)

# Variabili

---

## 🔹 var

- **Può essere riassegnata** (`reassignment` ✅)
- **Può essere ridefinita** (`redeclaration` ✅)
- **Ha scope di funzione** (non è limitata ai blocchi come `if`, `for`, etc.)
- **Può causare problemi di `hoisting`** (viene spostata in cima al contesto)

📌 **Esempio:**

```js
var nome = "Mario";
console.log(nome); // Mario

var nome = "Luigi"; // Ridefinizione possibile
console.log(nome); // Luigi

nome = "Peach"; // Riassegnazione possibile
console.log(nome); // Peach
```

🔴 **Problema**: Se usiamo `var` dentro un blocco `{}`, la variabile è comunque accessibile fuori!

```js
if (true) var età = 25;
console.log(età); // 25 ✅ (Ma dovrebbe essere accessibile solo nel blocco!)
```

---

## 🔹 let

- **Può essere riassegnata** (`reassignment` ✅)
- **Non può essere ridefinita** (`redeclaration` ❌)
- **Ha scope di blocco** (è accessibile solo dentro `{}`)
- **Evita problemi di `hoisting`**

📌 **Esempio:**

```js
let colore = "rosso";
console.log(colore); // rosso

// let colore = "blu"; // ❌ Errore: già dichiarata!
colore = "blu"; // ✅ Possiamo cambiare il valore
console.log(colore); // blu
```

✅ **Protegge dallo scope di blocco**

```js
if (true) {
  let numero = 10;
}
// console.log(numero); // ❌ Errore: numero non è definito fuori dal blocco
```

---

## 🔹 const

- **Non può essere riassegnata** (`reassignment` ❌)
- **Non può essere ridefinita** (`redeclaration` ❌)
- **Ha scope di blocco**
- **Ottima per valori che non devono cambiare** (es. PI greco, URL fissi, ecc.)

📌 **Esempio:**

```js
const PI = 3.14159;
console.log(PI); // 3.14159

// PI = 3.14; // ❌ Errore: non si può cambiare il valore
// const PI = 3; // ❌ Errore: non si può ridefinire
```

✅ **Con gli array e oggetti, puoi modificare i contenuti, ma non riassegnare la variabile!**

```js
const numeri = [1, 2, 3];
numeri.push(4); // ✅ Posso modificare l'array
console.log(numeri); // [1, 2, 3, 4]

// numeri = [5, 6, 7]; // ❌ Errore: non posso riassegnare l'intero array!
```

---

## 📌 **Riassunto**

| Caratteristica                           | `var`             | `let`                      | `const`                    |
| ---------------------------------------- | ----------------- | -------------------------- | -------------------------- |
| **Scope** (blocco o funzione)            | Funzione          | Blocco                     | Blocco                     |
| **Riassegnabile (`=`)**                  | ✅                | ✅                         | ❌                         |
| **Ridefinibile (`var x = 1` due volte)** | ✅                | ❌                         | ❌                         |
| **Hoisting**                             | ✅ (ma undefined) | ✅ (errore se usata prima) | ✅ (errore se usata prima) |

📢 **Conclusione:**

- Usa `let` quando devi cambiare il valore.
- Usa `const` per valori che non devono mai cambiare.
- Evita `var`, perché può causare bug e problemi di scope. 🚀

### **Condizioni: `if`, `else if`, `else` in JavaScript**

In JavaScript, le istruzioni condizionali vengono utilizzate per eseguire blocchi di codice in base a determinate condizioni. L'istruzione più comune è `if`, che può essere combinata con `else if` e `else` per gestire più casi.

#### **Sintassi di base**

```javascript
if (condizione)
  // Codice eseguito se la condizione è vera
else if (altraCondizione)
  // Codice eseguito se la prima condizione è falsa, ma questa è vera
else
  // Codice eseguito se nessuna delle condizioni precedenti è vera
```

#### **Esempio pratico**

```javascript
let temperatura = 30;

if (temperatura < 10) console.log("Fa freddo, metti il cappotto!");
else if (temperatura >= 10 && temperatura < 25)
  console.log("Il tempo è piacevole.");
else console.log("Fa caldo, metti i vestiti leggeri!");
```

📌 **Spiegazione**:

- Se la temperatura è inferiore a 10, viene stampato "Fa freddo, metti il cappotto!"
- Se è tra 10 e 25, viene stampato "Il tempo è piacevole."
- Se è superiore a 25, viene stampato "Fa caldo, metti i vestiti leggeri!"

---

## **Array in JavaScript**

Gli **array** sono una struttura dati che permette di memorizzare più valori in un'unica variabile.

### **Dichiarazione di un array**

```javascript
let numeri = [10, 20, 30, 40, 50];
let colori = ["rosso", "verde", "blu"];
```

### **Accesso agli elementi**

Gli elementi di un array si accedono usando gli indici, che partono da **0**:

```javascript
console.log(numeri[0]); // Output: 10
console.log(colori[1]); // Output: verde
```

### **Metodi principali degli array**

#### **1. Aggiungere elementi (`push`, `unshift`)**

- `push(elemento)`: aggiunge un elemento alla fine
- `unshift(elemento)`: aggiunge un elemento all'inizio

```javascript
numeri.push(60); // Aggiunge 60 alla fine
colori.unshift("giallo"); // Aggiunge "giallo" all'inizio
console.log(numeri); // [10, 20, 30, 40, 50, 60]
console.log(colori); // ["giallo", "rosso", "verde", "blu"]
```

#### **2. Rimuovere elementi (`pop`, `shift`)**

- `pop()`: rimuove l'ultimo elemento
- `shift()`: rimuove il primo elemento

```javascript
numeri.pop(); // Rimuove 60
colori.shift(); // Rimuove "giallo"
console.log(numeri); // [10, 20, 30, 40, 50]
console.log(colori); // ["rosso", "verde", "blu"]
```

#### **3. Trovare elementi (`indexOf`, `includes`)**

- `indexOf(elemento)`: restituisce l'indice dell'elemento (o -1 se non esiste)
- `includes(elemento)`: verifica se un elemento è presente

```javascript
console.log(colori.indexOf("verde")); // Output: 1
console.log(colori.includes("nero")); // Output: false
```

#### **4. Iterare sugli elementi (`forEach`, `map`)**

- `forEach()`: esegue una funzione su ogni elemento
- `map()`: crea un nuovo array trasformando ogni elemento

```javascript
numeri.forEach((num) => console.log(num * 2)); // Stampa il doppio di ogni numero

let quadrati = numeri.map((num) => num * num);
console.log(quadrati); // [100, 400, 900, 1600, 2500]
```

#### **5. Filtrare elementi (`filter`)**

- `filter()`: crea un nuovo array con gli elementi che soddisfano una condizione

```javascript
let numeriGrandi = numeri.filter((num) => num > 20);
console.log(numeriGrandi); // [30, 40, 50]
```

#### **6. Ordinare un array (`sort`)**

```javascript
let numeriDisordinati = [5, 3, 8, 1, 2];
numeriDisordinati.sort((a, b) => a - b); // Ordinamento crescente
console.log(numeriDisordinati); // [1, 2, 3, 5, 8]
```

---

## **Esempio completo combinando `if-else` e Array**

```javascript
let voti = [18, 25, 30, 10, 28];

voti.forEach((voto) => {
  if (voto < 18) console.log(`Voto ${voto}: Bocciato`);
  else if (voto >= 18 && voto < 24) console.log(`Voto ${voto}: Sufficiente`);
  else if (voto >= 24 && voto < 28) console.log(`Voto ${voto}: Buono`);
  else console.log(`Voto ${voto}: Ottimo!`);
});
```

### **Output**

```yaml
Voto 18: Sufficiente
Voto 25: Buono
Voto 30: Ottimo!
Voto 10: Bocciato
Voto 28: Ottimo!
```

💡 **Conclusione**:

- **`if-else`** permette di gestire le condizioni logiche in modo strutturato.
- **Gli array** permettono di immagazzinare e manipolare liste di dati in modo efficiente.
- **I metodi degli array** come `forEach`, `map`, `filter` rendono il codice più leggibile e performante.

🔹 Hai bisogno di approfondire qualche punto o vuoi un esercizio pratico? 😊

# Modulo 

Resto della divisione intera

```javascript
console.log(10 % 3); // Output: 1
console.log(8 % 2); // Output: 0
```

# Esercizi

- [1 Esercizio](Esercizi/1_Esercizio/script.js)
- [2 Esercizio](Esercizi/2_Esercizio/script.js)
- [3 Esercizio](Esercizi/3_Esercizio/lesson00.js)
- [4 Esercizio](Esercizi/4_Esercizio/fakeNodeStore//)
- [5 Esercizio](Esercizi/5_Esercizio/Index.html)
- [6 Esercizio](Esercizi/6_Esercizio/index.html)
