import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const { token, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center">
                <h1 className="navbar-title">Calories Tracker</h1>
                <ul className="navbar-links">
                    {/* <li><Link to="/" className="navbar-link">Home</Link></li> */}
                    {token ? (
                        <>
                            {/* <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li> */}
                            <li><button onClick={logout} className="navbar-link navbar-button">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="navbar-link">Login</Link></li>
                            <li><Link to="/register" className="navbar-link">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
