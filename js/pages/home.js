window.addEventListener("load", () => {
  const carousel = document.querySelector(".carousel");
  carousel.scrollLeft =
    (carousel.scrollWidth - carousel.clientWidth) / 2;
});
