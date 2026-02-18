const enterCatalogBtn = document.getElementById('enterCatalogBtn');

enterCatalogBtn.addEventListener('click', () => {
  window.location.href = 'home.html';
});

//Slides
const slides = document.querySelectorAll(".slide");

let current = 0;

function changeSlide() {
  slides[current].classList.remove("active");

  current++;
  if (current >= slides.length) {
    current = 0;
  }

  slides[current].classList.add("active");
}

// primeira ativa
slides[0].classList.add("active");

// troca a cada 3s
setInterval(changeSlide, 3000);

