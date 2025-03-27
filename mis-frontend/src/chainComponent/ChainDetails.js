import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChainDetails() {
  const [chainId, setChainId] = useState("");
  const [chain, setChain] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchChainById = async () => {
    const token = localStorage.getItem("token");
    setError(""); // Clear previous errors
    setChain(null); // Reset previous data
    try {
      const response = await fetch(
        `http://localhost:8080/api/chains/${chainId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Chain not found or invalid ID");
      }

      const data = await response.json();
      setChain(data);
    } catch (error) {
      console.error("Error fetching chain details:", error);
      setError("Failed to fetch chain details. Please check the ID.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white shadow-xl rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Chain Details</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Chain ID"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:ring focus:ring-blue-500"
        />
      </div>

      <button
        onClick={fetchChainById}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Get Chain
      </button>

      {error && (
        <p className="text-red-500 text-center mt-4 bg-gray-800 p-2 rounded-md">
          {error}
        </p>
      )}

      {chain && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Company Details</h3>
          <p>
            <span className="font-bold">ID:</span> {chain.chainId}
          </p>
          <p>
            <span className="font-bold">Company Name:</span> {chain.companyName}
          </p>
          <p>
            <span className="font-bold">GSTN Number:</span> {chain.gstnNo}
          </p>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Main Page
        </button>
      </div>
    </div>
  );
}

export default ChainDetails;
