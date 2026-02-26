/* -------- ABRIR Y CERRAR POPUP -------- */

const overlay = document.getElementById("overlay");
const abrirBtn = document.getElementById("abrirMenu");
const cerrarBtn = document.getElementById("cerrarMenu");

abrirBtn.addEventListener("click", () => {
  overlay.classList.add("active");
});

cerrarBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  resetOrder(); 
});

/* Cerrar al hacer click fuera del menú */
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
    resetOrder(); 
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
const cerrarTarjeta = document.getElementById("cerrarTarjeta");

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

/* -------- CERRAR TARJETA -------- */

cerrarTarjeta.addEventListener("click", () => {
  overlayTarjeta.classList.remove("active");
  metodoPago.value = "";
});


/* -------- INPUTS -------- */

const numeroInput = document.getElementById("numeroTarjeta");
const nombreInput = document.getElementById("nombreTarjeta");
const fechaInput = document.getElementById("fechaTarjeta");
const cvvInput = document.getElementById("cvvTarjeta");


/* -------- FUNCION ERROR VISUAL -------- */

function marcarError(input){
  input.classList.add("input-error");
  setTimeout(() => {
    input.classList.remove("input-error");
  }, 500);
}


/* -------- FORMATEAR TARJETA-------- */

numeroInput.addEventListener("input", () => {

  let value = numeroInput.value.replace(/\D/g, "").slice(0,16);

  /* FORMATEO 1234 5678 9012 3456 */
  value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

  numeroInput.value = value;

  detectarTipoTarjeta(value.replace(/\s/g, ""));
});


function detectarTipoTarjeta(numero){

  if(numero.startsWith("4")){
    cardTypeDiv.innerText = "💳 Visa";
  }
  else if(numero.startsWith("5")){
    cardTypeDiv.innerText = "💳 MasterCard";
  }
  else if(numero.startsWith("3")){
    cardTypeDiv.innerText = "💳 American Express";
  }
  else{
    cardTypeDiv.innerText = "";
  }
}


/* SOLO LETRAS NOMBRE */
nombreInput.addEventListener("input", () => {
  nombreInput.value = nombreInput.value.replace(/[^a-zA-ZÁÉÍÓÚáéíóúÑñ\s]/g, "");
});

/* FECHA MM/AA */
fechaInput.addEventListener("input", () => {

  let value = fechaInput.value.replace(/\D/g, "").slice(0,4);

  if (value.length >= 3) {
    value = value.slice(0,2) + "/" + value.slice(2);
  }

  fechaInput.value = value;
});

/* SOLO 3 DIGITOS CVV */
cvvInput.addEventListener("input", () => {
  cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0,3);
});


document.getElementById("btnListoTarjeta").addEventListener("click", (e) => {

  e.preventDefault(); 

  const numero = numeroInput.value.replace(/\s/g, "");
  const nombre = nombreInput.value.trim();
  const fecha = fechaInput.value;
  const cvv = cvvInput.value;

  let valido = true; // bandera de control

  /* RESET ERRORES VISUALES */
  [numeroInput, nombreInput, fechaInput, cvvInput].forEach(input => {
    input.classList.remove("input-error");
  });

  /* VALIDAR NUMERO */
  if (numero.length !== 16){
    marcarError(numeroInput);
    valido = false;
  }

  /* VALIDAR NOMBRE */
  if (nombre.length < 3){
    marcarError(nombreInput);
    valido = false;
  }

  /* VALIDAR FECHA */
  const fechaRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!fechaRegex.test(fecha)){
    marcarError(fechaInput);
    valido = false;
  } else {

    const [mes, anio] = fecha.split("/");
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear() % 100;
    const mesActual = fechaActual.getMonth() + 1;

    if (
      parseInt(anio) < anioActual ||
      (parseInt(anio) === anioActual && parseInt(mes) < mesActual)
    ){
      marcarError(fechaInput);
      valido = false;
    }
  }

  /* VALIDAR CVV */
  if (cvv.length !== 3){
    marcarError(cvvInput);
    valido = false;
  }

  /* 🔥 SI NO ES VALIDO → NO HACE NADA MÁS */
  if (!valido){
    pagoValido = false;
    confirmarBtn.disabled = true;
    return;
  }

  /* TODO CORRECTO */
  pagoValido = true;
  confirmarBtn.disabled = false;
  overlayTarjeta.classList.remove("active");
});


