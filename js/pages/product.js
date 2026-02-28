import { products } from "../data/products.js";
import { initProductGallery } from "./product-gallery.js";

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderProduct(product) {
  // texto
  document.getElementById("productTitle").textContent = product.title;
  document.getElementById("productUse").textContent = product.use;
  document.getElementById("productSizes").textContent = product.sizes;

  document.getElementById("productHeading").textContent = product.descriptionTitle;
  document.getElementById("productDescription").textContent = product.description;

  document.getElementById("productDocLink").href = product.doc;

  // imagem principal
  const mainImage = document.getElementById("product-main-image");
  mainImage.src = product.images[0];

  // thumbs
  const thumbsContainer = document.getElementById("productThumbs");
  thumbsContainer.innerHTML = "";

  product.images.forEach((img, i) => {
    const el = document.createElement("img");
    el.src = img;
    el.dataset.image = img;
    if (i === 0) el.classList.add("active");
    thumbsContainer.appendChild(el);
  });

  // cores
  const colorsContainer = document.getElementById("productColors");
  colorsContainer.innerHTML = "";

  product.colors.forEach((c, i) => {
    const span = document.createElement("span");
    span.style.background = c.hex;
    span.dataset.image = c.image;
    span.dataset.color = c.name;
    if (i === 0) span.classList.add("active");
    colorsContainer.appendChild(span);
  });

  // cor inicial
  document.getElementById("selectedColor").textContent =
    product.colors[0].name;
}

function initProductPage() {
  const id = getProductId();
  const product = products[id];

  if (!product) {
    document.querySelector(".product").innerHTML =
      "<h2>Produto não encontrado</h2>";
    return;
  }

  renderProduct(product);
  initProductGallery();
}

document.addEventListener("DOMContentLoaded", initProductPage);