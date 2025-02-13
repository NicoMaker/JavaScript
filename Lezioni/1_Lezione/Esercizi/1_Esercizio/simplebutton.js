document.addEventListener("DOMContentLoaded", () => {
  const editbox = document.getElementById("editbox"),
    button = document.getElementById("populateButton"),
    anotherButton = document.getElementById("anotherButton"),
    terzobottone = document.getElementById("terzobottone");

  // Popola l'editbox con un testo predefinito
  button.addEventListener("click", () => {
    editbox.value = "Hello, this is a populated string!";
  });

  // Popola l'editbox con un altro messaggio
  anotherButton.addEventListener("click", () => {
    editbox.value = "Hai cliccato il nuovo bottone";
  });

  // Svuota l'editbox e crea/rimuove un elemento quando si clicca su 'terzobottone'
  let elementCreated = false;
  terzobottone.addEventListener("click", () => {
    editbox.value = "";

    if (!elementCreated) {
      const newElement = document.createElement("div");
      newElement.textContent = "Esco ed esco!";
      newElement.id = "newElement";
      document.body.appendChild(newElement);
      elementCreated = true;
    } else {
      const elementToRemove = document.getElementById("newElement");
      if (elementToRemove) elementToRemove.remove();
      elementCreated = false;
    }
  });

  // Cambia il testo del bottone quando l'editbox viene modificato
  editbox.addEventListener("input", () => {
    button.innerHTML = "un altro bottone";
  });
});
