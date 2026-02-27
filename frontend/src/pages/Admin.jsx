import { data, Link } from "react-router-dom";
import "../assets/styles/interfazstyle.css";
import AvatarImg from "../assets/resources/imgInter/Avatar.png";
import { useState } from "react";
import PaquetesForm from "../components/Admin/PaquetesForm";
import AvailForm from "../components/Admin/AvailForm";
import DrinksForm from "../components/Admin/DrinksForm";

export default function Admin() {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div id="wrapper"> 
            <div className="sidebar">
                <div className="sidebar-brand">CHINADESK</div>
                <hr />
                    <button className="crud-btn" onClick={() => toggleSection("paquetes")}>Paquetes</button>
                    <button className="crud-btn" onClick={() => toggleSection("disponibilidad de guisos")}>Disponibilidad de Guisos</button>
                    <button className="crud-btn" onClick={() => toggleSection("bebidas")}>Bebidas</button>
                    <button className="crud-btn" onClick={() => toggleSection("ordenes")}>Ordenes</button>
                    <button className="crud-btn" onClick={() => toggleSection("sugerencias")}>Sugerencias</button>


                    <button className="logout-btn">Logout</button>
            </div>

            <div id="content-wrapper">
                <div id="content">

                    <div className="topbar">
                        <div className="profile">
                            <span>Admin</span>
                            <img src={AvatarImg} className="admin" alt="admin" />
                        </div>
                    </div>

                    <div className="main-content">
                        <div className="bd-card">
                            {activeSection === "paquetes" && (
                                <PaquetesForm 
                                    initialValue={null}
                                    onSubmit={(data) => console.log("guardar", data)}
                                    onCancel={() => console.log("cancel paquetes")}
                                    busy={false}
                                />
                            )};

                            {activeSection === "disponibilidad de guisos" && (
                                <AvailForm 
                                    initialValue={null}
                                    onSubmit={(data) => console.log("guardar disponibilidad", data)}
                                    onCancel={() => console.log("cancel disponibilidad")}
                                    busy={false}
                                />
                            )};

                            {activeSection === "bebidas" && (
                                <DrinksForm 
                                    initialValue={null}
                                    onSubmit={(data) => console.log("guardar bebida", data)}
                                    onCancel={() => console.log("cancel bebidas")}
                                    busy={false}
                                />
                            )};

                            {activeSection === "ordenes" && <h1>Ordenes</h1>}
                            {activeSection === "sugerencias" && <h1>Sugerencias</h1>}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
