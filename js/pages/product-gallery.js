document.addEventListener("DOMContentLoaded", () => {

  const mainImage = document.getElementById("product-main-image");
  const colorName = document.getElementById("selectedColor");

  const thumbs = document.querySelectorAll(".product__thumbs img");
  const colors = document.querySelectorAll(".product__colors span");

  // função única de troca (imagem + fade)
  function changeImage(newSrc) {
    mainImage.style.opacity = 0;

    setTimeout(() => {
      mainImage.src = newSrc;
      mainImage.style.opacity = 1;
    }, 200);
  }

  // THUMBS
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const img = thumb.dataset.image;

      changeImage(img);

      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // CORES
  colors.forEach(color => {
    color.addEventListener("click", () => {
      const img = color.dataset.image;
      const name = color.dataset.color;

      changeImage(img);
      colorName.textContent = name;

      colors.forEach(c => c.classList.remove("active"));
      color.classList.add("active");
    });
  });

  // EFEITO LATERAL DO CARROSSEL 
  const wrap = document.querySelector('.product__colors-wrap');
  const colorsRow = document.querySelector('.product__colors');

  function updateFades() {
    const scrollLeft = colorsRow.scrollLeft;
    const maxScroll = colorsRow.scrollWidth - colorsRow.clientWidth;

    wrap.classList.toggle('show-left', scrollLeft > 0);
    wrap.classList.toggle('show-right', scrollLeft < maxScroll);
  }

  colorsRow.addEventListener('scroll', updateFades);
  updateFades();

});