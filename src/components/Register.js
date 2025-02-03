import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Register.css'; // Import the CSS

const Register = () => {
    const { handleRegister } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister(username, password, email);
            navigate("/login"); // Redirect after successful registration
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="form-container">
                <h2 className="form-heading">Register</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </form>
                <p className="redirect-text">
                    Already have an account? <a href="/login" className="link">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
