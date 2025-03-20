document.addEventListener("DOMContentLoaded", () => {
  const listbox = document.getElementById("listbox");
  const createLabelButton = document.getElementById("createLabelButton");
  const labelContainer = document.getElementById("labelContainer");

  createLabelButton.addEventListener("click", () => {
    const selectedValue = listbox.value;

    if (selectedValue) {
      // Crea un div per la label e il pulsante di rimozione
      const labelDiv = document.createElement("div");
      labelDiv.classList.add("label");

      // Crea la label con il testo selezionato
      const label = document.createElement("span");
      label.textContent = selectedValue;

      // Crea il pulsante di rimozione
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button");

      // Aggiunge l'evento per rimuovere la label
      removeButton.addEventListener("click", () => {
        labelContainer.removeChild(labelDiv);
      });

      // Aggiunge la label e il pulsante al contenitore
      labelDiv.appendChild(label);
      labelDiv.appendChild(removeButton);
      labelContainer.appendChild(labelDiv);
    }
  });
});
