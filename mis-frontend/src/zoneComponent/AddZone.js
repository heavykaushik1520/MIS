import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddZone = () => {
  const [zoneName, setZoneName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch list of brands on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first.");
      return;
    }

    fetch("http://localhost:8080/api/brands", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Failed to fetch brands", err));
  }, []);

  // Auto-hide message after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle zone submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication token missing. Please login.");
      return;
    }

    const payload = {
      zoneName,
      brandId: parseInt(brandId),
      isActive,
    };

    setLoading(true);
    fetch("http://localhost:8080/api/zones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add zone");
        }
        return res.json();
      })
      .then(() => {
        setMessage("✅ Zone added successfully!");
        setZoneName("");
        setBrandId("");
        setIsActive(true);
      })
      .catch((err) => {
        setMessage("❌ " + err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-xl dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Zone</h2>

      {message && (
        <div className="mb-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Zone Name</label>
          <input
            type="text"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Brand</label>
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">-- Select a Brand --</option>
            {brands.map((brand) => (
              <option key={brand.brandId} value={brand.brandId}>
                {brand.brandName}
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
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Zone"}
        </button>
        <Link to="/" className="btn btn-ghost text-xl">
          Home
        </Link>
      </form>
    </div>
  );
};

export default AddZone;
