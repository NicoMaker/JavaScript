document.addEventListener("DOMContentLoaded", function () {
  let display = document.getElementById("display"),
    buttons = document.querySelectorAll("button"),
    expression = "",
    lastInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let value = this.textContent;

      if (!isNaN(value) || value === ".") addDigit(value);
      else if (["+", "-", "×", "÷"].includes(value)) addOperator(value);
      else if (value === "=") calculateResult();
      else if (value === "C") resetCalculator();
    });
  });

  function addDigit(digit) {
    if (lastInput === "=") {
      expression = "";
    }
    expression += digit;
    lastInput = digit;
    display.textContent = expression;
  }

  function addOperator(op) {
    if (expression !== "" && !["+", "-", "×", "÷"].includes(lastInput)) {
      expression += " " + op + " ";
      lastInput = op;
      display.textContent = expression;
    }
  }

  function calculateResult() {
    try {
      let tokens = expression.split(" "),
        total = parseFloat(tokens[0]);

      for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let num = parseFloat(tokens[i + 1]);

        if (isNaN(num)) continue;

        switch (operator) {
          case "+":
            total += num;
            break;
          case "-":
            total -= num;
            break;
          case "×":
            total *= num;
            break;
          case "÷":
            if (num === 0) {
              display.textContent = "Errore";
              return;
            }
            total /= num;
            break;
        }
      }
      display.textContent = total;
      expression = total.toString();
      lastInput = "=";
    } catch (error) {
      display.textContent = "Errore";
    }
  }

  function resetCalculator() {
    expression = "";
    lastInput = "";
    display.textContent = "0";
  }
});
