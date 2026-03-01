import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../assets/styles/loginstyle.css";

export default function Login() {
    const [activeForm, setActiveForm] = useState("login");

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({ email: "", password: "", terms: false });

    const { login, register, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setRegisterData({ ...registerData, [e.target.name]: value });
    };

    async function handleLoginSubmit(e) {
    e.preventDefault();
    const user = await login(loginData.email, loginData.password); // ✅ user viene del return
    if (user) {
        if (user.role === "admin") {
            navigate("/Admin");
        } else {
            navigate("/Menu");
        }
    }
}
    async function handleRegisterSubmit(e) {
        e.preventDefault();
        const success = await register(registerData.email, registerData.password);
        if (success) {
            alert("Registro exitoso, por favor inicia sesión");
            setActiveForm("login");
            setRegisterData({ email: "", password: "", terms: false });
        }
    }

    return (
        <>
            <header>
                <h2 className="logo">China Food Desk</h2>
                <nav className="navigation">
                    <Link to="/">Home</Link>
                    <button
                        className="btnLogin-popup"
                        onClick={() => setActiveForm(activeForm === "login" ? "register" : "login")}
                    >
                        {activeForm === "login" ? "Register" : "Login"}
                    </button>
                </nav>
            </header>

            <div className={`wrapper ${activeForm === "login" ? "login-active" : "register-active"}`}>

                {/* <------------------- LOGIN ------------------>*/}
                {activeForm === "login" && (
                    <form className="form-box login" onSubmit={handleLoginSubmit}>
                        <h2>Login</h2>

                        {/* <------------------- Email ------------------>*/}
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail-outline"></ion-icon>
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                            />
                            <label>Email</label>
                        </div>

                        {/* <------------------- Password ------------------>*/}
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </span>
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                            />
                            <label>Password</label>
                        </div>

                        {/* <------------------- Remember ------------------>*/}
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#">Forgot Password?</a>
                        </div>

                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? "Cargando..." : "Login"}
                        </button>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        {/* <------------------- Link a Register ------------------>*/}
                        <div className="login-register">
                            <p>
                                Don't have an account?{" "}
                                <a href="#" onClick={(e) => { e.preventDefault(); setActiveForm("register"); }}>
                                    Register
                                </a>
                            </p>
                        </div>
                    </form>
                )}

                {/* <------------------- REGISTER ------------------>*/}
                {activeForm === "register" && (
                    <form className="form-box register" onSubmit={handleRegisterSubmit}>
                        <h2>Registration</h2>

                        {/* <------------------- Email ------------------>*/}
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail-outline"></ion-icon>
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                            />
                            <label>Email</label>
                        </div>

                        {/* <------------------- Password ------------------>*/}
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                            </span>
                            <input
                                type="password"
                                name="password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                            />
                            <label>Password</label>
                        </div>

                        {/* <------------------- Terms ------------------>*/}
                        <div className="remember-forgot">
                            <label>
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={registerData.terms}
                                    onChange={handleRegisterChange}
                                    required
                                />
                                I agree to the terms & conditions
                            </label>
                        </div>

                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? "Registrando..." : "Register"}
                        </button>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        {/* <------------------- Link a Login ------------------>*/}
                        <div className="login-register">
                            <p>
                                Already have an account?{" "}
                                <a href="#" onClick={(e) => { e.preventDefault(); setActiveForm("login"); }}>
                                    Login
                                </a>
                            </p>
                        </div>
                    </form>
                )}

            </div>
        </>
    );
}