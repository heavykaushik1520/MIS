import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEstimate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:8080/api/estimates/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Estimate not found");
        return res.json();
      })
      .then((data) => {
        setEstimate(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstimate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:8080/api/estimates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(estimate),
      });

      if (!response.ok) throw new Error("Update failed");

      navigate("/estimate/all");
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-accent">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-gray-900 to-black text-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-secondary">✏️ Update Estimate #{id}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Service</label>
            <input
              name="service"
              value={estimate.service || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={estimate.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Cost Per Unit</label>
            <input
              type="number"
              step="0.01"
              name="costPerUnit"
              value={estimate.costPerUnit}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Total Cost</label>
            <input
              type="number"
              step="0.01"
              name="totalCost"
              value={estimate.totalCost}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              value={estimate.deliveryDate?.split("T")[0]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1">Delivery Details</label>
            <textarea
              name="deliveryDetails"
              value={estimate.deliveryDetails}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={updating}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-bold"
          >
            {updating ? "Updating..." : "Update Estimate"}
          </button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateEstimate;
