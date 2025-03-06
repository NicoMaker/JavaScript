class Persona {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Peoople {
  constructor(name, eta) {
    this.name = name;
    this.eta = eta;
  }

  descrizione() {
    return `Mi chiamo ${this.name} e ho ${this.eta} anni.`;
  }
}

class Matematica {
  static somma(a, b) {
    return a + b;
  }

  static sommaarrow = (a, b) => a + b;
}

console.log(Matematica.somma(2, 3));
console.log(Matematica.sommaarrow(2, 3));
