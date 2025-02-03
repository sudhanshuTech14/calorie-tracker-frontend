import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Login = () => {
    const { handleLogin } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(username, password);
            navigate("/dashboard"); // Redirect after successful login
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-heading">Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Login
                    </button>
                </form>
                <p className="register-link">
                    Don't have an account?{" "}
                    <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
