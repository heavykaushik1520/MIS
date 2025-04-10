// import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import { motion } from 'framer-motion';

// const GroupList = () => {
//     const [groups, setGroups] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         const fetchGroups = async () => {
//             setLoading(true);
//             setError(null);

//             try {
//                 const response = await fetch('http://localhost:8080/api/groups/all', {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (data && data.data && Array.isArray(data.data)) {
//                     setGroups(data.data);
//                 } else {
//                     setGroups([]);
//                 }
//             } catch (err) {
//                 console.error('Error fetching groups:', err);
//                 setError(err.message || 'Failed to fetch groups.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchGroups();
//     }, []);

//     const tableVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <span className="loading loading-spinner loading-lg text-primary"></span>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="alert alert-error m-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                 <span>{error}</span>
//             </div>
//         );
//     }

//     return (
//         <motion.div
//             className="p-8 bg-base-200 shadow-2xl rounded-2xl w-full max-w-4xl mx-auto"
//             initial="hidden"
//             animate="visible"
//             variants={tableVariants}
//         >
//             <h2 className="text-3xl font-semibold mb-6 text-primary text-center">Group List</h2>
//             {groups.length === 0 ? (
//                 <div className="alert alert-warning">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.876c.414 0 .78-.26.948-.62l-6.939-10c-.516-.755-1.977-.755-2.493 0l-6.938 10c-.168.36-.534.62-.948.62z" /></svg>
//                     <span>No groups available.</span>
//                 </div>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="table table-zebra w-full">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Status</th>
//                                 <th>Created At</th>
//                                 <th>Updated At</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {groups.map((group) => (
//                                 <motion.tr
//                                     key={group.groupId}
//                                     whileHover={{ backgroundColor: '#f0f0f0' }}
//                                     transition={{ duration: 0.2 }}
//                                 >
//                                     <td>{group.groupId}</td>
//                                     <td>{group.groupName}</td>
//                                     <td>
//                                         <span className={`badge ${group.isActive ? 'badge-success' : 'badge-error'}`}>
//                                             {group.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                     </td>
//                                     <td>
//                                         {group.createdAt ? format(new Date(group.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}
//                                     </td>
//                                     <td>
//                                         {group.updatedAt ? format(new Date(group.updatedAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}
//                                     </td>
//                                 </motion.tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </motion.div>
//     );
// };

// export default GroupList;

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
                const response = await fetch('http://localhost:8080/api/groups', {
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

