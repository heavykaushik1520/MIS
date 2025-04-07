import React, { useState } from "react";

const SearchZoneById = () => {
  const [zoneId, setZoneId] = useState("");
  const [zone, setZone] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setZone(null);

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/zones/${zoneId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Zone not found or server error");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Zone Data:", data);
        setZone(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Search</h2>
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="number"
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
          placeholder="Enter Zone ID"
          className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {zone && (
        <div className="border border-gray-300 rounded-lg p-4 dark:border-gray-700">
          <p><strong>ID:</strong> {zone.zoneId || zone.id}</p>
          <p><strong>Name:</strong> {zone.zoneName}</p>
          <p><strong>Brand ID:</strong> {zone.brandId || "N/A"}</p>

          <p><strong>Status:</strong> {zone.active || zone.isActive ? "Active" : "Inactive"}</p>
          <p><strong>Created At:</strong> {zone.createdAt ? new Date(zone.createdAt).toLocaleString() : "N/A"}</p>
          <p><strong>Updated At:</strong> {zone.updatedAt ? new Date(zone.updatedAt).toLocaleString() : "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default SearchZoneById;
