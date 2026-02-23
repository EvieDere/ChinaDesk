import { Link } from "react-router-dom";

export default function NavBar() {
    return(
        <div style= {{display: "flex", gap: 12}}>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}