// ===============================
// AVENTURA TOUR - presupuesto.js
// Validación + Cálculo dinámico
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPresupuesto") || document.getElementById("formulario");
  if (!form) return;

  // --- Campos de contacto ---
  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");

  // --- Campos de presupuesto ---
  const producto = document.getElementById("producto");
  const plazo = document.getElementById("plazo");
  const extras = document.querySelectorAll(".extra");
  const totalSpan = document.getElementById("total");
  const totalInput = document.getElementById("totalInput");

  // --- Condiciones ---
  const condiciones = document.getElementById("condiciones") || document.getElementById("privacidad");

  // --- Errores (si existen) ---
  const errNombre = document.getElementById("errNombre");
  const errApellidos = document.getElementById("errApellidos");
  const errTelefono = document.getElementById("errTelefono");
  const errEmail = document.getElementById("errEmail");
  const errCondiciones = document.getElementById("errCondiciones");

  // Regex de validación
  const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
  const soloNumeros = /^[0-9]+$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(elError, msg) {
    if (elError) elError.textContent = msg;
  }

  function validarContacto() {
    let ok = true;

    const n = (nombre?.value || "").trim();
    const a = (apellidos?.value || "").trim();
    const t = (telefono?.value || "").trim();
    const e = (email?.value || "").trim();

    // Nombre: letras, max 20
    if (!n || !soloLetras.test(n) || n.length > 20) {
      setError(errNombre, "Nombre: solo letras y máximo 20  caracteres.");
      ok = false;
    } else setError(errNombre, "");

    // Apellidos: letras, max 40
    if (!a || !soloLetras.test(a) || a.length > 40) {
      setError(errApellidos, "Apellidos: solo letras y máximo 40 caracteres.");
      ok = false;
    } else setError(errApellidos, "");

    // Teléfono: números, longitud 9
    if (!t || !soloNumeros.test(t) || t.length !== 9) {
      setError(errTelefono, "Teléfono: solo números y exactamente 9 dígitos.");
      ok = false;
    } else setError(errTelefono, "");

    // Email estándar
    if (!e || !emailValido.test(e)) {
      setError(errEmail, "Email no válido. Ej: nombre@dominio.com");
      ok = false;
    } else setError(errEmail, "");

    return ok;
  }

  function validarCondiciones() {
    if (!condiciones) return true;
    const ok = condiciones.checked;
    if (!ok) setError(errCondiciones, "Debes aceptar las condiciones para enviar.");
    else setError(errCondiciones, "");
    return ok;
  }

  // --- Cálculo del total ---
  function calcularTotal() {
    const base = Number(producto?.value || 0);

    let extrasSum = 0;
    extras.forEach(chk => {
      if (chk.checked) extrasSum += Number(chk.value);
    });

    const dias = Number(plazo?.value || 0);

    // Descuento por plazo 
    let descuento = 0;
    if (dias >= 90) descuento = 0.15;
    else if (dias >= 60) descuento = 0.10;

    const subtotal = base + extrasSum;
    const total = subtotal * (1 - descuento);

    if (totalSpan) totalSpan.textContent = total.toFixed(2);
    if (totalInput) totalInput.value = total.toFixed(2);

    return total;
  }

  function validarPresupuesto() {
    let ok = true;

    // Producto obligatorio
    if (producto && !producto.value) ok = false;

    // Plazo obligatorio y válido
    const dias = Number(plazo?.value || 0);
    if (!dias || dias < 1) ok = false;

    return ok;
  }

  // --- Eventos para recalcular sin botones ---
  if (producto) producto.addEventListener("change", () => { calcularTotal(); });
  if (plazo) plazo.addEventListener("input", () => { calcularTotal(); });

  extras.forEach(chk => chk.addEventListener("change", () => { calcularTotal(); }));

  // Validación en vivo
  [nombre, apellidos, telefono, email].forEach(el => {
    if (el) el.addEventListener("input", validarContacto);
  });

  if (condiciones) condiciones.addEventListener("change", validarCondiciones);

  // Inicial
  calcularTotal();

  // --- Envío ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const okContacto = validarContacto();
    const okPresupuesto = validarPresupuesto();
    const okCond = validarCondiciones();

    if (!okContacto || !okPresupuesto || !okCond) return;

    alert("✅ Formulario enviado correctamente (simulación).");
    form.reset();
    setError(errCondiciones, "");
    calcularTotal();
  });

  // --- Reset ---
  form.addEventListener("reset", () => {
    setTimeout(() => {
      setError(errNombre, "");
      setError(errApellidos, "");
      setError(errTelefono, "");
      setError(errEmail, "");
      setError(errCondiciones, "");
      calcularTotal();
    }, 0);
  });
});
