// https://developer.mozilla.org/en-US/docs/Web/JavaScript
// *******
// console è un oggetto globale fornito da JavaScript.
// console.log è una funzione (un metodo dell'oggetto console).

//console.log("questo è un messaggio 2");
//console.error("This is an error"); // Mostra un messaggio di errore
//console.warn("This is a warning"); // Mostra un avviso
//console.info("This is a info"); // Mostra una informazione
//console.table({ name: "Alice", age: 25, surname: "pluto" }); // Visualizza i dati in formato tabella
//let x = 5;
//let y = 5;
//console.assert(x + y == 10, "Expression returned 'false'");
// ******

// throw new Error("Stopping execution"); // Interrompe il codice

// ******
//console.log("nuovo ciao");

// console.time("Timer");

/* commento   
    ssfd
    saafsf
    safasfas
    sfasfs
*/

for (let i = 0; i < 15; i++) {
  console.log("ciao");
}
let x = 10;

console.log(x);
// incremento x di 2. x=12
x = x + 2;
console.log(x);
// incremento x di 1 x=13
x = x + 1; // x++;

console.log(x);

let contatore = 20;
console.log(contatore);
console.log(contatore + x);
let totale = contatore + x;

let uno = 11;
let due = 20;
console.log(uno + due);
//uno = uno + due;
console.log("nuovo uno: " + uno);
console.log("stringa1 " + uno + " stringa2 " + due + uno);
console.log(uno + due + uno);

if (uno == 10) {
  console.log("uno è 10");
}
if (uno != 10) {
  console.log("uno è diverso da 10");
}

// + - * /
if (uno == 10) {
  console.log("uno è 10");
} else {
  console.log("uno è diverso da 10");
}

uno = 11;
due = 21;

if (uno == 10 && due == 20) {
  console.log("uno è 10 e due è 20");
}

if (uno == 10 || due == 20) {
  console.log("uno è 10 oppure due è 20");
}

let voto = 85;

if (voto >= 90) {
  console.log("Ottimo! Hai preso un ottimo voto");
} else if (voto >= 80) {
  console.log("Molto bene! Hai preso un buon voto");
} else if (voto >= 70) {
  console.log("Buono! Hai preso un discreto voto");
} else if (voto >= 60) {
  console.log("Sufficiente! ");
} else {
  console.log("Insufficiente. Devi migliorare.");
}

if (voto >= 90) {
  console.log("Ottimo! Hai preso un ottimo voto");
}
if (voto >= 80) {
  console.log("Molto bene! Hai preso un buon voto");
}
if (voto >= 70) {
  console.log("Buono! Hai preso un discreto voto");
}
if (voto >= 60) {
  console.log("Sufficiente! ");
}
if (voto < 60) {
  console.log("Insufficiente. Devi migliorare.");
}

//console.log("totale: " + totale + " mele " + contatore + totale);

// console.timeEnd("Timer");

//throw new Error("Stopping execution"); // Interrompe il codice

// ******
/*
for (let i = 0; i < 5; i++) {
  console.count("myLabel");
}
*/

// ******
/*
console.log("Messaggio 1");
console.group("Messaggi");
console.log("Messaggio 1");
console.log("Messaggio 2");
console.groupEnd();
console.log("Messaggio 2");
*/
// *******
/*
for (let i = 1; i <= 12; i++) {
  if (i % 2 != 0) {
    console.log(i);
  }
}*/

// *******
// array vettore
const numbers = [1, 1, 3, 4, 5, 8, 10, 2, 5];

let sum = 0;

for (let num of numbers) {
  sum += num; // sum = sum + num;
}
console.log(numbers + " The sum is: " + sum);
sum = 0;

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(sum);

throw new Error("Stopping execution"); // Interrompe il codice
// *******

