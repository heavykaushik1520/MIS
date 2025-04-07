import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateZone = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [zoneName, setZoneName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all brands
    fetch("http://localhost:8080/api/brands", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBrands(data));

    // Fetch zone by ID
    fetch(`http://localhost:8080/api/zones/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setZoneName(data.zoneName);
        setBrandId(data.brandId || data.brand?.brandId); // fallback if backend sends nested brand
        setIsActive(data.active ?? true);
      });
  }, [id, token]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      zoneName,
      brandId: parseInt(brandId),
      isActive,
    };

    fetch(`http://localhost:8080/api/zones/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(() => {
        setMessage("Zone updated successfully!");
        setTimeout(() => navigate("/zone/all"), 1000); // redirect after update
      })
      .catch((err) => setMessage("Error: " + err.message));
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-xl dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Zone</h2>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Zone Name</label>
          <input
            type="text"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Select Brand</label>
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
            required
          >
            <option value="">-- Select Brand --</option>
            {brands.map((b) => (
              <option key={b.brandId} value={b.brandId}>
                {b.brandName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            id="isActive"
            className="w-4 h-4"
          />
          <label htmlFor="isActive" className="text-sm">
            Active
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Update Zone
        </button>
      </form>
    </div>
  );
};

export default UpdateZone;
