import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteBrand() {
  const { brandId } = useParams(); // Get brand ID from URL
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/brands/admin/delete/${brandId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Brand deleted successfully!");
        navigate("/brands"); // Redirect to brands list
      } else {
        setMessage(data.message || "Failed to delete brand.");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      setMessage("An error occurred while deleting the brand.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white shadow-xl rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Delete Brand</h2>

      <p className="text-center text-red-400 mb-4">
        Are you sure you want to delete this brand?
      </p>

      {message && <p className="text-red-500">{message}</p>}

      <div className="flex justify-between">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/brands/${brandId}`)}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteBrand;
