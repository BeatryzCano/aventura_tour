document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".noticias-container");
  if (!contenedor) return;

  let currentIndex = 0;
  let noticiasData = [];

  // ✅ Ruta correcta para index.html (GitHub Pages incluido)
  const urlNoticias = "./assets/json/noticias.json";

  fetch(urlNoticias)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} al cargar ${urlNoticias}`);
      }
      return response.json();
    })
    .then((noticias) => {
      // Acepta: array directo o { noticias: [...] }
      noticiasData = Array.isArray(noticias) ? noticias : (noticias.noticias || []);

      if (!noticiasData.length) {
        contenedor.innerHTML = "<p>No hay noticias disponibles.</p>";
        return;
      }

      mostrarNoticias();
      setInterval(mostrarNoticias, 10000); // cambia cada 10s
    })
    .catch((error) => {
      console.error("Error cargando noticias:", error);
      contenedor.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
    });

  function mostrarNoticias() {
    contenedor.innerHTML = "";

    const total = noticiasData.length;
    const cantidad = Math.min(3, total); // por si hay menos de 3

    for (let i = 0; i < cantidad; i++) {
      const noticia = noticiasData[(currentIndex + i) % total];

      const div = document.createElement("div");
      div.classList.add("noticia");
      div.innerHTML = `
        <h3>${noticia.titulo ?? "Sin título"}</h3>
        <p>${noticia.contenido ?? ""}</p>
      `;

      contenedor.appendChild(div);
    }

    currentIndex = (currentIndex + cantidad) % total;
  }
});



