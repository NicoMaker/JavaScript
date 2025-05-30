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
    if (lastInput === "=") expression = "";

    // Se il digit è un punto, verifica se è già presente nel numero corrente
    if (digit === ".") {
      // Controlla l'ultimo numero inserito per evitare più di un punto decimale
      let lastNumber = expression.split(/[\+\-\×\÷]/).pop();
      if (lastNumber.includes(".")) {
        alert("Non puoi inserire più di un punto decimale per numero!");
        return;
      }
    }

    // Controlla se la lunghezza del numero supera le 10 cifre
    let newExpression = expression + digit,
      newNumLength = newExpression.replace(/[^\d.]/g, "").length;

    if (newNumLength <= 10) {
      expression += digit;
      display.textContent = expression;
      lastInput = digit;
    } else alert("Non puoi inserire più di 10 cifre!");
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
        let operator = tokens[i],
          num = parseFloat(tokens[i + 1]);

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
      // Limita il risultato a 2 decimali
      display.textContent = total.toFixed(2);
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
