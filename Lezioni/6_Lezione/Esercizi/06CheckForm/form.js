document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const numberInput = document.getElementById("numberInput");
  const dateInput = document.getElementById("dateInput");
  const submitButton = document.getElementById("submitButton");

  const validateForm = () => {
    const textValid = textInput.value.trim() !== "";
    const numberValid = numberInput.value !== "" && !isNaN(numberInput.value);
    const dateValid = dateInput.value !== "";

    submitButton.disabled = !(textValid && numberValid && dateValid);
  };

  // Event listeners for form validation
  textInput.addEventListener("input", validateForm);
  numberInput.addEventListener("input", validateForm);
  dateInput.addEventListener("input", validateForm);
});
