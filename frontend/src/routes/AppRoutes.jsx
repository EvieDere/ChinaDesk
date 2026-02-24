//Encargado de decir qué se va a mostrar dependiendo de qué se regrese
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";

//Se definen las rutas
export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            }/>

            <Route path="/" element= {<Home />}/>
            <Route path="*" element= {<Navigate to="/" replace/>}/>
        </Routes>
    )
}