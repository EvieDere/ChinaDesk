import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const success = await login(email, password);

        if (success) {
            navigate("/");
        }
    }

    return (
        <>
            <NavBar />

            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Login"}
                </button>

                {error && <p style={{color:"red"}}>{error}</p>}
            </form>
        </>
    );
}