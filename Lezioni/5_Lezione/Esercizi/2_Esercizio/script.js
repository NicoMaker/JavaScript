let one = document.getElementById("one");
let two = document.getElementById("two");
let sum = document.getElementById("sum");
let result = document.getElementById("result");
let label = document.getElementById("label");
let reset = document.getElementById("reset");
let operand1 = 0;
let operand2 = 0;
let sum_solution = 0;
let operator;

function executesum(operand1, operand2) {
  return operand1 + operand2;
}

one.addEventListener("click", () => {
  if (operand1 === 0) {
    operand1 = 1;
  } else {
    operand2 = 1;
  }
});

two.addEventListener("click", () => {
  if (operand1 === 0) {
    operand1 = 2;
  } else {
    operand2 = 2;
  }

  console.log("Operand2 " + operand2);
});

sum.addEventListener("click", () => {
  operator = "+";

  label.innerHTML = sum_solution;
});

reset.addEventListener("click", () => {
  label.innerHTML = "0";
  operand1 = 0;
  operand2 = 0;
});

result.addEventListener("click", () => {
  if (operator === "+") {
    label.innerHTML = executesum(operand1, operand2);
  }
});

console.log("Eseguito");
