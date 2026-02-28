import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, requiredRole }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    if (!user) return <Navigate to="/login" replace />;

    // Si se requiere un rol específico y el usuario no lo tiene
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}