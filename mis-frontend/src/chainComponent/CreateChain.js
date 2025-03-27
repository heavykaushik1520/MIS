import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateChain() {
  const [chain, setChain] = useState({
    companyName: "",
    gstnNo: "",
    isActive: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChain({ ...chain, [name]: value });
  };

  const createChain = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/api/chains/admin/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(chain),
        }
      );
      const result = await response.json();
      alert(result.message || "Chain created successfully!");
    } catch (error) {
      console.error("Error creating chain:", error);
      alert("Failed to create chain.");
    }
  };

  return (
    <>
      <div className="p-6 bg-base-200 shadow-xl rounded-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Create Chain (Admin Only)
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

            <button onClick={createChain} className="btn btn-primary w-full">
                Create Chain
            </button>

            <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Main Page
        </button>
      </div>
      </div>
    </>
  );
}
