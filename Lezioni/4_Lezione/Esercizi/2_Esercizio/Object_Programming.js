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
