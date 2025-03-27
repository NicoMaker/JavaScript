const images = document.querySelectorAll("#image-container img");
let currentIndex = 0;

function switchImage() {
  images[currentIndex].style.opacity = 0;
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].style.opacity = 1;
}
