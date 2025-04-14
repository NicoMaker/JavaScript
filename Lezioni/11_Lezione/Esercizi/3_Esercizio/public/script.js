
const form = document.getElementById("userForm");
const submitBtn = document.getElementById("submitBtn");

const campi = {
  nome: { regex: /^[a-zA-Zàèéìòù' ]{2,30}$/ },
  cognome: { regex: /^[a-zA-Zàèéìòù' ]{2,30}$/ },
  cellulare: { regex: /^\d{10}$/ },
  indirizzo: { regex: /^[\w\s.,àèéìòù-]{5,50}$/ },
  cf: { regex: /^[A-Z]{6}[0-9]{2}[A-EHLMPR-T][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i },
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ },
};

function sanitize(input) {
  return input.replace(/<[^>]*>/g, "").trim();
}

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

function checkFormValid() {
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

  fetch("/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: document.getElementById("nome").value,
      cognome: document.getElementById("cognome").value,
      cellulare: document.getElementById("cellulare").value,
      indirizzo: document.getElementById("indirizzo").value,
      cf: document.getElementById("cf").value,
      email: document.getElementById("email").value,
      provincia: document.getElementById("provincia").value,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      form.reset();
      submitBtn.disabled = true;
    })
    .catch((err) => {
      console.error("Errore:", err);
    });
});

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
