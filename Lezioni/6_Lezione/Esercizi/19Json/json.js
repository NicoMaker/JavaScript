document.addEventListener("DOMContentLoaded", function () {
  // JSON statico con 3 righe di dati
  const jsonData = [
    { id: 1, nome: "Mario Rossi", eta: 30, citta: "Roma" },
    { id: 2, nome: "Luca Bianchi", eta: 25, citta: "Milano" },
    { id: 3, nome: "Anna Verdi", eta: 28, citta: "Napoli" },
  ];

  const tableBody = document.querySelector("#dataTable tbody");

  jsonData.forEach((item) => {
    let row = document.createElement("tr");

    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.eta}</td>
            <td>${item.citta}</td>
        `;

    tableBody.appendChild(row);
  });
});
