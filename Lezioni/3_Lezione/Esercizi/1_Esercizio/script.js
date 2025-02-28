function Votazioni(voto) {
  if (voto >= 90) console.log("Ottimo! Hai preso un bel voto");
  else if (voto >= 80) console.log("Molto bene! Hai preso un voto buono");
  else if (voto >= 70) console.log("Bene! Hai preso un voto discreto");
  else if (voto >= 60) console.log("Bene! Hai preso un voto sufficiente");
  else console.log("Mi dispiace! Hai preso un voto insufficiente");
}

function ArrayStampa(array) {
  for (let num of array) console.log(num);
}

function SommaArray(array) {
  let somma = 0;
  for (let num of array) somma += num;
  console.log(somma);
}

function Sommaarrayeasy(array) {
  let somma = 0;
  for (let i = 0; i <= array.length; i++) somma += i;
  console.log(somma);
}

function EsempiXYZ() {
  var x = 10;
  let y = 20;
  const z = 30;

  console.log(`x: ${x}, y: ${y}, z: ${z}`);
}

function ExampleStrutureObject() {
  const person = {
    name: "Mario",
    surname: "Rossi",
    age: 30,
  };

  person.name = "Luca";
  console.log(person);
}

function Modules() {
  for (let i = 0; i <= 100; i++) {
    if (i % 15 === 0 && i !== 0) console.log(`${i} è divisibile per 3 e 5`);
  }
}

function StampaStringa() {
  const word = "JavaScript";

  for (let i = 0; i < word.length; i++) console.log(word[i]);
}

function StampaStingaof(){
  const word = "JavaScript";

  for (let lettera of word) console.log(lettera);
}

function Stampapari() {
  for (let i = 0; i <= 100; i += 2) console.log(i);
}

function StampaPariModulo() {
  for (let i = 0; i <= 100; i++) {
    if (i % 2 === 0) console.log(i);
  }
}

function StampaDispari() {
  for (let i = 1; i <= 100; i += 2) console.log(i);
}

function StampaDispariModulo() {
  for (let i = 0; i <= 100; i++) {
    if (i % 2 === 1) console.log(i);
  }
}

const ErrorType = () => {
  throw new Error("Stopping Execution");
};

function filtraPariDispari(array) {
  const numeriPari = array.filter((num) => num % 2 === 0),
    numeriDispari = array.filter((num) => num % 2 !== 0);

  console.log(`Numeri Pari: ${numeriPari}`);
  console.log(`Numeri Dispari: ${numeriDispari}`);
}

function unisciFrasi(array) {
  const risultato = array.reduce((acc, frase) => `${acc} ${frase}`);
  console.log(risultato);
}

function verificaPariDispari(array) {
  const tuttiPari = array.every((num) => num % 2 === 0),
    tuttiDispari = array.every((num) => num % 2 !== 0);

  if (tuttiPari) console.log("Tutti i numeri sono pari.");
  else if (tuttiDispari) console.log("Tutti i numeri sono dispari.");
  else console.log("Ci sono sia numeri pari che dispari.");
}

function eliminadati() {
  const stack = ["A", "B", "C", "D", "E"];

  while (stack.length > 0) console.log(`Elemento eliminato: ${stack.pop()}`);
  console.log(`Array Finale: ${stack}`);
}

function eliminadatiPariDispari(tipo) {
  let stack = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; // Array di lettere

  // Condizione per eliminare lettere con indice pari o dispari
  const condizione =
    tipo === "pari"
      ? (index) => index % 2 === 0 // Se tipo è "pari", elimina lettere con indice pari
      : (index) => index % 2 !== 0; // Se tipo è "dispari", elimina lettere con indice dispari

  // Rimuovo gli elementi che soddisfano la condizione
  let i = 0;
  while (i < stack.length) {
    if (condizione(i)) {
      console.log(`Elemento eliminato: ${stack[i]}`);
      stack.splice(i, 1); // Rimuovo l'elemento all'indice 'i'
      // Non incrementare 'i' per rimanere sul nuovo elemento in posizione 'i'
    } else i++; // Incrementa solo quando non viene rimosso un elemento
  }

  console.log(`Array finale: ${stack}`);
}

// Votazioni(90);
// ArrayStampa([1, 2, 3, 4, 5]);
// SommaArray([1, 2, 3, 4, 5]);
// Sommaarrayeasy([1, 2, 3, 4, 5]);
// EsempiXYZ();
// ExampleStrutureObject();
// Votazioni(70);
// Modules();
// StampaStringa();
// Stampapari();
// StampaPariModulo();
// StampaDispari();
//StampaDispariModulo();
// unisciFrasi(["ciao", "come", "stai"]);
// filtraPariDispari([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Esempio di utilizzo
// verificaPariDispari([2, 4, 6]); // Tutti i numeri sono pari
// verificaPariDispari([1, 3, 5]); // Tutti i numeri sono dispari
// verificaPariDispari([2, 3, 4]); // Ci sono sia numeri pari che dispari

// eliminadati();

// Esempio di utilizzo
// eliminadatiPariDispari("pari"); // Elimina lettere con indice pari
// eliminadatiPariDispari("dispari"); // Elimina lettere con indice dispari

// ErrorType();