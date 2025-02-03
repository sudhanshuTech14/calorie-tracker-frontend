import React, { createContext, useState, useEffect } from "react";
import { login, register, logout, setAuthToken } from "../api"; // Import API functions

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [username, setUsername] = useState(localStorage.getItem("username") || ""); // Add username state

    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    // Handle login, save token and username to localStorage
    const handleLogin = async (username, password) => {
        const userToken = await login(username, password);
        setToken(userToken);
        setUsername(username); // Save username after login
        localStorage.setItem("token", userToken); // Store token in localStorage
        localStorage.setItem("username", username); // Store username in localStorage
    };

    const handleRegister = async (username, password, email) => {
        await register(username, password, email);
    };

    const handleLogout = () => {
        logout();
        setToken("");
        setUsername(""); // Clear username on logout
        localStorage.removeItem("token");
        localStorage.removeItem("username"); // Remove username from localStorage
    };

    return (
        <AuthContext.Provider value={{ token, username, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
