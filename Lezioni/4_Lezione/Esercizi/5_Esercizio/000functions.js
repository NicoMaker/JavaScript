// 🔹 1. Funzione Normale: Somma di numeri interi
function somma(a, b) {
  return a + b;
}
console.log(somma(3, 5)); // Output: 8

// 🔹 2. Funzione Normale: Concatenazione di stringhe
function concatena(str1, str2) {
  return `${str1} ${str2}`;
}
console.log(concatena("Ciao", "Mondo!")); // Output: Ciao Mondo!

// 🔹 3. Funzione Anonima: Moltiplicazione (assegnata a una variabile)
const moltiplica = function (a, b) {
  return a * b;
};
console.log(moltiplica(4, 5)); // Output: 20

// 🔹 4. Arrow Function: Calcolo area di un rettangolo
const areaRettangolo = (larghezza, altezza) => larghezza * altezza;
console.log(areaRettangolo(5, 10)); // Output: 50

// 🔹 5. Arrow Function: Messaggio di benvenuto (con un solo parametro)
const benvenuto = (nome) => `Ciao, ${nome}!`;
console.log(benvenuto("Mario")); // Output: Ciao, Mario!

// 🔹 6. Funzione con Argomenti Predefiniti
function saluta(nome = "Ospite") {
  return `Ciao, ${nome}!`;
}
console.log(saluta()); // Output: Ciao, Ospite!
console.log(saluta("Anna")); // Output: Ciao, Anna!

// 🔹 7. Funzione con Rest Parameter
function sommaTutti(...numeri) {
  return numeri.reduce((acc, num) => acc + num, 0);
}
console.log(sommaTutti(1, 2, 3, 4)); // Output: 10

// 🔹 8. Funzione con Destructuring degli Argomenti
function stampaIndirizzo({ via, città }) {
  return `Indirizzo: ${via}, ${città}`;
}
const indirizzo = { via: "Via Roma", città: "Milano", cap: 20100 };
console.log(stampaIndirizzo(indirizzo)); // Output: Indirizzo: Via Roma, Milano

// 🔹 9. Immediately Invoked Function Expression (IIFE)
(function () {
  console.log("Questa funzione viene eseguita subito!"); // Output: Questa funzione viene eseguita subito!
})();

// 🔹 10. Funzione IIFE con Argomenti
((nome) => {
  console.log(`Ciao, ${nome}!`); // Output: Ciao, Luca!
})("Luca");

/*
NON ANDARE OLTRE... PER ORA
*/

// 🔹 11. Funzione Generatore: Restituisce valori con yield
function* contatore() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = contatore();
console.log(gen.next().value); // Output: 1
console.log(gen.next().value); // Output: 2

// 🔹 12. Funzione Asincrona con async/await
async function fetchData() {
  const dati = new Promise((resolve) =>
    setTimeout(() => resolve("Dati ricevuti!"), 1000)
  );
  const risultato = await dati;
  return risultato;
}
fetchData().then(console.log); // Output: Dati ricevuti!

// 🔹 13. Funzione Callback: Esecuzione dopo un'operazione
function eseguiDopo(callback) {
  console.log("Prima operazione...");
  callback();
}
eseguiDopo(() => console.log("Dopo operazione!")); // Output: Prima operazione... \n Dopo operazione!

// 🔹 14. Funzione con Return Multiplo (Oggetto)
function datiPersona(nome, età) {
  return { nome, età, descrizione: () => `Nome: ${nome}, Età: ${età}` };
}
const persona = datiPersona("Marco", 28);
console.log(persona.descrizione()); // Output: Nome: Marco, Età: 28

// 🔹 15. Funzione Ricorsiva: Calcolo fattoriale
function fattoriale(n) {
  if (n <= 1) return 1;
  return n * fattoriale(n - 1);
}
console.log(fattoriale(5)); // Output: 120
