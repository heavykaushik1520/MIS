// App.js
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <Navbar />
            <div className="p-4">
                <Outlet />
            </div>
        </>
    );
}
export default App;