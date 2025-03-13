import React, { useEffect, useState } from 'react';
import './index.css'


export default function UserProfile() {
    const [profile, setProfile] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('http://localhost:8080/auth/user/userProfile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const result = await response.text();
            setProfile(result);
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            <p>{profile}</p>
        </div>
    );
}
