document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".carousel__track img");

  if (!carousel || !slides.length) return;

  let index = 0;
  let isPaused = false;

  // ===== DRAG =====
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let targetScroll = 0;

  // ===== SMOOTH SCROLL =====
  function smoothScrollTo(target, duration) {
    const start = carousel.scrollLeft;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      carousel.scrollLeft = start + (target - start) * ease;

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function nextSlide() {
    if (isPaused) return;

    index = (index + 1) % slides.length;
    const slideWidth = slides[0].clientWidth;
    smoothScrollTo(slideWidth * index, 2000);
  }

  setInterval(nextSlide, 5000);

  // ===== PAUSE =====
  carousel.addEventListener("mouseenter", () => isPaused = true);
  carousel.addEventListener("mouseleave", () => isPaused = false);
  carousel.addEventListener("touchstart", () => isPaused = true);
  carousel.addEventListener("touchend", () => isPaused = false);

  // ===== DRAG MOUSE =====
  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollStart = carousel.scrollLeft;
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const move = e.pageX - startX;
    targetScroll = scrollStart - move;
    carousel.scrollLeft = targetScroll;
  });

  carousel.addEventListener("mouseup", () => isDragging = false);
  carousel.addEventListener("mouseleave", () => isDragging = false);

  // ===== TOUCH =====
  carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    scrollStart = carousel.scrollLeft;
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const move = e.touches[0].clientX - startX;
    targetScroll = scrollStart - move;
    carousel.scrollLeft = targetScroll;
  });

  carousel.addEventListener("touchend", () => isDragging = false);

  // ===== RESIZE =====
  window.addEventListener("resize", () => {
    const slideWidth = slides[0].clientWidth;
    carousel.scrollLeft = slideWidth * index;
  });
});
