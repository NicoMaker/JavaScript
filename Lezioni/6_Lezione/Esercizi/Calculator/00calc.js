document.addEventListener("DOMContentLoaded", function () {
  let display = document.getElementById("display"),
    buttons = document.querySelectorAll("button"),
    operand1 = "",
    operand2 = "",
    operator = "",
    isSecondOperand = false,
    decimalAdded = false;

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let value = this.textContent;

      if (!isNaN(value)) addDigit(value);
      else if (["+", "-", "×", "÷"].includes(value)) setOperator(value);
      else if (value === "=") calculateResult();
      else if (value === "C") resetCalculator();
      else if (value === ".") addDecimal();
    });
  });

  function addDigit(digit) {
    if (!isSecondOperand) {
      if (operand1 === "0") operand1 = digit;
      else operand1 += digit;
      display.textContent = operand1;
    } else {
      if (operand2 === "0") operand2 = digit;
      else operand2 += digit;
      display.textContent = operand1 + " " + operator + " " + operand2;
    }
  }

  function setOperator(op) {
    if (operand1 !== "") {
      if (operand2 !== "") {
        calculateResult();
      }
      operator = op;
      isSecondOperand = true;
      decimalAdded = false;
      display.textContent = operand1 + " " + operator;
    }
  }

  function addDecimal() {
    if (!isSecondOperand && !decimalAdded) {
      operand1 += ".";
      decimalAdded = true;
      display.textContent = operand1;
    } else if (isSecondOperand && !decimalAdded) {
      operand2 += ".";
      decimalAdded = true;
      display.textContent = operand1 + " " + operator + " " + operand2;
    }
  }

  function calculateResult() {
    if (operand1 !== "" && operand2 !== "" && operator !== "") {
      let num1 = parseFloat(operand1),
        num2 = parseFloat(operand2),
        result;

      switch (operator) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "×":
          result = num1 * num2;
          break;
        case "÷":
          result = num2 !== 0 ? num1 / num2 : "Errore";
          break;
        default:
          result = "Errore";
      }

      display.textContent = result;
      operand1 = result.toString();
      operand2 = "";
      operator = "";
      isSecondOperand = false;
      decimalAdded = operand1.includes(".");
    }
  }

  function resetCalculator() {
    operand1 = "";
    operand2 = "";
    operator = "";
    isSecondOperand = false;
    decimalAdded = false;
    display.textContent = "0";
  }
});
