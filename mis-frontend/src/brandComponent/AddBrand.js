import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AddBrand() {
  const { id } = useParams(); // Get chainId from URL
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddBrand = async () => {
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8080/api/brands/admin/add/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ brandName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add brand. Please try again.");
      }

      setSuccess("Brand added successfully!");
      setTimeout(() => navigate(`/chains/${id}`), 1000); // Redirect back after success
    } catch (error) {
      console.error("Error adding brand:", error);
      setError(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white shadow-xl rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Add Brand to Chain {id}</h2>

      <input
        type="text"
        placeholder="Enter Brand Name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:ring focus:ring-blue-500"
      />

      <button
        onClick={handleAddBrand}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Save Brand
      </button>

      {success && <p className="text-green-400 text-center mt-4">{success}</p>}
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      <button
        onClick={() => navigate(`/chains/${id}`)}
        className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Cancel
      </button>
    </div>
  );
}
