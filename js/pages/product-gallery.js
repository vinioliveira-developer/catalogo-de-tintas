export function initProductGallery() {

  const mainImage = document.getElementById("product-main-image");
  const colorName = document.getElementById("selectedColor");

  const thumbs = document.querySelectorAll(".product__thumbs img");
  const colors = document.querySelectorAll(".product__colors span");

  function changeImage(newSrc) {
    mainImage.style.opacity = 0;

    setTimeout(() => {
      mainImage.src = newSrc;
      mainImage.style.opacity = 1;
    }, 200);
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const img = thumb.dataset.image;

      changeImage(img);

      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

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

  // fade lateral cores
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

  // botão orçamento
  const btnBudget = document.getElementById("btnBudget");
  btnBudget.addEventListener("click", () => {
    const productName = document.querySelector(".product__title").textContent;
    const color = document.getElementById("selectedColor").textContent;

    const url = `lojas.html?produto=${encodeURIComponent(productName)}&cor=${encodeURIComponent(color)}`;
    window.location.href = url;
  });
}