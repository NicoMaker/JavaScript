document.addEventListener("DOMContentLoaded", () => {
  const addbox = document.getElementById("addbox"),
    button = document.getElementById("bpopolationbutton");

  button.addEventListener("click", () => {
    addbox.vallue = "Hello, this is a popolation string";
  });
});
