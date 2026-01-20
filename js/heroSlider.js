const hero = document.querySelector(".hero");
const images = [
  "assets/images/hero1.jpg",
  "assets/images/hero2.jpg",
  "assets/images/hero3.jpg",
  "assets/images/hero4.jpg",
  "assets/images/hero5.jpg"
];

let currentIndex = 0;

// Crear divs para cada imagen
images.forEach((src, i) => {
  const div = document.createElement("div");
  div.classList.add("hero-bg");
  if(i === 0) div.classList.add("active"); // primera visible
  div.style.backgroundImage = `url(${src})`;
  hero.appendChild(div);
});

const heroBackgrounds = document.querySelectorAll(".hero-bg");

setInterval(() => {
  // Quitar clase active de la imagen actual
  heroBackgrounds[currentIndex].classList.remove("active");

  // Calcular siguiente imagen
  currentIndex = (currentIndex + 1) % heroBackgrounds.length;

  // Añadir clase active a la siguiente imagen
  heroBackgrounds[currentIndex].classList.add("active");

}, 8000); // cambio cada 8 segundos

