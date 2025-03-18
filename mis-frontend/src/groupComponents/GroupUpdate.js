// import React, { useState, useEffect } from 'react';


// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function GroupUpdate() {
//     const { groupId } = useParams();
//     const navigate = useNavigate();

//     const [group, setGroup] = useState({ groupName: '', isActive: true });
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (groupId) {
//             fetchGroupData();
//         }
//     }, [groupId]);

//     const fetchGroupData = async () => {
//         setIsLoading(true);
//         setError('');
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:8080/api/groups/${groupId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 if (data && data.data) {
//                     setGroup(data.data);
//                 } else {
//                     setError('Group not found.');
//                 }
//             } else {
//                 setError('Failed to fetch group data.');
//             }
//         } catch (err) {
//             setError('Error fetching group data.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setGroup({
//             ...group,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:8080/api/groups/admin/update/${groupId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(group),
//             });
//             if (response.ok) {
//                 navigate('/groups'); // Navigate to group list after success
//             } else {
//                 const errorData = await response.json();
//                 setError(errorData.message || 'Failed to update group.');
//             }
//         } catch (err) {
//             setError('Error updating group.');
//             console.error(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const variants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//     };

//     return (
//         <motion.div
//             className="update-member-container"
//             initial="hidden"
//             animate="visible"
//             variants={variants}
//         >
//             <h2>Update Group</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Group Name</label>
//                     <input
//                         type="text"
//                         name="groupName"
//                         value={group.groupName}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Active</label>
//                     <label className="checkbox-label">
//                         <input
//                             type="checkbox"
//                             name="isActive"
//                             checked={group.isActive}
//                             onChange={handleInputChange}
//                         />
//                         <span>{group.isActive ? 'Active' : 'Inactive'}</span>
//                     </label>
//                 </div>

//                 <button type="submit" className="btn btn-primary" disabled={isLoading}>
//                     {isLoading ? 'Updating...' : 'Update Group'}
//                 </button>

//                 {error && <div className="error-message">{error}</div>}
//             </form>
//         </motion.div>
//     );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const GroupList = () => {
    const [groups, setGroups] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchGroups = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:8080/api/groups/all', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setGroups(data.data || []);
            } catch (err) {
                console.error('Error fetching groups:', err);
                setError(err.message || 'Failed to fetch groups.');
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const tableVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error m-4">
                <span>{error}</span>
            </div>
        );
    }

    return (
        <motion.div
            className="p-8 bg-base-200 shadow-2xl rounded-2xl w-full max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={tableVariants}
        >
            <h2 className="text-3xl font-semibold mb-6 text-primary text-center">Group List</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group) => (
                            <motion.tr
                                key={group.groupId}
                                whileHover={{ backgroundColor: '#f0f0f0' }}
                                transition={{ duration: 0.2 }}
                            >
                                <td>{group.groupId}</td>
                                <td>{group.groupName}</td>
                                <td>
                                    <span className={`badge ${group.isActive ? 'badge-success' : 'badge-error'}`}>
                                        {group.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    {group.createdAt ? format(new Date(group.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}
                                </td>
                                <td>
                                    {group.updatedAt ? format(new Date(group.updatedAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}
                                </td>
                                <td>
                                    <Link
                                        to={`/groups/admin/update/${group.groupId}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Update
                                    </Link>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default GroupList;

