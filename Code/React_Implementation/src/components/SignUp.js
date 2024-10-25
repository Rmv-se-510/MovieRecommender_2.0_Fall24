// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const SignUp = ({handleSignin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        // Handle actual authentication logic here
        // If successful, call handlesignin function
        if (email && password) {
            handleSignin();
            navigate('dashboard');
        }
    };

    return (  
        <div className='login-container'>
            <div className='login-box'>
                <h2>Create Account</h2>
                <p>Join us by creating an account</p>
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
                    <button type="submit" className='login-btn'>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
