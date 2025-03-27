import React, { useState } from "react";

function UpdateChain() {
  // eslint-disable-next-line no-unused-vars
  const [chainId, setChainId] = useState("");
  const [chain, setChain] = useState({
    companyName: "",
    gstnNo: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChain({ ...chain, [name]: value });
  };

  const updateChain = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/chains/admin/update/${chainId}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(chain),
        }
      );
      const result = await response.json();
      alert(result.message || "chain updated successfully");
    } catch (error) {
      console.error("Error updating chain:", error);
      alert("Failed to update chain.");
    }
  };

  return (
    <div className="p-6 bg-base-200 shadow-xl rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Update Chain (Admin Only)
      </h2>

      

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={chain.companyName}
        onChange={handleChange}
        className="input input-bordered w-full mb-2"
      />

      <input
        type="text"
        name="gstnNo"
        placeholder="GSTN Number"
        value={chain.gstnNo}
        onChange={handleChange}
        className="input input-bordered w-full mb-2"
      />

      <button onClick={updateChain} className="btn btn-warning w-full">
        Update Chain
      </button>
    </div>
  );
}

export default UpdateChain;