const fruits = ["apple", "banana", "cherry", "date"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// FINE LESSON 1

// ***********+**
// ************** LESSON 2
// **************

var x = 10; // Variabile con scope globale o di funzione
let y = 20; // Variabile con scope di blocco
const z = 30; // Costante (non modificabile)

// const in caso di array, legittimo
const persona = { nome: "Mario", età: 30 };
persona.nome = "Luca"; // Valido
console.log(persona); // { nome: "Luca", età: 30 }
// ma questo no:
// persona = {}; // TypeError: Assignment to constant variable.

let somma = 5 + 3; // 8
let sottrazione = 5 - 3; // 2
let moltiplicazione = 5 * 3; // 15
let divisione = 5 / 3; // 1.6667
let modulo = 5 % 3; // 2 (resto della divisione)
let potenza = 5 ** 3; // 125

console.log(5 == "5"); // true (converte il tipo)
console.log(5 === "5"); // false (confronta anche il tipo)
console.log(5 > 3); // true
console.log(5 <= 3); // false

console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false

// *******
const colors = ["red", "green", "blue"];

for (let color of colors) {
  console.log(color);
}

throw new Error("Stopping execution"); // Interrompe il codice

// *******

for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) {
    console.log(`${i} is divisible by both 3 and 5`);
  }
}

// *******

const word = "JavaScript";
console.log(word);
for (let i = 0; i < word.length; i++) {
  console.log(word[i]);
}

for (let i = 0; i <= 20; i += 2) {
  console.log(i); // Stampa i numeri pari tra 0 e 20
}

// *******

const rows = 5;

for (let i = 1; i <= rows; i++) {
  console.log("*".repeat(i));
}

const num1 = parseFloat(prompt("Enter the first number:"));
const num2 = parseFloat(prompt("Enter the second number:"));
const operator = prompt("Enter the operator (+, -, *, /):");
let result;

switch (operator) {
  case "+":
    result = num1 + num2;
    break;
  case "-":
    result = num1 - num2;
    break;
  case "*":
    result = num1 * num2;
    break;
  case "/":
    result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
    break;
  default:
    result = "Invalid operator";
}

console.log("Result:", result);

// ******** ARRAYS

const metodiArrayJS = [
  "push", // Aggiunge un elemento alla fine
  "pop", // Rimuove l'ultimo elemento
  "unshift", // Aggiunge un elemento all'inizio
  "shift", // Rimuove il primo elemento
  "map", // Trasforma ogni elemento in un nuovo array
  "filter", // Filtra elementi in base a una condizione
  "reduce", // Riduce un array a un singolo valore
  "forEach", // Itera sugli elementi senza creare un nuovo array
  "find", // Trova il primo elemento che soddisfa una condizione
  "findIndex", // Trova l'indice del primo elemento che soddisfa una condizione
  "some", // Controlla se almeno un elemento soddisfa una condizione
  "every", // Controlla se tutti gli elementi soddisfano una condizione
  "includes", // Controlla se un valore è presente nell'array
  "indexOf", // Trova l'indice di un valore (o -1 se non presente)
  "lastIndexOf", // Trova l'ultimo indice di un valore
  "concat", // Unisce due o più array
  "slice", // Estrae una porzione dell'array senza modificarlo
  "splice", // Aggiunge o rimuove elementi modificando l'array originale
  "sort", // Ordina gli elementi dell'array
  "reverse", // Inverte l'ordine degli elementi
  "flat", // Appiattisce un array multidimensionale
  "flatMap", // Mappa e appiattisce l'array in un solo passaggio
  "join", // Converte l'array in una stringa con un separatore
  "toString", // Converte l'array in una stringa
];

console.log(metodiArrayJS);

const numeri = [1, 2, 3, 4, 5];

// Raddoppia ogni numero
const numeriDoppi = numeri.map((num) => num * 2);
console.log(numeriDoppi); // [2, 4, 6, 8, 10]

// Filtra solo i numeri pari
const numeriPari = numeri.filter((num) => num % 2 === 0);
console.log(numeriPari); // [2, 4]

// Somma tutti i numeri
somma = numeri.reduce((acc, num) => acc + num, 0);
console.log(somma); // 15

