import React from 'react';
import './index.css'

export default function Forbidden() {
    return (
        <div className="text-center p-6">
            <h1 className="text-4xl font-bold text-red-500">403 Forbidden</h1>
            <p className="text-lg mt-4">You don't have permission to access this page.</p>
        </div>
    );
}
