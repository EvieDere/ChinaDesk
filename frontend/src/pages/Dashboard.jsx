import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./Dashboard.css";

export default function Menu() {
  return (
    <>
      <header>

        <div className="marco-superior">
          <div className="anillo anillo-izq"></div>
          <div className="anillo anillo-der"></div>

          <div className="titulo-container">
            <h1>CHINA DESK</h1>
          </div>
        </div>

        <button id="abrirMenu" className="btn-abrir">
          Hacer Pedido
          <span className="flecha"></span>
        </button>

      </header>

      {/* OVERLAY MENU */}
      <div className="overlay" id="overlay">
        <div className="menu-container">

          <button className="cerrar" id="cerrarMenu">✕</button>

          <h2>Arma tu Platillo</h2>

          {/* PAQUETE */}
          <div className="seccion">
            <h3>1. Elige tu Platillo</h3>
            <div className="opciones">
              <div className="card" data-package="1" data-price="140">1 Guiso</div>
              <div className="card" data-package="2" data-price="160">2 Guisos</div>
              <div className="card" data-package="3" data-price="185">3 Guisos</div>
            </div>
          </div>

          {/* BASE */}
          <div className="seccion">
            <h3>2. Arroz o Pasta</h3>
            <div className="opciones">
              <div className="card base-option" data-base="Arroz">Arroz</div>
              <div className="card base-option" data-base="Pasta">Pasta</div>
            </div>
          </div>

          {/* GUISOS */}
          <div className="seccion">
            <h3>3. Guisos</h3>
            <div className="opciones" id="guisos"></div>
          </div>

          {/* BEBIDAS */}
          <div className="seccion">
            <h3>4. Bebidas</h3>

            <div className="drink">
              <span>Agua</span>
              <button>-</button>
              <span id="agua">0</span>
              <button>+</button>
            </div>

            <div className="drink">
              <span>Refresco</span>
              <button>-</button>
              <span id="refresco">0</span>
              <button>+</button>
            </div>

            <div className="drink">
              <span>Sin Azúcar</span>
              <button>-</button>
              <span id="zero">0</span>
              <button>+</button>
            </div>
          </div>

          <div className="seccion total-section">
            <h3>Total: $<span id="total">0</span></h3>
          </div>

          <div className="seccion">
            <h3>5. Método de Pago</h3>
            <select id="metodoPago">
              <option value="">Selecciona método</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>

          <div id="recibo"></div>

          <button className="btn-confirmar" id="confirmarPedido" disabled>
            Confirmar Pedido
          </button>

        </div>
      </div>
    </>
  );
}