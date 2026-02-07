let step = 0;

let order = {
  package: null,
  base: null,
  guisos: [],
  drinks: { agua: 0, refresco: 0, zero: 0 },
  total: 0
};

const steps = document.querySelectorAll('.step');

function showStep() {
  steps.forEach(s => s.classList.remove('active'));
  steps[step].classList.add('active');

  const footer = document.querySelector('footer');

  // Ocultar navegación SOLO en recibo
  if (step === steps.length - 1) {
    footer.style.display = 'none';
  } else {
    footer.style.display = 'flex';
  }
}


showStep();

/* -------- NAVEGACIÓN -------- */
function nextStep() {
  if (step < steps.length - 1) step++;

  // Si llegamos al último paso (recibo)
  if (step === steps.length - 1) {
    generateReceipt();
  }

  showStep();
}


function prevStep() {
  if (step > 0) step--;
  showStep();
}

/* -------- UTIL -------- */
function clearSelection(container) {
  container.querySelectorAll('.selected')
    .forEach(el => el.classList.remove('selected'));
}

/* -------- PAQUETE -------- */
function selectPackage(q, price, el) {
  order.package = q;
  order.total = price;
  order.guisos = []; // IMPORTANTE: reinicia guisos
  document.getElementById('limiteGuisos').innerText = q;

  clearSelection(el.parentElement);
  el.classList.add('selected');

  renderGuisos(); // vuelve a pintar guisos
}

/* -------- BASE -------- */
function selectBase(base, el) {
  order.base = base;
  clearSelection(el.parentElement);
  el.classList.add('selected');
}

/* -------- GUISOS -------- */
const guisosData = [
  { name: 'Res', img: '/public/Resources/Img-Menu/Res.png' },
  { name: 'Pollo', img: '/public/Resources/Img-Menu/Pollo.png' },
  { name: 'Puerco', img: '/public/Resources/Img-Menu/Puerco.png' },
  { name: 'Res picante', img: '/public/Resources/Img-Menu/Res picante.png' },
  { name: 'Pollo picante', img: '/public/Resources/Img-Menu/Pollo picante.png' },
  { name: 'Puerco picante', img: '/public/Resources/Img-Menu/Puerco picante.png' }
];

const guisosDiv = document.getElementById('guisos');

function renderGuisos() {
  guisosDiv.innerHTML = '';

  guisosData.forEach(g => {
    const card = document.createElement('div');
    card.className = 'card';

    if (order.guisos.includes(g.name)) {
      card.classList.add('selected');
    }

    card.innerHTML = `
      <img src="${g.img}">
      <p>${g.name}</p>
    `;

    card.onclick = () => toggleGuiso(g.name, card);
    guisosDiv.appendChild(card);
  });
}

function toggleGuiso(name, card) {
  const index = order.guisos.indexOf(name);

  if (index !== -1) {
    // quitar guiso
    order.guisos.splice(index, 1);
    card.classList.remove('selected');
  } else {
    // agregar guiso
    if (order.guisos.length >= order.package) {
    alert(`Solo puedes elegir ${order.package} guisos`); // Fíjate en el uso de ``
    return;
}
    order.guisos.push(name);
    card.classList.add('selected');
  }
}

/* -------- BEBIDAS -------- */
function changeDrink(type, val) {
  if (order.drinks[type] + val < 0 || order.drinks[type] + val > 10) return;
  order.drinks[type] += val;
  document.getElementById(type).innerText = order.drinks[type];
}

/---------CALC TOTAL--------/
function calculateTotal() {
  let total = 0;

  // Paquete
  if (order.package === 1) total += 140;
  if (order.package === 2) total += 160;
  if (order.package === 3) total += 185;

  // Bebidas
  total += order.drinks.agua * 20;
  total += order.drinks.refresco * 25;
  total += order.drinks.zero * 25;

  order.total = total;
  document.getElementById('total').innerText = total;
}



/* -------- PAGO -------- */
function generateReceipt() {
  calculateTotal();

  const time = new Date();
  time.setMinutes(time.getMinutes() + 25);

  document.getElementById('recibo').innerHTML = `
    <p><b>Paquete:</b> ${order.package} guisos</p>
    <p><b>Base:</b> ${order.base}</p>
    <p><b>Guisos:</b> ${order.guisos.join(', ')}</p>
    <p><b>Bebidas:</b></p>
    <ul>
      <li>Agua: ${order.drinks.agua}</li>
      <li>Refresco: ${order.drinks.refresco}</li>
      <li>Sin azúcar: ${order.drinks.zero}</li>
    </ul>
    <p><b>Total:</b> $${order.total}</p>
    <p><b>Hora aproximada:</b> ${time.toLocaleTimeString()}</p>
    <br>
    <button onclick="resetOrder()">Está todo listo</button>
  `;
}



/---------TERMINAR PEDIDO (VOLVER AL MENU)---------/
function resetOrder() {
  // Reiniciar datos
  order = {
    package: null,
    base: null,
    guisos: [],
    drinks: { agua: 0, refresco: 0, zero: 0 },
    total: 0
  };

  // Reset bebidas
  document.getElementById('agua').innerText = 0;
  document.getElementById('refresco').innerText = 0;
  document.getElementById('zero').innerText = 0;

  // 🔥 LIMPIAR TODAS LAS SELECCIONES VISUALES
  document.querySelectorAll('.card.selected')
    .forEach(card => card.classList.remove('selected'));

  // Limpiar guisos visuales
  guisosDiv.innerHTML = '';
  document.getElementById('limiteGuisos').innerText = 0;

  // Volver al inicio
  step = 0;
  showStep();
}