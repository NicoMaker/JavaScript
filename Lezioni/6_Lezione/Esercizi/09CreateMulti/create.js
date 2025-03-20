document.addEventListener("DOMContentLoaded", () => {
  const createButton = document.getElementById("createButton");
  const removeButton = document.getElementById("removeButton");
  const labelContainer = document.getElementById("labelContainer");

  createButton.addEventListener("click", () => {
    const label = document.createElement("label");
    label.className = "label";
    //labelContainer è un <div> che contiene le label create dinamicamente.
    //children è una proprietà che restituisce tutti gli elementi figli diretti di labelContainer.
    // length conta quanti figli ci sono.
    label.textContent = `Label ${labelContainer.children.length + 1}`;
    labelContainer.appendChild(label);
  });

  removeButton.addEventListener("click", () => {
    if (labelContainer.lastChild) {
      labelContainer.removeChild(labelContainer.lastChild);
    }
  });
});
