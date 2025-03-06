document.addEventListener("DOMContentLoaded", () => {
  const editbox = document.getElementById("editbox"),
    readButton = document.getElementById("readButton"),
    clearLabelButton = document.getElementById("clearLabelButton"),
    outputLabel = document.getElementById("outputLabel");

  // Populate the label with the text from the editbox
  readButton.addEventListener("click", () => {
    const text = editbox.value.trim();
    if (text) outputLabel.textContent = text;
    else outputLabel.textContent = "";
  });

  // Clear the label
  clearLabelButton.addEventListener("click", () => {
    outputLabel.textContent = "";
  });
});
