class Persona {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  getData() {
    return `${this.name} ${this.surname}`;
  }

  setData(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

aPerson = new Persona("Alessandro", "Arciero");

document.addEventListener("DOMContentLoaded", () => {
  const editbox = document.getElementById("editbox");
  const button = document.getElementById("populateButton");
  const anotherButton = document.getElementById("anotherButton");

  button.addEventListener("click", () => {
    editbox.value = aPerson.getData();
  });
  anotherButton.addEventListener("click", () => {
    editbox.value = "Hai cambiato nome";
    aPerson.setData("Mario", "Rossi");
  });
  button.addEventListener("mouseleave", () => {
    editbox.value = "";
  });
  editbox.addEventListener("input", () => {
    button.innerHTML = "un altro bottone";
  });
});
