import React, { useState } from 'react';
import './index.css'


export default function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/auth/generateToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const token = await response.text();
        localStorage.setItem('token', token);
        alert('Login Successful! Token stored.');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-blue-100 p-6">
            <h2 className="text-4xl font-bold text-primary my-4">Login</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <input type="email" name="username" placeholder="Email" className="input input-bordered w-full mb-4" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-4" onChange={handleChange} required />
                <button type="submit" className="btn btn-primary w-full">Login</button>
            </form>
        </div>
    );
}
