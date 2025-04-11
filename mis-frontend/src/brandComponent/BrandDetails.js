// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function BrandDetails() {
//   const { brandId } = useParams();
//   const navigate = useNavigate();
//   const [brandDetails, setBrandDetails] = useState(null);
//   const [message, setMessage] = useState("");
//   const token = localStorage.getItem("token");

//   const fetchBrandById = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/brands/${brandId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setBrandDetails(data.data);
//       } else {
//         setMessage(data.message || "Brand not found.");
//         setBrandDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching brand:", error);
//       setMessage("An error occurred while fetching the brand.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 text-white shadow-xl rounded-lg w-full max-w-md mx-auto">
//       <h2 className="text-2xl font-bold text-primary mb-4">Brand Details</h2>

//       <button
//         onClick={fetchBrandById}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mb-4"
//       >
//         Fetch Brand
//       </button>

//       {message && <p className="text-red-500 text-center mt-4">{message}</p>}

//       {brandDetails && (
//         <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-2">Brand Information</h3>
//           <p>
//             <span className="font-bold">ID:</span> {brandDetails.brand_id}
//           </p>
//           <p>
//             <span className="font-bold">Brand Name:</span>{" "}
//             {brandDetails.brand_name}
//           </p>

//           <button
//             onClick={() => navigate(`/brands/update/${brandDetails.brand_id}`)}
//             className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
//           >
//             Update Brand
//           </button>
          
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function BrandDetails() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [brandDetails, setBrandDetails] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

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

  return (
    <div className="p-6 bg-gray-900 text-white shadow-xl rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-4">Brand Details</h2>

      <button
        onClick={fetchBrandById}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mb-4"
      >
        Fetch Brand
      </button>

      {message && <p className="text-red-500 text-center mt-4">{message}</p>}

      {brandDetails && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Brand Information</h3>
          <p>
            <span className="font-bold">ID:</span> {brandDetails.brandId}
          </p>
          <p>
            <span className="font-bold">Brand Name:</span> {brandDetails.brandName}
          </p>
          <p>
            <span className="font-bold">Active:</span> {brandDetails.isActive ? "Yes" : "No"}
          </p>

          <button
            onClick={() => navigate(`/brands/update/${brandDetails.brandId}`)}
            className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Update Brand
          </button>
        </div>
      )}
    </div>
  );
}

