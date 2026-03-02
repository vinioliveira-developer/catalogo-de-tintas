const track = document.querySelector(".carousel__track");
const items = document.querySelectorAll(".carousel__item");

let index = 0;
const total = items.length;

const pauseTime = 3000;
const duration = 900;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function slideTo(targetIndex) {
  const startIndex = index;
  const diff = targetIndex - startIndex;

  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;

    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    const move = (startIndex + diff * eased) * -100;
    track.style.transform = `translateX(${move}%)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      index = targetIndex;
      setTimeout(nextSlide, pauseTime);
    }
  }

  requestAnimationFrame(animate);
}

function nextSlide() {
  let next = index + 1;
  if (next >= total) next = 0;
  slideTo(next);
}

// inicia depois que layout existir
window.addEventListener("load", () => {
  setTimeout(nextSlide, pauseTime);
});