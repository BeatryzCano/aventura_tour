

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".noticias-container");

  fetch("./assets/json/noticias.json") // Ajusta la ruta según tu proyecto
    .then(response => response.json())
    .then(noticias => {
      noticias.forEach(noticia => {
        const div = document.createElement("div");
        div.classList.add("noticia");
        div.innerHTML = `
          <h3>${noticia.titulo}</h3>
          <p>${noticia.contenido}</p>
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(error => console.error("Error cargando noticias:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".noticias-container");
  let currentIndex = 0;
  let noticiasData = [];

  fetch("../assets/json/noticias.json")
    .then(response => response.json())
    .then(noticias => {
      noticiasData = noticias;
      mostrarNoticias();
      setInterval(mostrarNoticias, 10000); // Cambia cada 10 segundos
    });

  function mostrarNoticias() {
    contenedor.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const noticia = noticiasData[(currentIndex + i) % noticiasData.length];
      const div = document.createElement("div");
      div.classList.add("noticia");
      div.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.contenido}</p>`;
      contenedor.appendChild(div);
    }
    currentIndex = (currentIndex + 3) % noticiasData.length;
  }
});



