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

const ErrorType = () => {
  throw new Error("Stopping Execution");
};

Votazioni(90);
ArrayStampa([1, 2, 3, 4, 5]);
SommaArray([1, 2, 3, 4, 5]);
Sommaarrayeasy([1, 2, 3, 4, 5]);
EsempiXYZ();
ExampleStrutureObject();
Votazioni(70);
Modules();
// ErrorType();
