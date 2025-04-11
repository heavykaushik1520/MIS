import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateBrand() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");
  const [isActive, setIsActive] = useState(false); // Ensure boolean state
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch existing brand details on component mount
  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/brands/${brandId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setBrandName(data?.data?.brandName || ""); // Ensure it's always a string
          setIsActive(data?.data?.isActive ?? false); // Ensure it's always a boolean
        } else {
          setMessage(data.message || "Failed to fetch brand details.");
        }
      } catch (error) {
        console.error("Error fetching brand:", error);
        setMessage("An error occurred while fetching brand details.");
      }
    };

    fetchBrandDetails();
  }, [brandId, token]);

  // Update brand details
  const updateBrand = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:8080/api/brands/admin/update/${brandId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ brandName, isActive }),
      });

      if (!response.ok) {
        throw new Error("Failed to update brand.");
      }

      setMessage("Brand updated successfully!");
      setTimeout(() => navigate("/brands"), 1000);
    } catch (error) {
      console.error("Error updating brand:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white shadow-xl rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Update Brand</h2>

      {/* Brand Name Input */}
      <input
        type="text"
        placeholder="Enter New Brand Name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:ring focus:ring-blue-500"
      />

      {/* Status Toggle */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="status"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="status" className="text-white">
          Brand is {isActive ? "Active" : "Inactive"}
        </label>
      </div>

      {/* Save Button */}
      <button
        onClick={updateBrand}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Save Changes
      </button>

      {message && <p className="text-green-400 text-center mt-4">{message}</p>}
    </div>
  );
}
