// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        // Handle actual authentication logic here
        // If successful, call handleLogin function
        if (email && password) {
            handleLogin();
            navigate('/dashboard'); // Redirect to dashboard on successful login
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2>Welcome Back</h2>
                <p>Please login to your account</p>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='input-container'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='input-container'
                    />
                    <button type="submit" className='login-btn'>Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
