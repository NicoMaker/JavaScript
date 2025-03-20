document.addEventListener("DOMContentLoaded", () => {
  const listbox = document.getElementById("listbox");
  const outputLabel = document.getElementById("outputLabel");
  const clearButton = document.getElementById("clearButton");

  // Update label based on selected item
  listbox.addEventListener("change", () => {
    const selectedValue = listbox.value;
    // if the string is NOT empty show  it, otherwise show  ""
    outputLabel.textContent = selectedValue
      ? `You selected: ${selectedValue}`
      : "";
  });

  // Clear the label
  clearButton.addEventListener("click", () => {
    // when clear button is pressed
    outputLabel.textContent = "";
    // when the item "-- Select an item --" is selected
    listbox.value = ""; // Reset the listbox to its default state
  });
});
