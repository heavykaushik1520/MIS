import React, { useState } from "react";

function ChainDetails() {
  const [chainId, setChainId] = useState("");
  const [chain, setChain] = useState(null);

  const fetchChainById = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/chains/${chainId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setChain(data);
    } catch (error) {
      console.error("Error fetching chain details:", error);
      alert("Failed to fetch chain details.");
    }
  };

  return (
    <div className="p-6 bg-base-200 shadow-xl rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Chain Details</h2>

      <input
        type="text"
        placeholder="Chain ID"
        value={chainId}
        onChange={(e) => setChainId(e.target.value)}
        className="input input-bordered w-full mb-2"
      />

      <button onClick={fetchChainById} className="btn btn-primary w-full">
        Get Chain
      </button>

      {chain && (
        <div className="p-4 bg-white rounded-lg shadow-md mt-4">
          <p>Company Name: {chain.companyName}</p>
          <p>GSTN Number: {chain.gstnNo}</p>
        </div>
      )}
    </div>
  );
}

export default ChainDetails;
