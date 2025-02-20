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

/*
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

//console.log("totale: " + totale + " mele " + contatore + totale);

// console.timeEnd("Timer");

*/

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

const numbers = [1, 1, 3, 4, 5, 8, 10, 2, 5];
let sum = 0;

for (let num of numbers) sum += num; // sum = sum + num;

console.log(numbers + " The sum is: " + sum);

throw new Error("Stopping execution"); // Interrompe il codice
// *******

const fruits = ["apple", "banana", "cherry", "date"];

for (let i = 0; i < fruits.length; i++) console.log(fruits[i]);
// FINE LESSON 1

// *******
const colors = ["red", "green", "blue"];

for (let color of colors) console.log(color);

throw new Error("Stopping execution"); // Interrompe il codice

// *******

for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) console.log(`${i} is divisible by both 3 and 5`);
}

// *******

const word = "JavaScript";
console.log(word);
for (let i = 0; i < word.length; i++) console.log(word[i]);

for (let i = 0; i <= 20; i += 2) console.log(i); // Stampa i numeri pari tra 0 e 20

// *******

const rows = 5;

for (let i = 1; i <= rows; i++) console.log("*".repeat(i));

// *******
/*
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
*/

// ********

const squares = [];

for (let i = 1; i <= 10; i++) squares.push(i * i); // Aggiungi il quadrato di i

console.log(squares);

// ********

// matrice

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++)
    console.log(`Element at [${row}][${col}]:`, matrix[row][col]);
}

// ********

const amatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (const row of matrix) {
  for (const element of row) console.log(element);
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

const array1 = [1, 2, 3],
  array2 = [4, 5, 6],
  concatenatedArray = array1.concat(array2);

console.log(concatenatedArray); // Output: [1, 2, 3, 4, 5, 6]

// ******
// spread operator

const array11 = [1, 2, 3],
  array22 = [4, 5, 6],
  concatenatedArray1 = [...array11, ...array22];

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

const array10 = ["Mela", "Pera"],
  array20 = ["Banana", "Arancia"],
  combinedArray = [...array10, ...array20].sort();

console.log(combinedArray);
// Output: ["Arancia", "Banana", "Mela", "Pera"]

// *********

// spread operator
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max

const values = [10, 5, 12, 3, 4, 9, 11],
  maxValue = Math.max(...values);
// const maxValue = Math.max(5, 1);
console.log(maxValue);
throw new Error("Stopping execution"); // Interrompe il codice

// *********