/* ---------------- RECIBO ---------------- */

const overlayRecibo = document.getElementById("overlayRecibo");
const contenidoRecibo = document.getElementById("contenidoRecibo");

function generarReciboPopup() {

  if (!order.package || !order.base || order.guisos.length === 0 || !pagoValido) {
    alert("Pedido o pago incompleto");
    return;
  }

  calculateTotal();

  let bebidasHTML = "";
  let bebidaPrecioTotal = 0;
  let metodoPagoTexto = metodoPago.value;

  if (order.drinks.agua > 0) {
    const subtotal = order.drinks.agua * 20;
    bebidaPrecioTotal += subtotal;
    bebidasHTML += `<p>${order.drinks.agua} agua(s) - $${subtotal}</p>`;
  }

  if (order.drinks.refresco > 0) {
    const subtotal = order.drinks.refresco * 25;
    bebidaPrecioTotal += subtotal;
    bebidasHTML += `<p>${order.drinks.refresco} refresco(s) - $${subtotal}</p>`;
  }

  if (order.drinks.zero > 0) {
    const subtotal = order.drinks.zero * 25;
    bebidaPrecioTotal += subtotal;
    bebidasHTML += `<p>${order.drinks.zero} sin azúcar - $${subtotal}</p>`;
  }

  contenidoRecibo.innerHTML = `
    <p><b>Paquete:</b> ${order.package} guiso(s) - $${order.total - bebidaPrecioTotal}</p>
    <p><b>Base:</b> ${order.base}</p>
    <p><b>Guisos:</b> ${order.guisos.join(", ")}</p>
    ${bebidasHTML}
    <hr>
    <p><b>Método de pago:</b> ${metodoPagoTexto}</p>
    <p><b>Total:</b> $${order.total}</p>
    <p><b>Hora listo:</b> ${obtenerHoraLista()}</p>
  `;

  overlayRecibo.classList.add("active");
}

function obtenerHoraLista() {
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() + 20);

  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');

  return `${horas}:${minutos}`;
}

/* ---------------- CIERRE PROFESIONAL ---------------- */

const overlayConfirmacionFoto = document.getElementById("overlayConfirmacionFoto");
const btnFotoTomada = document.getElementById("btnFotoTomada");
const btnVolverRecibo = document.getElementById("btnVolverRecibo");
const btnCerrarRecibo = document.getElementById("btnCerrarRecibo");

/* Botón flecha del recibo */
btnCerrarRecibo.addEventListener("click", () => {
  overlayConfirmacionFoto.classList.add("active");
});

/* Cliente olvidó tomar foto */
btnVolverRecibo.addEventListener("click", () => {
  overlayConfirmacionFoto.classList.remove("active");
});

/* Cliente sí tomó foto */
btnFotoTomada.addEventListener("click", () => {

  overlayConfirmacionFoto.classList.remove("active");
  overlayRecibo.classList.remove("active");
  overlay.classList.remove("active");

  resetOrder();
});

/* ---------------- CONFIRMAR ---------------- */

confirmarBtn.addEventListener("click", () => {
  generarReciboPopup();
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
  contenidoRecibo.innerHTML = '';

  guisosDiv.innerHTML = '';
  
  confirmarBtn.disabled = true;
  pagoValido = false;

  // Limpiar método de pago
  metodoPago.value = "";

  // Limpiar campos tarjeta
  document.getElementById("numeroTarjeta").value = "";
  document.getElementById("nombreTarjeta").value = "";
  document.getElementById("fechaTarjeta").value = "";
  document.getElementById("cvvTarjeta").value = "";

  // Ocultar formulario tarjeta si lo tienes dinámico
  formularioTarjeta.style.display = "none";
  }

/* ---------------- LOGOUT ---------------- */

const logoutBtn = document.getElementById("logoutBtn");
const overlayLogout = document.getElementById("overlayLogout");
const btnRegresar = document.getElementById("btnRegresar");
const btnConfirmLogout = document.getElementById("btnConfirmLogout");

/* Abrir confirmación */
logoutBtn.addEventListener("click", () => {
    overlayLogout.classList.add("active");
});

/* Regresar */
btnRegresar.addEventListener("click", () => {
    overlayLogout.classList.remove("active");
});

/* Confirmar logout */
btnConfirmLogout.addEventListener("click", () => {

    overlayLogout.classList.remove("active");

    alert("Sesión cerrada correctamente");

});