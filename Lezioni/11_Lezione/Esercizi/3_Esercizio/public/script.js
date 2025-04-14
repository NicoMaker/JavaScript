const form = document.getElementById("userForm");
const submitBtn = document.getElementById("submitBtn");

// Un oggetto campi che contengono le regex per validare i campi
const campi = {
  nome: { regex: /^[a-zA-Zàèéìòù' ]{2,30}$/ },
  cognome: { regex: /^[a-zA-Zàèéìòù' ]{2,30}$/ },
  cellulare: { regex: /^\d{10}$/ },
  indirizzo: { regex: /^[\w\s.,àèéìòù-]{5,50}$/ },
  cf: { regex: /^[A-Z]{6}[0-9]{2}[A-EHLMPR-T][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i },
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ },
};

// Funzione per sanificare l'input
function sanitize(input) {
  return input.replace(/<[^>]*>/g, "").trim();
}

// Funzione per validare un campo
function validateCampo(id) {
  const input = document.getElementById(id);
  const cleanedValue = sanitize(input.value);
  const { regex } = campi[id];

  if (!regex.test(cleanedValue)) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
}

// Funzione per validare la provincia
function validateProvincia() {
  const select = document.getElementById("provincia");
  if (!select.value) {
    select.classList.add("is-invalid");
    select.classList.remove("is-valid");
    return false;
  } else {
    select.classList.remove("is-invalid");
    select.classList.add("is-valid");
    return true;
  }
}

// Funzione per abilitare/disabilitare il bottone di invio
function checkFormValid() {
  const validCampi = Object.keys(campi).every((id) => validateCampo(id));
  const validProv = validateProvincia();
  submitBtn.disabled = !(validCampi && validProv);
}

// Ascolto degli input per la validazione in tempo reale
Object.keys(campi).forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => {
    validateCampo(id);
    checkFormValid();
  });
});

// Ascolto del cambio di provincia
document.getElementById("provincia").addEventListener("change", () => {
  validateProvincia();
  checkFormValid();
});

// Gestione dell'invio del form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  Object.keys(campi).forEach((id) => {
    const input = document.getElementById(id);
    input.value = sanitize(input.value);
  });

  alert("Form inviato con successo!");
  form.reset();
  submitBtn.disabled = true;

  document
    .querySelectorAll(".is-valid, .is-invalid")
    .forEach((el) => el.classList.remove("is-valid", "is-invalid"));
});

// Popolamento della select delle province da un file JSON esterno
fetch("province.json")
  .then((response) => response.json())
  .then((province) => {
    const select = document.getElementById("provincia");
    province.forEach((provincia) => {
      const option = document.createElement("option");
      option.value = provincia;
      option.textContent = provincia;
      select.appendChild(option);
    });
  });
