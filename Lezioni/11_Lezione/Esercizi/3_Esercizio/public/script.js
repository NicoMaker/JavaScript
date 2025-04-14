document.addEventListener("DOMContentLoaded", () => {
  const provinciaSelect = document.getElementById("provincia");
  const form = document.getElementById("userForm");
  const submitBtn = document.getElementById("submitBtn");

  // Carica le province dal file JSON
  fetch("province.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((provincia) => {
        const option = document.createElement("option");
        option.value = provincia;
        option.textContent = provincia;
        provinciaSelect.appendChild(option);
      });
    });

  // Abilita il pulsante solo se il form è valido
  form.addEventListener("input", () => {
    submitBtn.disabled = !form.checkValidity();
  });

  // Invia il form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datiUtente = {
      nome: document.getElementById("nome").value,
      cognome: document.getElementById("cognome").value,
      cellulare: document.getElementById("cellulare").value,
      indirizzo: document.getElementById("indirizzo").value,
      codiceFiscale: document.getElementById("cf").value,
      email: document.getElementById("email").value,
      provincia: document.getElementById("provincia").value,
    };

    await fetch("/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datiUtente),
    });

    alert("Dati inviati con successo!");
    form.reset();
    submitBtn.disabled = true;
  });
});
