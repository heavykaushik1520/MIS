import React, { useEffect, useState } from "react";

function ChainList() {
  const [chains, setChains] = useState([]);

  useEffect(() => {
    const fetchChains = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/chains/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.json();
      setChains(data);
    };
    fetchChains();
  }, []);
  return (
    <div className="p-6 bg-base-200 shadow-xl rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">All Chains</h2>

      {chains.map((chain) => (
        <div key={chain.chainId} className="p-2 border-b border-gray-300">
          <p>
            <strong>{chain.companyName}</strong> - GSTN: {chain.gstnNo}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChainList;
