// Lojas
const params = new URLSearchParams(window.location.search);

const produto = params.get("produto") || "";
const cor = params.get("cor") || "";

const mensagem = `Olá! Gostaria de um orçamento:\nProduto: ${produto}\nCor: ${cor}`;

document.querySelectorAll(".store-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const phone = btn.dataset.phone;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  });
});