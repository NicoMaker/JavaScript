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

  // Rimuovi numeri che non corrispondono alla tipologia selezionata
  removeNumbersNotMatchingType(type);

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

    // Ordina la lista dopo aver aggiunto il numero
    sortList(type);
  } else {
    alert(
      `Il numero non corrisponde alla tipologia selezionata (${
        type === "even" ? "Pari" : "Dispari"
      }).`
    );
  }

  inputNumber.value = "";
});

// Funzione per rimuovere i numeri che non corrispondono al tipo selezionato
function removeNumbersNotMatchingType(type) {
  const listItems = document.querySelectorAll(".number-item");
  listItems.forEach((item) => {
    const number = parseInt(item.innerHTML);
    if (
      (type === "even" && number % 2 !== 0) ||
      (type === "odd" && number % 2 === 0)
    ) {
      sum -= number; // Sottrai il numero dalla somma
      sumParagraph.textContent = `Somma: ${sum}`; // Aggiorna la somma
      item.remove(); // Rimuovi l'elemento dalla lista
    }
  });
}

// Funzione per ordinare la lista in base alla tipologia selezionata
function sortList(type) {
  const listItems = Array.from(document.querySelectorAll(".number-item")),
    sortedItems = listItems.sort((a, b) => {
      const numA = parseInt(a.innerHTML),
        numB = parseInt(b.innerHTML);

      if (type === "even")
        return numA % 2 === 0 ? numA - numB : 1; // Ordinamento per numeri pari
      else return numA % 2 !== 0 ? numA - numB : 1; // Ordinamento per numeri dispari
    });

  // Aggiungi gli elementi ordinati di nuovo nella lista
  numberList.innerHTML = "";
  sortedItems.forEach((item) => numberList.appendChild(item));
}

// Funzione per svuotare la lista
clearButton.addEventListener("click", () => {
  numberList.innerHTML = "";
  sum = 0; // Reset somma
  sumParagraph.textContent = `Somma: ${sum}`; // Mostra somma aggiornata
  console.log("Lista svuotata!");
});

// Aggiungi un evento per cambiare la categoria e rimuovere numeri non corrispondenti
numberType.addEventListener("change", () => {
  const type = numberType.value;
  removeNumbersNotMatchingType(type);
});
