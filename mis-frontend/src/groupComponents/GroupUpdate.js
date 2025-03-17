import React, { useState, useEffect } from 'react';


import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function GroupUpdate() {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState({ groupName: '', isActive: true });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (groupId) {
            fetchGroupData();
        }
    }, [groupId]);

    const fetchGroupData = async () => {
        setIsLoading(true);
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
                }
            } else {
                setError('Failed to fetch group data.');
            }
        } catch (err) {
            setError('Error fetching group data.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGroup({
            ...group,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/groups/admin/update/${groupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(group),
            });
            if (response.ok) {
                navigate('/groups'); // Navigate to group list after success
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to update group.');
            }
        } catch (err) {
            setError('Error updating group.');
            console.error(err);
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
            className="update-member-container"
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <h2>Update Group</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Group Name</label>
                    <input
                        type="text"
                        name="groupName"
                        value={group.groupName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Active</label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={group.isActive}
                            onChange={handleInputChange}
                        />
                        <span>{group.isActive ? 'Active' : 'Inactive'}</span>
                    </label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Group'}
                </button>

                {error && <div className="error-message">{error}</div>}
            </form>
        </motion.div>
    );
}