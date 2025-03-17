import React, { useState } from 'react';



export default function GroupCreate() {
    const [group, setGroup] = useState({ groupName: '', isActive: true });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGroup({ ...group, [name]: value });
    };

    const createGroup = async () => {
        const token = localStorage.getItem('token');
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/groups/admin/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(group)
            });

            if (response.ok) {
                setMessage('✅ Group created successfully!');
                setGroup({ groupName: '', isActive: true });
            } else {
                setMessage('❌ Failed to create group. Please try again.');
            }
        } catch (error) {
            console.error('Error creating group:', error);
            setMessage('❌ Error creating group. Check console for details.');
        }
    };

    return (
        <div className="p-6 bg-base-200 shadow-xl rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-primary">Create Group (Admin Only)</h2>

            <div className="mb-4">
                <input
                    type="text"
                    name="groupName"
                    placeholder="Group Name"
                    value={group.groupName}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="flex gap-4 items-center mb-4">
                <label className="label cursor-pointer">
                    <span className="label-text">Active</span>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={group.isActive}
                        onChange={() => setGroup({ ...group, isActive: !group.isActive })}
                        className="checkbox checkbox-primary ml-2"
                    />
                </label>
            </div>

            <button
                onClick={createGroup}
                className="btn btn-primary w-full"
            >
                Create Group
            </button>

            {message && (
                <div
                    className={`mt-4 p-2 rounded-lg ${
                        message.includes('✅') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}
