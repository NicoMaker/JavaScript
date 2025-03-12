let one = document.getElementById("one");
let two = document.getElementById("two");
let sum = document.getElementById("sum");
let result = document.getElementById("result");
let label = document.getElementById("label");
let reset = document.getElementById("reset");
let operand1 = 0;
let operand2 = 0;
let sum_solution = 0;

one.addEventListener("click", () => {
  operand1 = 1;
  console.log("Operand1 set to " + operand1); // Verifica che operand1 venga settato
});

two.addEventListener("click", () => {
  operand2 = 2;
  console.log("Operand2 set to " + operand2); // Verifica che operand2 venga settato
});

sum.addEventListener("click", () => {
  // Verifica se operand1 e operand2 sono definiti prima di sommare
  console.log("Operand1: " + operand1); // Verifica il valore di operand1
  console.log("Operand2: " + operand2); // Verifica il valore di operand2
  
  if (operand1 !== 0 && operand2 !== 0) {
    sum_solution = operand1 + operand2;
    console.log("Sum solution: " + sum_solution);
    label.innerHTML = sum_solution; // Visualizza la somma
  } else {
    console.log("Please select both operands before summing.");
    label.innerHTML = "0"; // Imposta "0" se non sono selezionati entrambi gli operandi
  }
});

reset.addEventListener("click", () => {
  label.innerHTML = "0";
  operand1 = 0;
  operand2 = 0;
  sum_solution = 0; // Azzera anche la soluzione
  console.log("Values reset.");
});

result.addEventListener("click", () => {
  label.innerHTML = sum_solution;
  console.log("Displayed result: " + sum_solution);
});

console.log("Eseguito");
