document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("galleryGrid");

  const continentSelect = document.getElementById("continentSelect");
  const typeSelect = document.getElementById("typeSelect");
  const destinationSelect = document.getElementById("destinationSelect");
  const searchInput = document.getElementById("gallerySearch");

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbCaption = document.getElementById("lbCaption");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");

  const JSON_URL = "../assets/json/galeria.json";

  const TYPE_LABELS = {
    capitales: "Capitales",
    playa: "Playa",
    montana: "Montaña",
    excursiones: "Excursiones"
  };

  let data = null;
  let currentItems = [];
  let currentIndex = 0;

  function setSelectOptions(select, options, selectedValue = "") {
    select.innerHTML = "";
    options.forEach(opt => {
      const o = document.createElement("option");
      o.value = opt.value;
      o.textContent = opt.label;
      if (opt.value === selectedValue) o.selected = true;
      select.appendChild(o);
    });
  }

  // ✅ Reglas de imagen:
  // - capitales: ../assets/images/galeria/capitales/<slug>.jpg
  // - resto: ../assets/images/galeria/<continente>/<tipo>/1.jpg o 2.jpg (alternando)
  function resolveImage(continentKey, typeKey, entry, idxInList) {
    if (typeKey === "capitales") {
      return `../assets/images/galeria/capitales/${entry.slug}.jpg`;
    }
    const n = (idxInList % 3) + 1; // alterna 1 y 2
    return `../assets/images/galeria/${continentKey}/${typeKey}/${n}.jpg`;
  }

  function toItem(continentKey, typeKey, entry, idxInList) {
    const src = resolveImage(continentKey, typeKey, entry, idxInList);
    return {
      continent: continentKey,
      type: typeKey,
      nombre: entry.nombre,
      desc: entry.desc || "",
      src,
      badge: `${TYPE_LABELS[typeKey]} · ${data.continentes[continentKey].nombre}`
    };
  }

  function getSelectedKeys() {
    return {
      continent: continentSelect.value,
      type: typeSelect.value,
      destination: destinationSelect.value
    };
  }

  function buildView() {
    const { continent, type, destination } = getSelectedKeys();
    const q = (searchInput.value || "").trim().toLowerCase();

    const list = data.continentes[continent].categorias[type];
    let items = list.map((entry, idx) => toItem(continent, type, entry, idx));

    if (destination !== "all") {
      items = items.filter(it => it.nombre === destination);
    }

    if (q) {
      items = items.filter(it =>
        it.nombre.toLowerCase().includes(q) ||
        it.desc.toLowerCase().includes(q)
      );
    }

    currentItems = items;
    render(items);
  }

  function render(items) {
    grid.innerHTML = "";

    if (!items.length) {
      grid.innerHTML = `<p>No hay resultados con esa selección/búsqueda.</p>`;
      return;
    }

    items.forEach((it, idx) => {
      const card = document.createElement("article");
      card.className = "gallery-card";

      card.innerHTML = `
        <span class="gallery-badge">${it.badge}</span>
        <img src="${it.src}" alt="${it.nombre}">
        <div class="gallery-caption">
          <h3>${it.nombre}</h3>
          <p>${it.desc}</p>
        </div>
      `;

      card.addEventListener("click", () => openLightbox(idx));
      grid.appendChild(card);
    });
  }

  // Lightbox
  function openLightbox(idx) {
    currentIndex = idx;
    const it = currentItems[currentIndex];

    lbImage.src = it.src;
    lbImage.alt = it.nombre;
    lbCaption.textContent = `${it.nombre} — ${it.desc}`;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lbImage.src = "";
  }

  function prev() {
    if (!currentItems.length) return;
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    openLightbox(currentIndex);
  }

  function next() {
    if (!currentItems.length) return;
    currentIndex = (currentIndex + 1) % currentItems.length;
    openLightbox(currentIndex);
  }

  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  lbPrev.addEventListener("click", prev);
  lbNext.addEventListener("click", next);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  // Select dependientes
  function populateTypes(continentKey) {
    const types = Object.keys(data.continentes[continentKey].categorias);
    setSelectOptions(typeSelect, types.map(t => ({ value: t, label: TYPE_LABELS[t] })), types[0]);
  }

  function populateDestinations(continentKey, typeKey) {
    const entries = data.continentes[continentKey].categorias[typeKey];
    const opts = [
      { value: "all", label: `Ver todos (${entries.length})` },
      ...entries.map(e => ({ value: e.nombre, label: e.nombre }))
    ];
    setSelectOptions(destinationSelect, opts, "all");
  }

  continentSelect.addEventListener("change", () => {
    populateTypes(continentSelect.value);
    populateDestinations(continentSelect.value, typeSelect.value);
    buildView();
  });

  typeSelect.addEventListener("change", () => {
    populateDestinations(continentSelect.value, typeSelect.value);
    buildView();
  });

  destinationSelect.addEventListener("change", buildView);
  searchInput.addEventListener("input", buildView);

  async function init() {
    try {
      const res = await fetch(JSON_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();

      const continentKeys = Object.keys(data.continentes);
      setSelectOptions(continentSelect, continentKeys.map(k => ({
        value: k, label: data.continentes[k].nombre
      })), continentKeys[0]);

      populateTypes(continentKeys[0]);
      populateDestinations(continentKeys[0], typeSelect.value);
      buildView();
    } catch (err) {
      console.error("Error cargando galeria.json:", err);
      grid.innerHTML = `<p>No se pudo cargar la galería. Revisa la ruta del JSON y usa Live Server.</p>`;
    }
  }

  init();
});
