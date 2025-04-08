// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const AllZones = () => {
//   const [zones, setZones] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const handleDelete = (zoneId) => {
//     const token = localStorage.getItem("token");

//     if (!window.confirm("Are you sure you want to delete this zone?")) return;

//     fetch(`http://localhost:8080/api/zones/${zoneId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to delete zone");
//         }
//         // Remove the deleted zone from the list without refetching
//         setZones((prevZones) => prevZones.filter((z) => z.zoneId !== zoneId));
//       })
//       .catch((err) => {
//         alert("Error deleting zone: " + err.message);
//       });
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     fetch("http://localhost:8080/api/zones", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch zones");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setZones(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl dark:bg-gray-900 dark:text-white">
//       <h2 className="text-2xl font-bold mb-6 text-center">All Zones</h2>

//       {loading ? (
//         <p className="text-center">Loading zones...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">Error: {error}</p>
//       ) : zones.length === 0 ? (
//         <p className="text-center">No zones found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-gray-300 dark:border-gray-700">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Zone Name</th>
//                 <th className="p-3 text-left">Brand</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Created At</th>
//                 <th className="p-3 text-left">Updated At</th>
//                 <th className="p-3 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {zones.map((zone) => (
//                 <tr
//                   key={zone.id}
//                   className="border-t border-gray-200 dark:border-gray-700"
//                 >
//                   <td className="p-3">{zone.zoneId || zone.id}</td>

//                   <td className="p-3">{zone.zoneName}</td>
//                   <p> {zone.brandId || "N/A"}</p>

//                   <td className="p-3">
//                     {zone.active || zone.isActive ? (
//                       <span className="text-green-600 font-semibold">
//                         Active
//                       </span>
//                     ) : (
//                       <span className="text-red-500 font-semibold">
//                         Inactive
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-3">
//                     {zone.createdAt
//                       ? new Date(zone.createdAt).toLocaleString()
//                       : "N/A"}
//                   </td>
//                   <td className="p-3">
//                     {zone.updatedAt
//                       ? new Date(zone.updatedAt).toLocaleString()
//                       : "N/A"}
//                   </td>
//                   {/* <td>
//                     <Link
//                       to={`/zones/update/${zone.zoneId}`}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
//                     >
//                       Update
//                     </Link>
//                   </td> */}

//                   <td className="p-3 flex gap-2">
//                     <Link
//                       to={`/zones/update/${zone.zoneId}`}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
//                     >
//                       Update
//                     </Link>

//                     <button
//                       onClick={() => handleDelete(zone.zoneId)}
//                       className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <br></br>
//           <Link to="/" className="btn btn-ghost text-xl">
//             Home
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllZones;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllZones = () => {
  const [zones, setZones] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchZones = (brandId = "") => {
    setLoading(true);
    setError("");

    const url = brandId
      ? `http://localhost:8080/api/zones/brand/${brandId}`
      : "http://localhost:8080/api/zones";

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch zones");
        return res.json();
      })
      .then((data) => {
        setZones(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchBrands = () => {
    fetch("http://localhost:8080/api/brands", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Failed to fetch brands:", err));
  };

  useEffect(() => {
    fetchBrands();
    fetchZones();
  }, []);

  const handleBrandChange = (e) => {
    const brandId = e.target.value;
    setSelectedBrandId(brandId);
    fetchZones(brandId);
  };

  const handleDelete = (zoneId) => {
    if (!window.confirm("Are you sure you want to delete this zone?")) return;

    fetch(`http://localhost:8080/api/zones/${zoneId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete zone");
        // Update local state
        setZones((prev) => prev.filter((z) => z.zoneId !== zoneId));
      })
      .catch((err) => {
        alert("Error deleting zone: " + err.message);
      });
  };

  // Helper to get brand name by ID
  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b.brandId === brandId);
    return brand ? brand.brandName : "N/A";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">All Zones</h2>

      {/* Brand Filter */}
      <div className="mb-6 flex justify-center items-center gap-4">
        <label htmlFor="brandFilter" className="font-semibold">
          Filter by Brand:
        </label>
        <select
          id="brandFilter"
          value={selectedBrandId}
          onChange={handleBrandChange}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800"
        >
          <option value="">-- All Brands --</option>
          {brands.map((brand) => (
            <option key={brand.brandId} value={brand.brandId}>
              {brand.brandName}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading zones...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : zones.length === 0 ? (
        <p className="text-center">No zones found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Zone Name</th>
                <th className="p-3 text-left">Brand Id</th>
                <th className="p-3 text-left">Brand Name</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Updated At</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr
                  key={zone.zoneId}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-3">{zone.zoneId}</td>
                  <td className="p-3">{zone.zoneName}</td>
                  <td className="p-3">{zone.brandId || "N/A"}</td>
                  <td className="p-3">{getBrandName(zone.brandId)}</td>
                  <td className="p-3">
                    {zone.active || zone.isActive ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="p-3">
                    {zone.createdAt
                      ? new Date(zone.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    {zone.updatedAt
                      ? new Date(zone.updatedAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link
                      to={`/zones/update/${zone.zoneId}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(zone.zoneId)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <Link to="/" className="btn btn-ghost text-xl">
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllZones;