const parole = ["Ciao", "come", "stai?"];
// Usa "frase" invece di "acc"
const frase = parole.reduce((frase, parola) => frase + " " + parola, "");
console.log(frase); // " Ciao come stai?"

// Controlla se c'è almeno un numero pari
const numeri0 = [3, 5, 7, 9];
const haPari = numeri0.some((num) => num % 2 === 0);
console.log(haPari); // false

// Controlla se tutti i numeri sono pari
const numeri1 = [2, 4, 6, 8];
const tuttiPari = numeri1.every((num) => num % 2 === 0);
console.log(tuttiPari); // true

// aggiunge il quadrato di i alla fine dell'array
const squares = [];
for (let i = 1; i <= 10; i++) {
  squares.push(i * i); // Aggiungi il quadrato di i
}
console.log(squares);

// Rimuove l'ultimo elemento e lo salva in una variabile
const numeri3 = [10, 20, 30, 40, 50];
const ultimoNumero = numeri3.pop();
console.log(ultimoNumero); // 50 (l'elemento rimosso)
console.log(numeri3); // [10, 20, 30, 40] (array modificato)

//Rimuove elementi finché l'array non è vuoto.
const stack = ["A", "B", "C", "D"];
while (stack.length > 0) {
  console.log("Elemento rimosso:", stack.pop());
}
console.log("Array finale:", stack); // []

// ********

// matrice

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(`Element at [${row}][${col}]:`, matrix[row][col]);
  }
}

// ********

const amatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (const row of matrix) {
  for (const element of row) {
    console.log(element);
  }
}

// *******

// *******

let count = 0;

for (let i = 0; i < 3; ) {
  console.log("Count:", count);
  count++;
  if (count >= 5) break;
}

// *******

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const concatenatedArray = array1.concat(array2);

console.log(concatenatedArray); // Output: [1, 2, 3, 4, 5, 6]

// ******
// spread operator

const array11 = [1, 2, 3];
const array22 = [4, 5, 6];
const concatenatedArray1 = [...array11, ...array22];

console.log(concatenatedArray1); // Output: [1, 2, 3, 4, 5, 6]

// ********

const array = ["Banana", "Mela", "Arancia", "Pera"];
array.sort();

console.log(array); // Output: ["Arancia", "Banana", "Mela", "Pera"]

// ******* reference to original array....

//JavaScript confronta il primo paio di numeri: 10 (a) e 5 (b).
//Calcola a - b: 10 - 5 = 5.
//Poiché il risultato è positivo, 10 deve essere posizionato dopo 5.
//Confronta il secondo paio: 10 (a) e 8 (b).
//Calcola a - b: 10 - 8 = 2.
//Ancora positivo, quindi 10 rimane dopo 8.
//Ripete il confronto per tutti gli altri numeri, riorganizzandoli.

// start    [10,2,5,8,1]
// step 1:  [2,10,5,8,1];   10-2 positivo
// step 2:  [2,5,10,8,1];   10-5 positivo
// step 3:  [2,5,8,10,1];   10-8 positivo
// step 4:  [2,5,8,1,10];   10-1 positivo
// step 6:  8-1
// step 7:  5-1
// ....

const numbers1 = [10, 2, 5, 8, 1];
numbers1.sort((a, b) => b - a);

console.log(numbers1); // Output: [1, 2, 5, 8, 10]

// *********
throw new Error("Stopping execution"); // Interrompe il codice

const array10 = ["Mela", "Pera"];
const array20 = ["Banana", "Arancia"];
const combinedArray = [...array10, ...array20].sort();

console.log(combinedArray);
// Output: ["Arancia", "Banana", "Mela", "Pera"]

// *********

// spread operator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max

const values = [10, 5, 12, 3, 4, 9, 11];
const maxValue = Math.max(...values);
// const maxValue = Math.max(5, 1);
console.log(maxValue);
throw new Error("Stopping execution"); // Interrompe il codice

// *********
