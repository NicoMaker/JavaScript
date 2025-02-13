document.addEventListener("DOMContentLoaded", () => {
  const editbox = document.getElementById("editbox"),
    button = document.getElementById("populateButton"),
    anotherButton = document.getElementById("anotherButton"),
    terzobottone = document.getElementById("terzobottone"),
    clear = document.getElementById("clear"),
    anotherMouseDownButton = document.getElementById("anotherMouseDownButton"); // Nuovo bottone

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
    editbox.value = "Hai cliccato il bottone dal terzo bottone!";

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

  // Pulsante per pulire l'editbox
  clear.addEventListener("click", () => {
    editbox.value = "";
  });

  // Evento mousedown per un altro bottone
  anotherMouseDownButton.addEventListener("mousedown", () => {
    alert("Hai premuto il mouse su un altro bottone!");
  });

  // Crea un nuovo elemento e lo rimuove cliccando su qualsiasi altra parte della pagina o lo stesso bottone
  let popupCreated = false;
  const popupButton = document.getElementById("popupButton");

  popupButton.addEventListener("click", () => {
    if (!popupCreated) {
      const newPopupElement = document.createElement("div");
      newPopupElement.textContent = "Popup creato! Clicca fuori per rimuoverlo.";
      newPopupElement.id = "popupElement";
      document.body.appendChild(newPopupElement);
      popupCreated = true;

      // Aggiungi un evento per rimuovere l'elemento se clicchi fuori
      document.addEventListener("click", removePopup, true);
    } else {
      const elementToRemove = document.getElementById("popupElement");
      if (elementToRemove) elementToRemove.remove();
      popupCreated = false;
      document.removeEventListener("click", removePopup, true);
    }
  });

  // Funzione per rimuovere il popup cliccando fuori
  function removePopup(event) {
    const popup = document.getElementById("popupElement");
    if (popup && !popup.contains(event.target)) {
      popup.remove();
      popupCreated = false;
      document.removeEventListener("click", removePopup, true);
    }
  }
});
