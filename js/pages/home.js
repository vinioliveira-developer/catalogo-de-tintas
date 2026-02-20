document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".carousel__track img");

  let index = 0;
  let isPaused = false;

  function smoothScrollTo(target, duration) {
    const start = carousel.scrollLeft;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easing suave (easeInOut)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      carousel.scrollLeft = start + (target - start) * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  function nextSlide() {
    if (isPaused) return;

    index++;
    if (index >= slides.length) {
      index = 0;
    }

    const slideWidth = slides[0].clientWidth;
    const targetPosition = slideWidth * index;

    smoothScrollTo(targetPosition, 2000); // 👈 DURAÇÃO REAL DO SCROLL (2s)
  }

  // tempo que espera antes de trocar
  setInterval(nextSlide, 5000);

  // pausa ao interagir
  carousel.addEventListener("mouseenter", () => isPaused = true);
  carousel.addEventListener("mouseleave", () => isPaused = false);
  carousel.addEventListener("touchstart", () => isPaused = true);
  carousel.addEventListener("touchend", () => isPaused = false);

  window.addEventListener("resize", () => {
    const slideWidth = slides[0].clientWidth;
    carousel.scrollLeft = slideWidth * index;
  });
});

// DRAG COM MOUSE

carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollStart = carousel.scrollLeft;
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const move = e.pageX - startX;
  carousel.scrollLeft = scrollStart - move;
  scrollAmount = carousel.scrollLeft;
});

carousel.addEventListener("mouseup", () => {
  isDragging = false;
});

carousel.addEventListener("mouseleave", () => {
  isDragging = false;
});


// TOUCH MOBILE

carousel.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  scrollStart = carousel.scrollLeft;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const move = e.touches[0].clientX - startX;
  carousel.scrollLeft = scrollStart - move;
  scrollAmount = carousel.scrollLeft;
});

carousel.addEventListener("touchend", () => {
  isDragging = false;
});


// BOTÕES

nextBtn.addEventListener("click", () => {
  scrollAmount += carousel.clientWidth;
});

prevBtn.addEventListener("click", () => {
  scrollAmount -= carousel.clientWidth;
});
