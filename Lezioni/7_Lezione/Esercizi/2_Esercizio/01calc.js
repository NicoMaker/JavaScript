document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btnDot = document.getElementById("btnDot");
  const btnPlus = document.getElementById("btnPlus");
  const btnEquals = document.getElementById("btnEquals");
  const btnClear = document.getElementById("btnClear");

  let operand1 = "";
  let operand2 = "";
  let isSecondOperand = false;
  // massima lunghezza di un operando
  const maxLength = 6;

  btn1.addEventListener("click", () => addDigit("1"));
  btn2.addEventListener("click", () => addDigit("2"));
  btnDot.addEventListener("click", () => addDigit("."));
  btnPlus.addEventListener("click", handlePlus);
  btnEquals.addEventListener("click", calculateResult);
  btnClear.addEventListener("click", resetCalculator);

  function addDigit(digit) {
    if (!isSecondOperand) {
      // if (isSecondOperand == false)
      if (validateInput(operand1, digit)) {
        operand1 += digit;
        display.textContent = operand1;
      }
    } else {
      if (validateInput(operand2, digit)) {
        operand2 += digit;
        display.textContent = operand1 + " + " + operand2;
      }
    }
  }

  function validateInput(operand, digit) {
    // se l'operando è più lungo di un valore stabilito
    if (operand.length >= maxLength) return false;
    // se si è premuto un . e c'è già un punto nell'operando
    if (digit === "." && operand.includes(".")) return false;
    // se si è premuto un . e l'operando è vuoto: non iniziare con punto
    if (digit === "." && operand === "") return false;
    return true;
  }

  function handlePlus() {
    if (operand1 !== "") {
      isSecondOperand = true;
      if (!operand1.includes(".")) display.textContent = operand1 + " + ";
      else display.textContent = operand1 + " + ";
    }
  }

  function calculateResult() {
    if (operand1 !== "" && operand2 !== "") {
      const num1 = parseFloat(operand1);
      const num2 = parseFloat(operand2);
      const result = num1 + num2;
      display.textContent = result;
      operand1 = result.toString();
      operand2 = "";
      isSecondOperand = false;
    }
  }

  function resetCalculator() {
    operand1 = "";
    operand2 = "";
    isSecondOperand = false;
    display.textContent = "0";
  }
});
