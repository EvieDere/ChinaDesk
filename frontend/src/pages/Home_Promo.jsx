import { Link } from "react-router-dom";
import "../assets/styles/Promocional.css";
import pruebaImg from "../assets/resources/imgsPromo/prueba.png"

export default function Home_Promo() {
    return (
        <div className="main">
          <header className="navbar">
            <h2 className="logo">China Food Desk</h2>
            <nav className="navigation">
                <a href="/login" className="btnLogin-link">Login</a>
            </nav>
          </header>

          <div className="header-content container">
            <div className="header-txt">
                <h1>¡Ven y Prueba Nuestros Platillos!</h1>
                    <p>¡Autentico Sabor Oriental!

                        Ven y prueba nuestros platillos únicos hechos con la mas alta calidad de ingredientes únicos importados desde China. 
                        Tenemos a los cocineros mas experimentados en la cocina oriental. 
                        Lo que hará que desde el primer aroma hasta el último bocado sea único. 
                        Cuidamos cada detalle para ofrecerte una experiencia increíble que querrás repetir. 
                        
                        No somos solo comida, somos el arte de la cocina oriental en tu mesa
                    </p>
            </div>

            <div className="header-img">
                <img src={pruebaImg} className="food" alt="food" />
            </div>

            <footer className="header-footer">
                <div className="footer-box">
                    <p>Tel: +52 81 2552 6789</p>
                    <p>Correo: chinadesk67@gmail.com</p>
                    <p>Horarios: Lun-Sab 11:00 AM - 10 PM</p>
                </div>
            </footer>
          </div>
        </div>
    )
}