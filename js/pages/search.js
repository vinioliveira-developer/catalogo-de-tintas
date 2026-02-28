import { products } from "../data/products.js";

const input = document.getElementById("searchInput");
const resultsContainer = document.getElementById("searchList");

if (input && resultsContainer) {
  input.addEventListener("input", () => {
    const term = input.value.toLowerCase().trim();

    if (!term) {
      resultsContainer.innerHTML = "";
      return;
    }

    const list = Object.values(products).filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );

    renderResults(list, term);
  });
}

function renderResults(list, term) {
  if (!list.length) {
    resultsContainer.innerHTML = `
      <div class="search__item">
        Não trabalhamos com "${term}"
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = list.map(p => `
    <a href="product.html?id=${p.id}" class="search__item">
      ${p.name}
    </a>
  `).join("");
}