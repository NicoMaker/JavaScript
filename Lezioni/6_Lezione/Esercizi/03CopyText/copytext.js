document.addEventListener("DOMContentLoaded", () => {
  const editbox = document.getElementById("editbox");
  const readButton = document.getElementById("readButton");
  const clearLabelButton = document.getElementById("clearLabelButton");
  const outputLabel = document.getElementById("outputLabel");

  // Populate the label with the text from the editbox
  readButton.addEventListener("click", () => {
    const text = editbox.value.trim();
    if (text) {
      outputLabel.textContent = text;
    } else {
      outputLabel.textContent = "";
    }
  });

  // Clear the label
  clearLabelButton.addEventListener("click", () => {
    outputLabel.textContent = "";
  });
});
