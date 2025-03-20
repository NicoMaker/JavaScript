document.addEventListener("DOMContentLoaded", () => {
  const createButton = document.getElementById("createButton");
  const removeButton = document.getElementById("removeButton");
  const labelContainer = document.getElementById("labelContainer");

  createButton.addEventListener("click", () => {
    if (!document.getElementById("dynamicLabel")) {
      const label = document.createElement("label");
      label.id = "dynamicLabel";
      label.className = "label";
      label.textContent = "This is a dynamically created label";
      labelContainer.appendChild(label);
    }
  });

  removeButton.addEventListener("click", () => {
    const label = document.getElementById("dynamicLabel");
    if (label) {
      label.remove();
    }
  });
});
