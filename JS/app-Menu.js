/* -------- ABRIR Y CERRAR POPUP -------- */

const overlay = document.getElementById("overlay");
const abrirBtn = document.getElementById("abrirMenu");
const cerrarBtn = document.getElementById("cerrarMenu");

abrirBtn.addEventListener("click", () => {
  overlay.classList.add("active");
});

cerrarBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  resetOrder(); // 🔥 LIMPIAR PEDIDO AL CERRAR
});

/* Cerrar al hacer click fuera del menú */
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
    resetOrder(); // 🔥 LIMPIAR TAMBIÉN AQUÍ
  }
});


/* ---------------- ESTADO GLOBAL ---------------- */

let order = {
  package: null,
  base: null,
  guisos: [],
  drinks: { agua: 0, refresco: 0, zero: 0 },
  total: 0
};


/* ---------------- PAQUETE ---------------- */

document.querySelectorAll('[data-package]').forEach(card => {
  card.addEventListener('click', () => {

    order.package = parseInt(card.dataset.package);
    order.guisos = [];

    document.querySelectorAll('[data-package]')
      .forEach(c => c.classList.remove('active'));

    card.classList.add('active');

    renderGuisos();
    calculateTotal();
  });
});


/* ---------------- BASE ---------------- */

document.querySelectorAll('.base-option').forEach(card => {
  card.addEventListener('click', () => {

    order.base = card.dataset.base;

    document.querySelectorAll('.base-option')
      .forEach(c => c.classList.remove('active'));

    card.classList.add('active');
  });
});


/* ---------------- GUISOS ---------------- */

const guisosData = [
  "Res",
  "Pollo",
  "Puerco",
  "Res Picante",
  "Pollo Picante",
  "Puerco Picante"
];

const guisosDiv = document.getElementById('guisos');

function renderGuisos() {

  guisosDiv.innerHTML = '';

  guisosData.forEach(g => {

    const card = document.createElement('div');
    card.className = 'card';
    card.innerText = g;

    card.onclick = () => toggleGuiso(g, card);

    guisosDiv.appendChild(card);
  });
}

function toggleGuiso(name, card) {

  if (!order.package) {
    alert("Selecciona primero un paquete");
    return;
  }

  const index = order.guisos.indexOf(name);

  if (index !== -1) {
    order.guisos.splice(index, 1);
    card.classList.remove('active');
  } else {

    if (order.guisos.length >= order.package) {
      alert(`Solo puedes elegir ${order.package} guisos`);
      return;
    }

    order.guisos.push(name);
    card.classList.add('active');
  }
}


/* ---------------- BEBIDAS ---------------- */

function changeDrink(type, val) {

  if (order.drinks[type] + val < 0 || order.drinks[type] + val > 10)
    return;

  order.drinks[type] += val;
  document.getElementById(type).innerText = order.drinks[type];

  calculateTotal();
}


/* ---------------- TOTAL ---------------- */

function calculateTotal() {

  let total = 0;

  if (order.package === 1) total += 140;
  if (order.package === 2) total += 160;
  if (order.package === 3) total += 185;

  total += order.drinks.agua * 20;
  total += order.drinks.refresco * 25;
  total += order.drinks.zero * 25;

  order.total = total;

  document.getElementById('total').innerText = total;
}


/* ---------------- MÉTODO DE PAGO ---------------- */

const metodoPago = document.getElementById("metodoPago");
const confirmarBtn = document.getElementById("confirmarPedido");
const overlayTarjeta = document.getElementById("overlayTarjeta");

let pagoValido = false;

metodoPago.addEventListener("change", () => {

  if (metodoPago.value === "efectivo") {
    pagoValido = true;
    confirmarBtn.disabled = false;
  }

  if (metodoPago.value === "tarjeta") {
    overlayTarjeta.classList.add("active");
    pagoValido = false;
    confirmarBtn.disabled = true;
  }

  if (metodoPago.value === "") {
    pagoValido = false;
    confirmarBtn.disabled = true;
  }
});


document.getElementById("btnListoTarjeta").addEventListener("click", () => {

  const numero = document.getElementById("numeroTarjeta").value;
  const nombre = document.getElementById("nombreTarjeta").value;
  const fecha = document.getElementById("fechaTarjeta").value;
  const cvv = document.getElementById("cvvTarjeta").value;

  if (numero && nombre && fecha && cvv) {
    pagoValido = true;
    confirmarBtn.disabled = false;
    overlayTarjeta.classList.remove("active");
  } else {
    alert("Completa todos los datos de la tarjeta");
  }
});


/* ---------------- RECIBO ---------------- */

function generateReceipt() {

  if (!order.package || !order.base || order.guisos.length === 0) {
    alert("Completa tu pedido antes de confirmar");
    return false;
  }

  calculateTotal();

  const time = new Date();
  time.setMinutes(time.getMinutes() + 25);

  document.getElementById('recibo').innerHTML = `
    <hr>
    <p><b>Paquete:</b> ${order.package} guisos</p>
    <p><b>Base:</b> ${order.base}</p>
    <p><b>Guisos:</b> ${order.guisos.join(', ')}</p>
    <p><b>Total:</b> $${order.total}</p>
    <p><b>Hora aproximada:</b> ${time.toLocaleTimeString()}</p>
    <br>
    <button onclick="resetOrder()">Nuevo Pedido</button>
  `;

  return true;
}


/* ---------------- CONFIRMAR ---------------- */

confirmarBtn.addEventListener("click", () => {

  if (!pagoValido) {
    alert("Selecciona un método de pago válido");
    return;
  }

  const generado = generateReceipt();

  if (generado) {
    overlaySugerencia.classList.add("active");
  }
});


/* ---------------- SUGERENCIA ---------------- */

const overlaySugerencia = document.getElementById("overlaySugerencia");
const cerrarSugerencia = document.getElementById("cerrarSugerencia");
const comentarioInput = document.getElementById("comentarioUsuario");
const btnEnviarSug = document.getElementById("btnEnviarSugerencia");
const btnNoSug = document.getElementById("btnNoSugerencia");

cerrarSugerencia.addEventListener("click", () => {
  overlaySugerencia.classList.remove("active");
});

comentarioInput.addEventListener("input", () => {
  btnEnviarSug.disabled = comentarioInput.value.trim() === "";
});

btnEnviarSug.addEventListener("click", () => {
  alert("Gracias por tu sugerencia ❤️");
  overlaySugerencia.classList.remove("active");
  comentarioInput.value = "";
});

btnNoSug.addEventListener("click", () => {
  overlaySugerencia.classList.remove("active");
});


/* ---------------- RESET ---------------- */

function resetOrder() {

  order = {
    package: null,
    base: null,
    guisos: [],
    drinks: { agua: 0, refresco: 0, zero: 0 },
    total: 0
  };

  document.querySelectorAll('.card')
    .forEach(card => card.classList.remove('active'));

  document.getElementById('agua').innerText = 0;
  document.getElementById('refresco').innerText = 0;
  document.getElementById('zero').innerText = 0;

  document.getElementById('total').innerText = 0;
  document.getElementById('recibo').innerHTML = '';

  guisosDiv.innerHTML = '';

  metodoPago.value = "";
  confirmarBtn.disabled = true;
  pagoValido = false;
}