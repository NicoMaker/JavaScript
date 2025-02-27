// Mostra il pop-up
const showPopUp = () =>
  (document.getElementById("popUp").style.display = "block");

// Chiude il pop-up
const closePopUp = () =>
  (document.getElementById("popUp").style.display = "none");

// Aggiunge un nuovo dato alla tabella
function addData(event) {
  event.preventDefault(); // Evita il comportamento predefinito del form

  const dataInput = document.getElementById("dataInput").value,
    errorMessage = document.getElementById("error-message");

  // Controlla che il campo non sia vuoto
  if (dataInput === "") {
    errorMessage.style.display = "block";
    return;
  } else errorMessage.style.display = "none";

  // Aggiunge il dato alla tabella
  const table = document
      .getElementById("dataTable")
      .getElementsByTagName("tbody")[0],
    newRow = table.insertRow(),
    cell1 = newRow.insertCell(0),
    cell2 = newRow.insertCell(1);
  cell1.textContent = dataInput;
  cell2.innerHTML =
    '<span class="cestino" onclick="removeRow(this)">&#x1F5D1;</span>'; // Icona cestino

  // Ordina la tabella
  sortTable();

  // Chiude il pop-up
  closePopUp();

  // Resetta il campo di input
  document.getElementById("dataInput").value = "";
}

// Rimuove una riga dalla tabella
function removeRow(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  sortTable(); // Riordina dopo la rimozione
}

// Ordina la tabella
function sortTable() {
  const table = document.getElementById("dataTable"),
    rows = Array.from(table.querySelector("tbody").rows),
    sortedRows = rows.sort((rowA, rowB) => {
      const cellA = rowA.cells[0].textContent,
        cellB = rowB.cells[0].textContent;
      return cellA.localeCompare(cellB);
    });

  sortedRows.forEach((row) => table.querySelector("tbody").appendChild(row));
}

// Cancella tutti i dati dalla tabella
function cancelladatidallatabella() {
  const tbody = document.querySelector("#dataTable tbody");
  if (tbody) 
    tbody.innerHTML = "";
}
