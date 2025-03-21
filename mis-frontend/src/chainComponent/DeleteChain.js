import React, { useState } from 'react';

export default function DeleteChain() {
    const [chainId, setChainId] = useState('');

    const deleteChain = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8080/api/chains/admin/delete/${chainId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const result = await response.json();
            alert(result.message || 'Chain deleted successfully!');
        } catch (error) {
            console.error('Error deleting chain:', error);
            alert('Failed to delete chain.');
        }
    };

    return (
        <div className="p-6 bg-base-200 shadow-xl rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-4">Delete Chain (Admin Only)</h2>

            <input
                type="text"
                placeholder="Chain ID"
                value={chainId}
                onChange={(e) => setChainId(e.target.value)}
                className="input input-bordered w-full mb-2"
            />

            <button onClick={deleteChain} className="btn btn-error w-full">
                Delete Chain
            </button>
        </div>
    );
}
