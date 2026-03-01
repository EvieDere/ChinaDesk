import { useState, useEffect } from "react";
import { api } from "../services/api";
import "../assets/styles/Menu.css";
import { orderData, readPackages, readGuisos, readDrinks } from "../services/order";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Clima from "../components/apiBtn";

export default function Menu() {

  const [openMenu, setOpenMenu] = useState(false);

  const [packages, setPackages] = useState([]);
  const [guisos, setGuisos] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

  const [packageID, setPackageID] = useState(null);
  const [sideID, setSideID] = useState(null);
  const [stewID, setStewID] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [payMS, setPayMS] = useState("");
  const [sideList, setSideList] = useState([]);
  
  const [showReceipt, setShowReceipt] = useState(false);
  const [arrivalTime, setArrivalTime] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  }

  useEffect(() => {
    if (openMenu) {
      fetchPackages();
      fetchGuisos();
      fetchDrinks();
    }
  }, [openMenu]);

  async function fetchPackages() {
    try {
      const data = await readPackages.readPK();
      setPackages(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchGuisos() {
    try {
      const data = await readGuisos.readG();
      const disponibles = data.filter(item => item.availability === true);

      const sides = disponibles.filter(
        item => item.name.toLowerCase() === "arroz" ||
                item.name.toLowerCase() === "pasta"
      );

      const realStews = disponibles.filter(
        item => item.name.toLowerCase() !== "arroz" &&
                item.name.toLowerCase() !== "pasta"
      );

      setGuisos(realStews);
      setSideList(sides);

    } catch (err) {
      console.error(err);
    }
  }

  async function fetchDrinks() {
    try {
      const data = await readDrinks.readD();
      setDrinksList(data);
    } catch (err) {
      console.error(err);
    }
  }

  // ===============================
  // AGREGAR / QUITAR BEBIDAS
  // ===============================
  function addDrink(drinkId) {
    setDrinks(prev => {
      const existing = prev.find(d => d.drinkId === drinkId);

      if (existing) {
        return prev.map(d =>
          d.drinkId === drinkId
            ? { ...d, quantity: d.quantity + 1 }
            : d
        );
      }

      return [...prev, { drinkId, quantity: 1 }];
    });
  }

  function removeDrink(drinkId) {
    setDrinks(prev => {
      const existing = prev.find(d => d.drinkId === drinkId);
      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter(d => d.drinkId !== drinkId);
      }

      return prev.map(d =>
        d.drinkId === drinkId
          ? { ...d, quantity: d.quantity - 1 }
          : d
      );
    });
  }

  function getDrinkQuantity(drinkId) {
    const found = drinks.find(d => d.drinkId === drinkId);
    return found ? found.quantity : 0;
  }

  // ===============================
  // CONFIRMAR ORDEN
  // ===============================
  async function handleConfirm() {

    if (!packageID) {
      alert("Selecciona un paquete");
      return;
    }

    if (!sideID) {
      alert("Selecciona arroz o pasta");
      return;
    }

    if (stewID.length === 0) {
      alert("Selecciona al menos un guiso");
      return;
    }

    if (drinks.length === 0) {
      alert("Selecciona al menos una bebida");
      return;
    }

    if (!payMS) {
      alert("Selecciona método de pago");
      return;
    }

    try {

      console.log("ENVIANDO SIDE COMO ADDON:", sideID);

      await orderData.createOD(
        packageID,
        sideID, 
        stewID,
        drinks.map(d => ({
          id: d.drinkId,
          quantity: d.quantity
        })),
        payMS
      );

      alert("Orden creada correctamente ");

      setPackageID(null);
      setSideID(null);
      setStewID([]);
      setDrinks([]);
      setPayMS("");
      setOpenMenu(false);

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // ===============================
  // POP UP DEL RECIBO
  // ===============================

  function showReceiptPopup() {

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);

    setArrivalTime(now.toLocaleTimeString());
    setShowReceipt(true);
  }

  return (
    <div className="china-container">
      <div className="top-bar">
        <button
          onClick = {handleLogout}
          style = {{
            padding: "8px 15px",
            cursor: "pointer",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Cerrar sesión
        </button>
        <Clima />
      </div>

      <div className="cajita">
        <h1 className="titulo">CHINA DESK</h1>

        <button
          className="btn-abrir"
          onClick={() => setOpenMenu(true)}
        >
          Abrir Menú
        </button>
      </div>

      {openMenu && (
        <div className="popup">

          <div className="menu-container">

            <button
              className="cerrar"
              onClick={() => setOpenMenu(false)}
            >
              ✕
            </button>

            {/* PAQUETES */}
            <div className="seccion">
              {packages.map(pkg => (
                <button
                  key={pkg._id}
                  className={`btn-menu ${packageID === pkg._id ? "selected" : ""}`}
                  onClick={() => setPackageID(pkg._id)}
                >
                  {pkg.name}
                  <br />
                  ${pkg.price}
                </button>
              ))}
            </div>

            {/* ARROZ / PASTA */}
            <div className="seccion">
              {sideList.map(side => (
                <button
                  key={side._id}
                  className={`btn-menu ${sideID === side._id ? "selected" : ""}`}
                  onClick={() => setSideID(side._id)}
                >
                  {side.name}
                </button>
              ))}
            </div>

            {/* GUISOS */}
            <div className="seccion">
              {guisos.map(stew => (
                <button
                  key={stew._id}
                  className={`btn-menu ${stewID.includes(stew._id) ? "selected" : ""}`}
                  onClick={() => {

                    const selectedPackage = packages.find(p => p._id === packageID);
                    if (!selectedPackage) return;

                    let limit = 0;
                    if (selectedPackage.name.includes("1")) limit = 1;
                    if (selectedPackage.name.includes("2")) limit = 2;
                    if (selectedPackage.name.includes("3")) limit = 3;

                    if (stewID.includes(stew._id)) {
                      setStewID(prev => prev.filter(id => id !== stew._id));
                    } else {
                      if (stewID.length < limit) {
                        setStewID(prev => [...prev, stew._id]);
                      }
                    }

                  }}
                >
                  {stew.name}
                </button>
              ))}
            </div>

            {/* BEBIDAS */}
            <div className="seccion">
              {drinksList
                .filter(drinks => drinks.stock > 0)
                .map(drink => {

                  const qty = getDrinkQuantity(drink._id);

                  return (
                    <div key={drink._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      
                      <button
                        className={`btn-menu ${qty > 0 ? "selected" : ""}`}
                        onClick={() => addDrink(drink._id)}
                      >
                        {drink.name}
                        <br />
                        ${drink.price}
                      </button>

                      {qty > 0 && (
                        <>
                          <button onClick={() => removeDrink(drink._id)}>-</button>
                          <span>{qty}</span>
                        </>
                      )}

                    </div>
                  );
              })}
            </div>

            {/* METODO PAGO */}
            <div className="seccion">
              <button
                className={`btn-menu ${payMS === "efectivo" ? "selected" : ""}`}
                onClick={() => setPayMS("efectivo")}
              >
                Efectivo
              </button>

              <button
                className={`btn-menu ${payMS === "tarjeta" ? "selected" : ""}`}
                onClick={() => setPayMS("tarjeta")}
              >
                Tarjeta
              </button>
            </div>

            {/* METODO DE TARJETA */}
            {payMS === "tarjeta" && (
              <div className="card-form">

                <input
                  placeholder="Número de tarjeta"
                  maxLength={16}
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value.replace(/\D/g, ""))}
                />

                <input
                  placeholder="Nombre en tarjeta"
                  value={cardName}
                  onChange={e => setCardName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
                />

                <input
                  placeholder="MM/AA"
                  maxLength={5}
                  value={cardDate}
                  onChange={e => setCardDate(e.target.value)}
                />

                <input
                  placeholder="CVV"
                  maxLength={3}
                  value={cardCVV}
                  onChange={e => setCardCVV(e.target.value.replace(/\D/g, ""))}
                />

              </div>
            )}

            {/* RECIBO */}
            {showReceipt && (
              <div className="receipt-popup">
                <h2>Pedido Confirmado 🎉</h2>
                <p>Hora estimada de llegada:</p>
                <h3>{arrivalTime}</h3>

                <button onClick={() => {
                  setShowReceipt(false);
                  setPackageID(null);
                  setSideID(null);
                  setStewID([]);
                  setDrinks([]);
                  setPayMS("");
                  setOpenMenu(false);
                }}>
                  Cerrar
                </button>
              </div>
            )}

            <button
              className="btn-confirmar"
              disabled={!packageID || !payMS}
              onClick={handleConfirm}
            >
              Confirmar Pedido
            </button>

          </div>
        </div>
      )}

    </div>
  );
}