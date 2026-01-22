document.addEventListener("DOMContentLoaded", () => {
  // ====== CONFIG: ubicación empresa ======
  const empresa = { lat: 40.4168, lng: -3.7038 }; // Madrid ejemplo

  // UI
  const msgEstado = document.getElementById("msgEstado");
  const btnUbicacion = document.getElementById("btnUbicacion");
  const btnDireccion = document.getElementById("btnDireccion");
  const btnCoordenadas = document.getElementById("btnCoordenadas");

  const direccionInput = document.getElementById("direccionCliente");
  const latInput = document.getElementById("latCliente");
  const lngInput = document.getElementById("lngCliente");

  // ====== MAPA ======
  const map = L.map("map").setView([empresa.lat, empresa.lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Marcador empresa
  L.marker([empresa.lat, empresa.lng])
    .addTo(map)
    .bindPopup("<strong>Aventura Tour</strong><br>Oficina (ficticia)")
    .openPopup();

  // Control de rutas
  const routingControl = L.Routing.control({
    waypoints: [],
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    show: true
  }).addTo(map);

  let markerCliente = null;

  function setMessage(texto, isError = false) {
    msgEstado.textContent = texto;
    msgEstado.style.color = isError ? "#b91c1c" : "";
  }

  function ponerMarcadorCliente(lat, lng, texto) {
    if (markerCliente) {
      map.removeLayer(markerCliente);
    }
    markerCliente = L.circleMarker([lat, lng], { radius: 7 }).addTo(map);
    markerCliente.bindPopup(texto);
  }

  function calcularRuta(desdeLat, desdeLng) {
    routingControl.setWaypoints([
      L.latLng(desdeLat, desdeLng),
      L.latLng(empresa.lat, empresa.lng)
    ]);

    map.fitBounds(
      L.latLngBounds([[desdeLat, desdeLng], [empresa.lat, empresa.lng]]),
      { padding: [40, 40] }
    );
  }

  // ====== 1) MI UBICACIÓN ======
  btnUbicacion.addEventListener("click", () => {
    if (!navigator.geolocation) {
      setMessage("Tu navegador no soporta geolocalización.", true);
      return;
    }

    setMessage("Obteniendo tu ubicación…");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMessage("Ubicación detectada. Calculando ruta…");
        ponerMarcadorCliente(latitude, longitude, "Tu ubicación");
        calcularRuta(latitude, longitude);
      },
      () => {
        setMessage("No se pudo obtener tu ubicación. Prueba con dirección o coordenadas.", true);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });

  // ====== 2) DIRECCIÓN (Nominatim) ======
  btnDireccion.addEventListener("click", async () => {
    const direccion = direccionInput.value.trim();

    if (!direccion) {
      setMessage("Introduce una dirección (ej: Gran Vía 28, Madrid).", true);
      return;
    }

    setMessage("Buscando la dirección…");

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(direccion)}`;

      const res = await fetch(url, {
        headers: { "Accept": "application/json" }
      });

      if (!res.ok) {
        setMessage(`Error del servicio de geocodificación (${res.status}).`, true);
        console.error("Nominatim status:", res.status, await res.text());
        return;
      }

      const data = await res.json();

      if (!data.length) {
        setMessage("Dirección no encontrada. Añade ciudad y país.", true);
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);

      setMessage("Dirección encontrada. Calculando ruta…");
      ponerMarcadorCliente(lat, lng, "Dirección introducida");
      calcularRuta(lat, lng);

    } catch (err) {
      setMessage("No se pudo buscar la dirección. Revisa la consola (F12).", true);
      console.error(err);
    }
  });

  // ====== 3) COORDENADAS ======
  btnCoordenadas.addEventListener("click", () => {
    const lat = Number(latInput.value);
    const lng = Number(lngInput.value);

    if (!lat || !lng) {
      setMessage("Introduce latitud y longitud válidas.", true);
      return;
    }

    setMessage("Calculando ruta con coordenadas…");
    ponerMarcadorCliente(lat, lng, "Coordenadas introducidas");
    calcularRuta(lat, lng);
  });

  // Mensaje inicial
  setMessage("Puedes calcular la ruta usando tu ubicación, una dirección o coordenadas.");
});
