import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "../pages/Menu";
import Home_Promo from "../pages/Home_Promo";
import PrivateRoute from "./PrivateRoute";
import Products from "../pages/Products";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home_Promo />} />
            <Route path="/Products" element={<Products />} />

            {/* Solo admin */}
            <Route path="/Admin" element={
                <PrivateRoute requiredRole="admin">
                    <Admin />
                </PrivateRoute>
            }/>

            {/* Solo user */}
            <Route path="/Menu" element={
                <PrivateRoute requiredRole="user">
                    <Menu />
                </PrivateRoute>
            }/>

            {/* Página de acceso denegado */}
            <Route path="/unauthorized" element={
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <h2>Acceso no autorizado</h2>
                    <a href="/login">Volver al login</a>
                </div>
            }/>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}