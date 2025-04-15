import React, { useState } from "react";

const SearchEstimateById = () => {
  const [estimateId, setEstimateId] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEstimate = async (e) => {
    e.preventDefault();
    setError("");
    setEstimate(null);
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8080/api/estimates/${estimateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 

      if (!response.ok) throw new Error("Estimate not found");

      const data = await response.json();
      setEstimate(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-900 to-black text-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-secondary">🔍 Search Estimate by ID</h2>

      <form onSubmit={fetchEstimate} className="flex gap-4 justify-center mb-6">
        <input
          type="number"
          value={estimateId}
          onChange={(e) => setEstimateId(e.target.value)}
          placeholder="Enter Estimate ID"
          required
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading && <p className="text-center text-accent">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {estimate && (
        <div className="bg-base-200 p-6 rounded-lg shadow-md border border-accent animate-fade-in space-y-4">
          <h3 className="text-2xl font-semibold text-accent">🧾 Estimate #{estimate.estimatedId}</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-lg mb-1 text-secondary">Chain Details:</h4>
              <p>🔗 <strong>Company:</strong> {estimate.chain.companyName}</p>
              <p>🧾 <strong>GSTN:</strong> {estimate.chain.gstnNo}</p>
              <p><strong>Status:</strong> {estimate.chain.active ? "✅ Active" : "❌ Inactive"}</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-1 text-secondary">Group & Brand:</h4>
              <p>👥 <strong>Group:</strong> {estimate.group.groupName}</p>
              <p>🏷️ <strong>Brand:</strong> {estimate.brand.brandName}</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-1 text-secondary">Zone Info:</h4>
              <p>📍 <strong>Zone:</strong> {estimate.zone.zoneName}</p>
              <p>🏷️ <strong>Zone Brand:</strong> {estimate.zone.brand.brandName}</p>
              <p><strong>Status:</strong> {estimate.zone.active ? "✅ Active" : "❌ Inactive"}</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-1 text-secondary">Estimate Details:</h4>
              <p>🛠️ <strong>Service:</strong> {estimate.service}</p>
              <p>📦 <strong>Quantity:</strong> {estimate.quantity}</p>
              <p>💸 <strong>Cost/Unit:</strong> ₹{estimate.costPerUnit}</p>
              <p className="text-success"><strong>Total:</strong> ₹{estimate.totalCost}</p>
              <p>🚚 <strong>Delivery Date:</strong> {estimate.deliveryDate.split("T")[0]}</p>
              <p>📍 <strong>Details:</strong> {estimate.deliveryDetails}</p>
            </div>
          </div>

          <div className="text-sm text-gray-400 mt-4">
            <p><strong>Created At:</strong> {new Date(estimate.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(estimate.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchEstimateById;
