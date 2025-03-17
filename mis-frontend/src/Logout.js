import React from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';


export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await fetch('http://localhost:8080/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.text();
        alert(result);
        localStorage.removeItem('token');
        navigate("/login");

    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-red-100 p-6">
            <h2 className="text-4xl font-bold text-red-500 my-4">Logout</h2>
            <button onClick={handleLogout} className="btn btn-error w-full max-w-md">Logout</button>
        </div>
    );
}
