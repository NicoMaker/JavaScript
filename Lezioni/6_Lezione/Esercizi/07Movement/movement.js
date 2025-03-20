// backtick Option+9, win Alt+96

document.addEventListener("DOMContentLoaded", () => {
  const label = document.getElementById("moveLabel");
  const moveUp = document.getElementById("moveUp");
  const moveDown = document.getElementById("moveDown");
  const moveLeft = document.getElementById("moveLeft");
  const moveRight = document.getElementById("moveRight");

  let positionX = 0;
  let positionY = 0;
  const step = 10;

  moveUp.addEventListener("click", () => {
    positionY -= step;
    label.style.transform = `translate(${positionX}px, ${positionY}px)`;
  });

  moveDown.addEventListener("click", () => {
    positionY += step;
    label.style.transform = `translate(${positionX}px, ${positionY}px)`;
  });

  moveLeft.addEventListener("click", () => {
    positionX -= step;
    label.style.transform = `translate(${positionX}px, ${positionY}px)`;
  });

  moveRight.addEventListener("click", () => {
    positionX += step;
    label.style.transform = `translate(${positionX}px, ${positionY}px)`;
  });
});
