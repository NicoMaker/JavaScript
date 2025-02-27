// Funzione per mostrare il pop-up
const showPopUp = () =>
  (document.getElementById("popUp").style.display = "block");

// Funzione per chiudere il pop-up
const closePopUp = () =>
  (document.getElementById("popUp").style.display = "none");

// Funzione per aggiungere il dato
function addData(event) {
  event.preventDefault(); // Evita il comportamento predefinito del form (submit)

  const dataInput = document.getElementById("dataInput").value,
    errorMessage = document.getElementById("error-message");

  // Verifica che il dato sia inserito
  if (dataInput === "") {
    errorMessage.style.display = "block"; // Mostra il messaggio di errore
    return;
  } else errorMessage.style.display = "none"; // Nascondi il messaggio di errore

  // Aggiungi il dato alla tabella
  const table = document
      .getElementById("dataTable")
      .getElementsByTagName("tbody")[0],
    newRow = table.insertRow(),
    cell1 = newRow.insertCell(0),
    cell2 = newRow.insertCell(1);
  cell1.textContent = dataInput;
  cell2.innerHTML =
    '<span class="cestino" onclick="removeRow(this)">&#x1F5D1;</span>'; // Icona cestino

  // Ordina la tabella dopo l'aggiunta dei dati
  sortTable();

  // Chiudi il pop-up
  closePopUp();

  // Resetta il campo di input
  document.getElementById("dataInput").value = "";
}

// Funzione per rimuovere una riga
function removeRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);

  // Ordina la tabella dopo aver rimosso una riga
  sortTable();
}

// Funzione per ordinare la tabella
function sortTable() {
  const table = document.getElementById("dataTable"),
    rows = Array.from(table.rows).slice(1); // Ottieni tutte le righe tranne l'intestazione
  const sortedRows = rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[0].textContent,
      cellB = rowB.cells[0].textContent;

    // Confronta le celle in base al contenuto (puoi cambiare il criterio di ordinamento)
    return cellA.localeCompare(cellB);
  });

  // Aggiungi le righe ordinate di nuovo alla tabella
  sortedRows.forEach((row) => table.appendChild(row));
}
