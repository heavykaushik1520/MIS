import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

export default function GroupUpdate() {
    const { groupId } = useParams();
    const [group, setGroup] = useState({ groupName: '', isActive: true });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (groupId) {
            fetchGroupData();
        } else {
            setGroup({ groupName: '', isActive: true });
        }
    }, [groupId]);

    const fetchGroupData = async () => {
        setIsFetching(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/groups/${groupId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data && data.data) {
                    setGroup(data.data);
                } else {
                    setError('Group not found.');
                    setGroup({ groupName: '', isActive: true });
                }
            } else {
                setError('Failed to fetch group data.');
                setGroup({ groupName: '', isActive: true });
            }
        } catch (err) {
            setError('Error fetching group data.');
            setGroup({ groupName: '', isActive: true });
        } finally {
            setIsFetching(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGroup({
            ...group,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const updateGroup = async () => {
        const token = localStorage.getItem('token');
        setMessage('');
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/api/groups/admin/update/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(group),
            });

            if (response.ok) {
                setMessage('✅ Group updated successfully!');
            } else {
                const errorData = await response.json();
                setError(errorData.message || '❌ Failed to update group. Please check the Group ID or try again.');
            }
        } catch (err) {
            console.error('Error updating group:', err);
            setError('❌ Error updating group. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            className="p-8 bg-base-200 shadow-2xl rounded-2xl w-full max-w-md mx-auto"
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <h2 className="text-3xl font-semibold mb-6 text-primary text-center">Update Group (Admin Only)</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter Group ID"
                    value={groupId}
                    disabled={true}
                    className="input input-bordered input-primary w-full"
                />
                {isFetching && <span className="loading loading-spinner loading-sm mt-2"></span>}
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    name="groupName"
                    placeholder="Updated Group Name"
                    value={group.groupName}
                    onChange={handleInputChange}
                    className="input input-bordered input-primary w-full"
                />
            </div>

            <div className="flex gap-4 items-center mb-4">
                <label className="label cursor-pointer">
                    <span className="label-text">Active</span>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={group.isActive}
                        onChange={handleInputChange}
                        className="checkbox checkbox-primary ml-2"
                    />
                </label>
            </div>

            <button
                onClick={updateGroup}
                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
            >
                Update Group
            </button>

            {message && (
                <div className={`mt-4 p-4 rounded-lg bg-green-200 text-green-800`}>
                    {message}
                </div>
            )}

            {error && (
                <div className={`mt-4 p-4 rounded-lg bg-red-200 text-red-800`}>
                    {error}
                </div>
            )}
        </motion.div>
    );
}