import React, { useState, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import { isAdmin } from "../Navbar";

function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [brandDetails, setBrandDetails] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [chainId, setChainId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch(
        `http://localhost:8080/api/brands/${brandId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      const response = await fetch(
        `http://localhost:8080/api/brands/admin/update/${brandId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ brandName, chainId }),
        }
      );

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
      const response = await fetch(
        `http://localhost:8080/api/brands/admin/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    <>
    {/* navbar */}
    <div className="navbar bg-primary text-primary-content px-4">
        <Link to="/" className="btn btn-ghost text-xl">
          Home
        </Link>

        {/* Group Operations Dropdown */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-outline btn-warning m-1">
            Group Operations
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/groups">View All Groups</Link>
            </li>
            <li>
              <Link to="/groups/admin/create">Create Group</Link>
            </li>
            <li>
              <Link to="/groups/admin/update/:groupId">Update Group</Link>
            </li>
            <li>
              <Link to="/groups/details">Group Details</Link>
            </li>
          </ul>
        </div>

        {/* Chain Operations Dropdown */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-outline btn-warning m-1">
            Chain Operations
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/chains">View All Chains</Link>
            </li>
            <li>
              <Link to="/chains/admin/create">Create Chain</Link>
            </li>
            <li>
              <Link to="/chains/admin/update/:chainId">Update Chain</Link>
            </li>
            <li>
              <Link to="/chains/details">Chain Details</Link>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-outline btn-warning m-1">
            Brand Operations
          </label>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/brands">Manage Brands</Link>
            </li>
            
            
          </ul>
        </div>

        <Link to="/login" className="btn btn-outline btn-success">
          Login
        </Link>
        <Link to="/logout" className="btn btn-soft">
          Logout
        </Link>
        <Link to="/user-profile" className="btn btn-outline btn-info">
          User Profile
        </Link>

        {isAdmin() && (
          <Link to="/admin-profile" className="btn btn-ghost">
            Admin Profile
          </Link>
        )}
      </div>

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
        <button
          onClick={fetchBrandById}
          className="btn btn-secondary w-full mt-2"
        >
          Get Brand Details
        </button>
      </div>

      {/* 📌 Display Brand Details */}
      {brandDetails && (
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md mt-4">
          <h3 className="text-lg font-semibold text-yellow-400">Brand Info</h3>
          <p>
            <strong>Name:</strong> {brandDetails.brandName}
          </p>
          <p>
            <strong>Active:</strong> {brandDetails.isActive ? "Yes" : "No"}
          </p>
          {brandDetails.chain && (
            <>
              <h3 className="text-lg font-semibold text-green-400 mt-3">
                Chain Info
              </h3>
              <p>
                <strong>Company:</strong> {brandDetails.chain.companyName}
              </p>
              <p>
                <strong>GSTN:</strong> {brandDetails.chain.gstnNo}
              </p>
            </>
          )}
          <button
            onClick={() => navigate(`/brands/update/${brandDetails.brandId}`)}
            className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Update Brand
          </button>
          <button
            onClick={() => navigate(`/brands/delete/${brandDetails.brandId}`)}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
          >
            Delete Brand
          </button>
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

      <h3 className="text-lg font-semibold text-blue-400 mt-4">All Brands</h3>
      <ul className="list-disc pl-5">
        {brands.map((b) => (
          <li
            key={b.brandId}
            className="bg-gray-800 p-4 mt-2 rounded-md shadow-md"
          >
            <h3 className="text-lg font-semibold text-yellow-400">
              Brand Info
            </h3>
            <p>
              <strong>Name:</strong> {b.brandName}
            </p>
            <p>
              <strong>Active:</strong> {b.isActive ? "Yes" : "No"}
            </p>

            {b.chain && (
              <>
                <h3 className="text-lg font-semibold text-green-400 mt-3">
                  Chain Info
                </h3>
                <p>
                  <strong>Company:</strong> {b.chain.companyName}
                </p>
                <p>
                  <strong>GSTN:</strong> {b.chain.gstnNo}
                </p>
              </>
            )}

            {/* Update & Delete Buttons */}
            <div className="flex mt-3">
              <button
                onClick={() => navigate(`/brands/update/${b.brandId}`)}
                className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={() => deleteBrand(b.brandId)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 📌 Display Messages */}
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
    </>
  );
}

export default BrandManagement;
