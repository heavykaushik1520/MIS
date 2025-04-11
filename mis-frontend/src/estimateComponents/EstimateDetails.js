import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EstimateDetails = () => {
  const { id } = useParams();
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:8080/api/estimates/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch estimate details");
        }

        const data = await response.json();
        setEstimate(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load estimate details");
      }
    };

    fetchEstimate();
  }, [id]);

  if (error) {
    return (
      <div className="text-center text-error text-xl mt-10 animate-pulse">
        ❌ {error}
      </div>
    );
  }

  if (!estimate) {
    return (
      <div className="text-center text-accent mt-10 animate-bounce">
        Loading Estimate Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-200 shadow-2xl border border-accent animate-fade-in">
          <div className="card-body">
            <h2 className="card-title text-secondary text-3xl mb-4">
              🧾 Estimate #{estimate.estimatedId}
            </h2>

            <div className="grid gap-4">
              <p><span className="font-bold text-accent">Chain:</span> {estimate.chain.companyName}</p>
              <p><span className="font-bold text-accent">Group:</span> {estimate.group.groupName}</p>
              <p><span className="font-bold text-accent">Brand:</span> {estimate.brand.brandName}</p>
              <p><span className="font-bold text-accent">Zone:</span> {estimate.zone.zoneName}</p>
              <p><span className="font-bold text-accent">Service:</span> {estimate.service}</p>
              <p><span className="font-bold text-accent">Quantity:</span> {estimate.quantity}</p>
              <p><span className="font-bold text-accent">Cost/Unit:</span> ₹{estimate.costPerUnit}</p>
              <p className="text-success">
                <span className="font-bold text-accent">Total Cost:</span> ₹{estimate.totalCost}
              </p>
              <p><span className="font-bold text-accent">Delivery Date:</span> {estimate.deliveryDate.split("T")[0]}</p>
              <p><span className="font-bold text-accent">Delivery Details:</span> {estimate.deliveryDetails}</p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline btn-primary w-full"
              >
                🔙 Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateDetails;
