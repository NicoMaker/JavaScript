document.addEventListener("DOMContentLoaded", () => {
  const label = document.getElementById("toggleLabel");
  const button = document.getElementById("toggleButton");

  // display properties...
  button.addEventListener("click", () => {
    if (label.style.display === "none") {
      label.style.display = "block";
    } else {
      label.style.display = "none";
    }
  });

  /* button.addEventListener("click", () => {
    if (label.style.visibility === "hidden") {
      label.style.visibility = "visible";
    } else {
      label.style.visibility = "hidden";
    } 
  });*/
});
