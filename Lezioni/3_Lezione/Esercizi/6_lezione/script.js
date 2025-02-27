const addButton = document.getElementById("addButton"),
  inputNumber = document.getElementById("inputNumber"),
  numberType = document.getElementById("numberType"),
  numberList = document.getElementById("numberList"),
  clearButton = document.getElementById("clearButton"),
  sumParagraph = document.getElementById("sum");

let sum = 0;

// Funzione per aggiungere numeri alla lista
addButton.addEventListener("click", () => {
  const number = parseInt(inputNumber.value),
    type = numberType.value;

  if (isNaN(number)) {
    alert("Inserisci un numero valido!");
    return;
  }

  if (
    (type === "even" && number % 2 === 0) ||
    (type === "odd" && number % 2 !== 0)
  ) {
    const listItem = document.createElement("li");
    listItem.classList.add("number-item");

    listItem.innerHTML = `${number} <button class="delete-btn">🗑️</button>`;

    // Aggiungi l'elemento alla lista
    numberList.appendChild(listItem);

    // Aggiungi la somma
    sum += number;
    sumParagraph.textContent = `Somma: ${sum}`;

    // Aggiungi funzionalità di eliminazione
    const deleteButton = listItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
      sum -= number; // Sottrai il numero dalla somma
      sumParagraph.textContent = `Somma: ${sum}`; // Aggiorna la somma
      listItem.remove();
    });

    console.log(type === "even" ? "Numeri Pari: " : "Numeri Dispari: ", number);
  } else {
    alert(
      `Il numero non corrisponde alla tipologia selezionata (${
        type === "even" ? "Pari" : "Dispari"
      }).`
    );
  }

  inputNumber.value = "";
});

// Funzione per svuotare la lista
clearButton.addEventListener("click", () => {
  numberList.innerHTML = "";
  sum = 0; // Reset somma
  sumParagraph.textContent = `Somma: ${sum}`; // Mostra somma aggiornata
  console.log("Lista svuotata!");
});
