class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.expression = "";
    this.isRadians = true;
  }

  appendNumber(num) {
    this.expression += num;
    this.updateDisplay();
  }

  appendOperator(operator) {
    if (operator === "!") this.expression += operator;
    else if (operator.includes("(")) this.expression += operator;
    else this.expression += ` ${operator} `;
    this.updateDisplay();
  }

  clear() {
    this.expression = "";
    this.updateDisplay();
  }

  toggleRadians() {
    this.isRadians = !this.isRadians;
    alert(this.isRadians ? "Modalità Radianti" : "Modalità Gradi");
  }

  // Funzione per calcolare il fattoriale
  factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * this.factorial(n - 1);
  }

  calculate() {
    try {
      let expr = this.expression
        .replace(
          /Math\.sin\(/g,
          `Math.sin(${this.isRadians ? "" : "Math.PI/180*"} `
        )
        .replace(
          /Math\.cos\(/g,
          `Math.cos(${this.isRadians ? "" : "Math.PI/180*"} `
        )
        .replace(
          /Math\.tan\(/g,
          `Math.tan(${this.isRadians ? "" : "Math.PI/180*"} `
        )
        .replace(
          /Math\.asin\(/g,
          `Math.asin(${this.isRadians ? "" : "Math.PI/180*"} `
        )
        .replace(
          /Math\.acos\(/g,
          `Math.acos(${this.isRadians ? "" : "Math.PI/180*"} `
        )
        .replace(
          /Math\.atan\(/g,
          `Math.atan(${this.isRadians ? "" : "Math.PI/180*"} `
        )
        .replace(
          /Math\.log10\(/g,
          `Math.log10(` // logaritmo base 10
        )
        .replace(
          /Math\.log\(/g,
          `Math.log(` // logaritmo naturale (ln)
        )
        .replace(
          /Math\.exp\(/g,
          `Math.exp(` // esponenziale e^x
        )
        .replace(
          /(\d+)\^(\d+)/g,
          (match, base, exp) => `${base}**${exp}` // elevamento a potenza x^y
        )
        .replace(
          /(\d+)!/g,
          (match, num) => `${this.factorial(Number(num))}` // Fattoriale
        );

      // Gestire il logaritmo con base specificata
      if (this.expression.includes("log")) {
        let base = prompt("Inserisci la base per il logaritmo:", "10");
        if (base) {
          expr = expr.replace(/Math\.log\((.*?)\)/g, (match, p1) => {
            return `Math.log(${p1}) / Math.log(${base})`;
          });
        }
      }

      // Calcolare l'espressione
      let result = eval(expr);

      // Verificare se il risultato è un numero intero
      if (Number.isInteger(result))
        this.expression = result.toString(); // Nessun decimale per interi
      else this.expression = result.toFixed(2); // Due decimali per i numeri con parte frazionaria
    } catch (error) {
      this.expression = "Errore";
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElement.value = this.expression;
  }
}

// Inizializza la calcolatrice dopo che il DOM è stato caricato
document.addEventListener("DOMContentLoaded", () => {
  window.calculator = new Calculator(document.getElementById("result"));
});
