import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EstimateList = () => {
  const [estimates, setEstimates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // or sessionStorage.getItem if you used that

    fetch("http://localhost:8080/api/estimates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEstimates(data);
        console.log("Estimates fetched:", data);
      })
      .catch((err) => {
        console.error("Error fetching estimates:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 animate-pulse text-accent">
        📦 Estimate Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {estimates.map((estimate) => (
          <div
            key={estimate.estimatedId}
            className="card bg-base-200 shadow-xl border border-accent hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <div className="card-body">
              <h2 className="card-title text-secondary">
                🏢 {estimate.chain.companyName}
              </h2>
              <p>
                <span className="font-bold">Group:</span>{" "}
                {estimate.group.groupName}
              </p>
              <p>
                <span className="font-bold">Brand:</span>{" "}
                {estimate.brand.brandName}
              </p>
              <p>
                <span className="font-bold">Zone:</span>{" "}
                {estimate.zone.zoneName}
              </p>
              <p>
                <span className="font-bold">Service:</span> {estimate.service}
              </p>
              <p>
                <span className="font-bold">Quantity:</span> {estimate.quantity}
              </p>
              <p>
                <span className="font-bold">Cost/Unit:</span> ₹
                {estimate.costPerUnit}
              </p>
              <p>
                <span className="font-bold">Total Cost:</span>{" "}
                <span className="text-success font-semibold">
                  ₹{estimate.totalCost}
                </span>
              </p>
              <p>
                <span className="font-bold">Delivery:</span>{" "}
                {estimate.deliveryDate.split("T")[0]}
              </p>
              <p>
                <span className="font-bold">Details:</span>{" "}
                {estimate.deliveryDetails}
              </p>
              <Link
                to={`/estimate/update/${estimate.estimatedId}`}
                className="px-3 py-1 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white shadow-md transition-all duration-300 ease-in-out"
              >
                ✏️ Edit
              </Link>

              <div className="mt-4">
                <button className="btn btn-outline btn-accent w-full">
                  🔍 View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {estimates.length === 0 && (
        <div className="text-center mt-10 text-error text-xl font-semibold animate-bounce">
          No Estimates Found 💔
        </div>
      )}
    </div>
  );
};

export default EstimateList;
