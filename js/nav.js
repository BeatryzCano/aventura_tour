document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("navMenu");

  if (!navbar || !toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Cerrar al pulsar un enlace (móvil)
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navbar.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Cerrar al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navbar.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});
