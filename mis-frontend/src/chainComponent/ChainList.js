import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChainList() {
  const [chains, setChains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChains = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/chains", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setChains(data);
    };
    fetchChains();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white shadow-xl rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-primary text-center mb-4">All Chains</h2>

      {chains.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Company Name</th>
                <th className="px-4 py-2">GSTN</th>
              </tr>
            </thead>
            <tbody>
              {chains.map((chain) => (
                <tr key={chain.chainId} className="border-b border-gray-700">
                  <td className="px-4 py-2 text-center">{chain.chainId}</td>
                  <td className="px-4 py-2 text-center">{chain.companyName}</td>
                  <td className="px-4 py-2 text-center">{chain.gstnNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400">No chains available.</p>
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

export default ChainList;
