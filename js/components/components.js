async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);
  el.innerHTML = await res.text();
}

loadComponent("navbar", "/components/navbar.html");
loadComponent("bottom-nav", "/components/bottom-nav.html");