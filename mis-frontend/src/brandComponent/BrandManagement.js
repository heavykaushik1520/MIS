import React, { useState, useEffect } from "react";

function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [brandDetails, setBrandDetails] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [chainId, setChainId] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // Ensure authentication

  // ✅ Fetch All Brands
  const fetchAllBrands = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/brands/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setBrands(data.data);
      } else {
        setMessage(data.message || "Failed to fetch brands.");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      setMessage("An error occurred while fetching brands.");
    }
  };

  // ✅ Fetch Brand by ID
  const fetchBrandById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/brands/${brandId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setBrandDetails(data.data);
      } else {
        setMessage(data.message || "Brand not found.");
        setBrandDetails(null);
      }
    } catch (error) {
      console.error("Error fetching brand:", error);
      setMessage("An error occurred while fetching the brand.");
    }
  };

  

  // ✅ Update Brand
  const updateBrand = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/brands/admin/update/${brandId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ brandName, chainId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Brand updated successfully!");
        fetchAllBrands();
      } else {
        setMessage(data.message || "Failed to update brand.");
      }
    } catch (error) {
      console.error("Error updating brand:", error);
      setMessage("An error occurred while updating the brand.");
    }
  };

  // ✅ Soft Delete Brand
  const deleteBrand = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/brands/admin/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Brand deleted successfully!");
        fetchAllBrands();
      } else {
        setMessage(data.message || "Failed to delete brand.");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      setMessage("An error occurred while deleting the brand.");
    }
  };

  // Fetch brands on load
  useEffect(() => {
    fetchAllBrands();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white shadow-xl rounded-lg w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Brand Management</h2>

      {/* 📌 Input for Brand ID */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Brand ID"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
        />
        <button onClick={fetchBrandById} className="btn btn-secondary w-full mt-2">
          Get Brand Details
        </button>
      </div>

      {/* 📌 Display Brand Details */}
      {brandDetails && (
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md mt-4">
          <h3 className="text-lg font-semibold text-yellow-400">Brand Info</h3>
          <p><strong>Name:</strong> {brandDetails.brandName}</p>
          <p><strong>Active:</strong> {brandDetails.active ? "Yes" : "No"}</p>
          {brandDetails.chain && (
            <>
              <h3 className="text-lg font-semibold text-green-400 mt-3">Chain Info</h3>
              <p><strong>Company:</strong> {brandDetails.chain.companyName}</p>
              <p><strong>GSTN:</strong> {brandDetails.chain.gstnNo}</p>
            </>
          )}
        </div>
      )}

      {/* 📌 Add/Update Brand */}
      {/* <div className="mt-4">
        <input
          type="text"
          placeholder="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
        />
        <input
          type="text"
          placeholder="Chain ID"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
          className="input input-bordered w-full bg-gray-800 text-white border-gray-600 mt-2"
        />
        
        <button onClick={updateBrand} className="btn btn-warning w-full mt-2">
          Update Brand
        </button>
      </div> */}

      {/* 📌 List All Brands */}
      <h3 className="text-lg font-semibold text-blue-400 mt-4">All Brands</h3>
      <ul className="list-disc pl-5">
        {brands.map((b) => (
          <li key={b.brandId} className="flex justify-between bg-gray-800 p-2 mt-2 rounded-md">
            <span>{b.brandName} (ID: {b.brandId})</span>
            <button
              onClick={() => deleteBrand(b.brandId)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* 📌 Display Messages */}
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}

export default BrandManagement;
