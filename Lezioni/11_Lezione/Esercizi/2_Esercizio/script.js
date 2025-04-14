const form = document.getElementById("userForm");
const submitBtn = document.getElementById("submitBtn");

// un oggetto campi che contengono le regex per validare i campi
const campi = {
  nome: { regex: /^[a-zA-Zàèéìòù' ]{2,30}$/ },
  cognome: { regex: /^[a-zA-Zàèéìòù' ]{2,30}$/ },
  cellulare: { regex: /^\d{10}$/ },
  indirizzo: { regex: /^[\w\s.,àèéìòù-]{5,50}$/ },
  cf: {
    // $/i  ingnore case
    regex: /^[A-Z]{6}[0-9]{2}[A-EHLMPR-T][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i,
  },
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ },
};

// esempio: se voglio estrarre la regex del campo cf:
// const regexCF = campi.cf.regex;
// oppure
// const { regex: regexCF } = campi.cf;

function sanitize(input) {
  return input.replace(/<[^>]*>/g, "").trim();
}

function validateCampo(id) {
  const input = document.getElementById(id);
  const cleanedValue = sanitize(input.value);
  // const regex = campi[id].regex;
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

function validateProvincia() {
  const select = document.getElementById("provincia");
  if (!select.value) {
    // classList aggiunge o rimuove classi (stile)
    select.classList.add("is-invalid");
    select.classList.remove("is-valid");
    return false;
  } else {
    select.classList.remove("is-invalid");
    select.classList.add("is-valid");
    return true;
  }
}

function checkFormValid() {
  // È un oggetto nativo di JavaScript, disponibile sempre (non devi importarlo).
  // ritona un oggetto con tutte le chiavi. nell'esempio dell'oggetto campi
  // Object.keys(campi); // ["nome", "cognome", "cellulare", "indirizzo", "cf", "email"]

  const validCampi = Object.keys(campi).every((id) => validateCampo(id));
  const validProv = validateProvincia();
  submitBtn.disabled = !(validCampi && validProv);
}

Object.keys(campi).forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => {
    validateCampo(id);
    checkFormValid();
  });
});

document.getElementById("provincia").addEventListener("change", () => {
  validateProvincia();
  checkFormValid();
});

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

// Popola la select province da JSON esterno
fetch("province.json")
  .then((response) => response.json())
  .then((province) => {
    const select = document.getElementById("provincia");
    province.forEach((sigla) => {
      const option = document.createElement("option");
      option.value = sigla;
      option.textContent = sigla;
      select.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Errore nel caricamento province:", error);
  });
