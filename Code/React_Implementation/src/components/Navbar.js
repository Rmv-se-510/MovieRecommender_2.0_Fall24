// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = ({ isLoggedIn, onLogout }) => {
    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <a href="/" className='logo-link'>MovieNext</a>
            </div>
            <ul className='navbar-links'>
                <li><a href="/#about">About Us</a></li>
                {/* <li>
                    {isLoggedIn ? (
                        <div>
                            <span onClick={onLogout}>Logout</span>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </li> */}
                {isLoggedIn ? (
                    <li><a href="/" onClick={onLogout}>Logout</a></li>
                ) : (
                    <>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Sign Up</a></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
