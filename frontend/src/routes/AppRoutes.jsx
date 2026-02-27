//Encargado de decir qué se va a mostrar dependiendo de qué se regrese
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home_Promo from "../pages/Home_Promo";
import PrivateRoute from "./PrivateRoute";
import Products from "../pages/Products";
import Admin from "../pages/Admin";


//Se definen las rutas
export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            }/>

            <Route path="/" element= {<Home_Promo />}/>

            <Route path="/Products" element= {<Products />}/>

            <Route path="/Admin" element= {<Admin />}/>

            <Route path="*" element= {<Navigate to="/" replace/>}/>
        </Routes>
    )
}