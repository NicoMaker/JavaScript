let comuni = [];

fetch("comuni.json")
  .then((response) => response.json())
  .then((data) => {
    comuni = data;
  })
  .catch((error) => {
    console.error("Errore nel caricamento dei comuni:", error);
  });

function codificaNomeCognome(testo, isNome = false) {
  const consonanti = testo
    .toUpperCase()
    .replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, "");
  const vocali = testo.toUpperCase().replace(/[^AEIOU]/g, "");
  let codice = (consonanti + vocali + "XXX").substring(0, 3);
  if (isNome && consonanti.length > 3) {
    codice = consonanti[0] + consonanti[2] + consonanti[3];
  }
  return codice;
}

function codificaData(data, sesso) {
  const mesi = ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"];
  const [anno, mese, giorno] = data.split("-");
  const annoCodice = anno.slice(-2);
  const meseCodice = mesi[parseInt(mese, 10) - 1];
  const giornoCodice = sesso === "F" ? parseInt(giorno) + 40 : parseInt(giorno);
  return `${annoCodice}${meseCodice}${giornoCodice
    .toString()
    .padStart(2, "0")}`;
}

function getCodiceComune(nomeComune) {
  const comune = comuni.find(
    (c) => c.nome.toLowerCase() === nomeComune.toLowerCase()
  );
  return comune ? comune.codice : null;
}

document.getElementById("fiscalForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const cognome = document.getElementById("cognome").value;
  const data = document.getElementById("dataNascita").value;
  const sesso = document.getElementById("sesso").value;
  const comune = document.getElementById("comune").value;

  const nomeCod = codificaNomeCognome(nome, true);
  const cognomeCod = codificaNomeCognome(cognome);
  const dataCod = codificaData(data, sesso);
  const comuneCod = getCodiceComune(comune);

  if (!comuneCod) {
    document.getElementById("risultato").innerText = "Comune non valido!";
    return;
  }

  const codiceFiscale = `${cognomeCod}${nomeCod}${dataCod}${comuneCod}`;
  document.getElementById(
    "risultato"
  ).innerText = `Codice Fiscale: ${codiceFiscale}`;
});

// Autocomplete comuni
const comuneInput = document.getElementById("comune");
const suggestions = document.getElementById("suggestions");

comuneInput.addEventListener("input", () => {
  const value = comuneInput.value.toLowerCase();
  suggestions.innerHTML = "";
  if (!value) return;

  const filtrati = comuni.filter((c) => c.nome.toLowerCase().startsWith(value));
  filtrati.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.innerText = c.nome;
    div.addEventListener("click", () => {
      comuneInput.value = c.nome;
      suggestions.innerHTML = "";
    });
    suggestions.appendChild(div);
  });
});

// Chiudi i suggerimenti se clicchi fuori
document.addEventListener("click", (e) => {
  if (!comuneInput.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.innerHTML = "";
  }
});
