document.addEventListener("DOMContentLoaded", () => {
  const editbox = document.getElementById("editbox"),
    populateButton = document.getElementById("populateButton"),
    clearButton = document.getElementById("clearButton");

  // Enable or disable the clear button based on editbox content
  const updateClearButtonState = () => {
    clearButton.disabled = !editbox.value.trim();
  };

  // Populate the editbox with a string
  populateButton.addEventListener("click", () => {
    editbox.value = "Hello, this is a populated string!";
    updateClearButtonState();
  });

  // Clear the editbox
  clearButton.addEventListener("click", () => {
    editbox.value = "";
    updateClearButtonState();
  });

  // Add a listener to the editbox to handle manual input
  editbox.addEventListener("input", updateClearButtonState);
});
