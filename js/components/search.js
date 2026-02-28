import { products } from "../data/products.js";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchList");

  if (!input || !resultsContainer) return;

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase().trim();

    if (!term) {
      resultsContainer.innerHTML = "";
      return;
    }

    const list = Object.values(products).filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
      (p.keywords && p.keywords.some(k => k.includes(term)))
    );

    renderResults(list, term, resultsContainer);
  });
});

function renderResults(list, term, container) {
  if (!list.length) {
    container.innerHTML = `
      <div class="search__item">
        Não trabalhamos com "${term}"
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(p => `
    <a href="product.html?id=${p.id}" class="search__item">
      ${highlight(p.title, term)}
    </a>
  `).join("");
}

function highlight(text, term) {
  const regex = new RegExp(`(${term})`, "gi");
  return text.replace(regex, `<strong>$1</strong>`);
}