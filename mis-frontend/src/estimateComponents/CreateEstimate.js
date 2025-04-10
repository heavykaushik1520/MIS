// import React, { useState, useEffect } from "react";

// const CreateEstimate = () => {
//   const [formData, setFormData] = useState({
//     groupId: "",
//     chainId: "",
//     brandId: "",
//     zoneId: "",
//     service: "",
//     quantity: "",
//     costPerUnit: "",
//     deliveryDate: "",
//     deliveryDetails: "",
//   });

//   const [chains, setChains] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [zones, setZones] = useState([]);

//   const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage

//   // Fetch chains, groups, brands, zones with JWT token in headers
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // Include token
//         };

//         // Fetch chains
//         const chainsResponse = await fetch(
//           "http://localhost:8080/api/chains/all",
//           { headers }
//         );
//         if (!chainsResponse.ok) {
//           console.error("Failed to fetch chains:", chainsResponse.statusText);
//           return;
//         }

//         const chainsData = await chainsResponse.json();
//         setChains(chainsData);

//         // Fetch groups
//         const groupsResponse = await fetch(
//           "http://localhost:8080/api/groups/all",
//           { headers }
//         );
//         const groupsData = await groupsResponse.json();
//         setGroups(groupsData);

//         // Fetch brands
//         const brandsResponse = await fetch(
//           "http://localhost:8080/api/brands/all",
//           { headers }
//         );
//         const brandsData = await brandsResponse.json();
//         setBrands(brandsData);

//         // Fetch zones
//         const zonesResponse = await fetch("http://localhost:8080/api/zones", {
//           headers,
//         });
//         const zonesData = await zonesResponse.json();
//         setZones(zonesData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [token]); // Fetch data whenever token changes

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       chainId: parseInt(formData.chainId),
//       groupId: parseInt(formData.groupId),
//       brandId: parseInt(formData.brandId),
//       zoneId: parseInt(formData.zoneId),
//       service: formData.service,
//       quantity: parseInt(formData.quantity),
//       costPerUnit: parseFloat(formData.costPerUnit),
//       deliveryDate: formData.deliveryDate,
//       deliveryDetails: formData.deliveryDetails,
//     };

//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`, // Include the token
//     };

//     const res = await fetch("http://localhost:8080/api/estimates", {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) {
//       alert("Estimate created successfully!");
//       setFormData({
//         groupId: "",
//         chainId: "",
//         brandId: "",
//         zoneId: "",
//         service: "",
//         quantity: "",
//         costPerUnit: "",
//         deliveryDate: "",
//         deliveryDetails: "",
//       });
//     } else {
//       alert("Failed to create estimate.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
//         Create New Estimate
//       </h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//         <div className="grid grid-cols-2 gap-4">
//           <select
//             name="groupId"
//             value={formData.groupId}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="">Select Group</option>
//             {groups.map((group) => (
//               <option key={group.id} value={group.id}>
//                 {group.groupName}
//               </option>
//             ))}
//           </select>

//           <select
//             name="chainId"
//             value={formData.chainId}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="">Select Chain</option>
//             {chains.map((chain) => (
//               <option key={chain.id} value={chain.id}>
//                 {chain.chainName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <select
//             name="brandId"
//             value={formData.brandId}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="">Select Brand</option>
//             {brands.map((brand) => (
//               <option key={brand.brandId} value={brand.brandId}>
//                 {brand.brandName}
//               </option>
//             ))}
//           </select>

//           <select
//             name="zoneId"
//             value={formData.zoneId}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           >
//             <option value="">Select Zone</option>
//             {zones.map((zone) => (
//               <option key={zone.id} value={zone.id}>
//                 {zone.zoneName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <input
//           type="text"
//           name="service"
//           value={formData.service}
//           onChange={handleChange}
//           placeholder="Service Description"
//           className="border p-2 rounded"
//           required
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             placeholder="Quantity"
//             className="border p-2 rounded"
//             required
//           />

//           <input
//             type="number"
//             name="costPerUnit"
//             step="0.01"
//             value={formData.costPerUnit}
//             onChange={handleChange}
//             placeholder="Cost Per Unit"
//             className="border p-2 rounded"
//             required
//           />
//         </div>

//         <input
//           type="date"
//           name="deliveryDate"
//           value={formData.deliveryDate}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="deliveryDetails"
//           value={formData.deliveryDetails}
//           onChange={handleChange}
//           placeholder="Delivery Details"
//           className="border p-2 rounded"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded mt-4 transition duration-300 ease-in-out"
//         >
//           Submit Estimate
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEstimate;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const CreateEstimate = () => {
//   const [chainId, setChainId] = useState("");
//   const [groupName, setGroupName] = useState("");
//   const [brandName, setBrandName] = useState("");
//   const [zoneName, setZoneName] = useState("");
//   const [service, setService] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [costPerUnit, setCostPerUnit] = useState(0);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [deliveryDetails, setDeliveryDetails] = useState("");
//   const [message, setMessage] = useState("");

//   // Dropdown data
//   const [chains, setChains] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [zones, setZones] = useState([]);

//   const fetchEntities = async (url, setter, label) => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`${label} fetch failed: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log(`${label} fetched:`, data);
//       setter(data);
//     } catch (err) {
//       console.error(`❌ Error fetching ${label}:`, err.message);
//     }
//   };

//   useEffect(() => {
//     fetchEntities("http://localhost:8080/api/chains/all", setChains, "Chains");
//     fetchEntities("http://localhost:8080/api/groups", setGroups, "Groups");
//     fetchEntities("http://localhost:8080/api/brands", setBrands, "Brands");
//     fetchEntities("http://localhost:8080/api/zones", setZones, "Zones");
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     const payload = {
//       chainId: parseInt(chainId),
//       groupName,
//       brandName,
//       zoneName,
//       service,
//       quantity: parseInt(quantity),
//       costPerUnit: parseFloat(costPerUnit),
//       totalCost: parseInt(quantity) * parseFloat(costPerUnit),
//       deliveryDate,
//       deliveryDetails,
//     };

//     try {
//       const res = await fetch("http://localhost:8080/api/estimates", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to create estimate");
//       }

//       setMessage("✅ Estimate created successfully!");
//       // reset form
//       setChainId("");
//       setGroupName("");
//       setBrandName("");
//       setZoneName("");
//       setService("");
//       setQuantity(1);
//       setCostPerUnit(0);
//       setDeliveryDate("");
//       setDeliveryDetails("");
//     } catch (err) {
//       console.error("❌ Submission error:", err.message);
//       setMessage("❌ " + err.message);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl text-black dark:text-white">
//       <h2 className="text-2xl font-bold mb-4 text-center">Create Estimate</h2>

//       {message && (
//         <div className="mb-4 text-center text-green-600 dark:text-green-400">
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* Chain */}
//         <div>
//           <label className="block mb-1 font-medium">Select Chain</label>
//           <select
//             value={chainId}
//             onChange={(e) => setChainId(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//             required
//           >
//             <option value="">-- Select Chain --</option>
//             {chains.map((chain) => (
//               <option key={chain.chainId} value={chain.chainId}>
//                 {chain.chainName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Group */}
//         <div>
//           <label className="block mb-1 font-medium">Select Group</label>
//           <select
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//             required
//           >
//             <option value="">-- Select Group --</option>
//             {groups.map((group) => (
//               <option key={group.groupId} value={group.groupName}>
//                 {group.groupName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Brand */}
//         <div>
//           <label className="block mb-1 font-medium">Select Brand</label>
//           <select
//             value={brandName}
//             onChange={(e) => setBrandName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//             required
//           >
//             <option value="">-- Select Brand --</option>
//             {brands.map((brand) => (
//               <option key={brand.brandId} value={brand.brandName}>
//                 {brand.brandName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Zone */}
//         <div>
//           <label className="block mb-1 font-medium">Select Zone</label>
//           <select
//             value={zoneName}
//             onChange={(e) => setZoneName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//             required
//           >
//             <option value="">-- Select Zone --</option>
//             {zones.map((zone) => (
//               <option key={zone.zoneId} value={zone.zoneName}>
//                 {zone.zoneName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Other inputs */}
//         <input
//           type="text"
//           placeholder="Service"
//           value={service}
//           onChange={(e) => setService(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//           required
//         />

//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//           required
//         />

//         <input
//           type="number"
//           placeholder="Cost per unit"
//           value={costPerUnit}
//           onChange={(e) => setCostPerUnit(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//           required
//         />

//         <input
//           type="date"
//           value={deliveryDate}
//           onChange={(e) => setDeliveryDate(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//           required
//         />

//         <textarea
//           placeholder="Delivery Details"
//           value={deliveryDetails}
//           onChange={(e) => setDeliveryDetails(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Create Estimate
//         </button>

//         <Link to="/" className="block mt-4 text-center text-blue-600 hover:underline">
//           Back to Home
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default CreateEstimate;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateEstimate = () => {
  const [chainId, setChainId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [zoneName, setZoneName] = useState("");
  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("");
  const [message, setMessage] = useState("");

  // Dropdown data
  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const [brands, setBrands] = useState([]);
  const [zones, setZones] = useState([]);

  const fetchEntities = async (url, setter, label) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`${label} fetch failed: ${res.status}`);
      }

      const data = await res.json();
      console.log(`${label} fetched:`, data);
      setter(data);
    } catch (err) {
      console.error(`❌ Error fetching ${label}:`, err.message);
    }
  };

  useEffect(() => {
    fetchEntities("http://localhost:8080/api/chains/all", setChains, "Chains");
    fetchEntities("http://localhost:8080/api/groups/all", setGroups, "Groups"); // Changed API endpoint for groups
    fetchEntities("http://localhost:8080/api/brands/all", setBrands, "Brands");
    fetchEntities("http://localhost:8080/api/zones/all", setZones, "Zones");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      chainId: parseInt(chainId),
      groupName,
      brandName,
      zoneName,
      service,
      quantity: parseInt(quantity),
      costPerUnit: parseFloat(costPerUnit),
      totalCost: parseInt(quantity) * parseFloat(costPerUnit),
      deliveryDate,
      deliveryDetails,
    };

    try {
      const res = await fetch("http://localhost:8080/api/estimates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create estimate");
      }

      setMessage("✅ Estimate created successfully!");
      // reset form
      setChainId("");
      setGroupName("");
      setBrandName("");
      setZoneName("");
      setService("");
      setQuantity(1);
      setCostPerUnit(0);
      setDeliveryDate("");
      setDeliveryDetails("");
    } catch (err) {
      console.error("❌ Submission error:", err.message);
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Estimate</h2>

      {message && (
        <div className="mb-4 text-center text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Chain */}
        <div>
          <label className="block mb-1 font-medium">Select Chain</label>
          <select
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">-- Select Chain --</option>
            {chains.map((chain) => (
              <option key={chain.chainId} value={chain.chainId}>
                {chain.chainName}
              </option>
            ))}
          </select>
        </div>

        {/* Group */}
        <div>
          <label className="block mb-1 font-medium">Select Group</label>
          <select
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">-- Select Group --</option>
            {groups && groups.map((group) => ( // Added conditional rendering
              <option key={group.groupId} value={group.groupName}>
                {group.groupName}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 font-medium">Select Brand</label>
          <select
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">-- Select Brand --</option>
            {brands.map((brand) => (
              <option key={brand.brandId} value={brand.brandName}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>

        {/* Zone */}
        <div>
          <label className="block mb-1 font-medium">Select Zone</label>
          <select
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">-- Select Zone --</option>
            {zones.map((zone) => (
              <option key={zone.zoneId} value={zone.zoneName}>
                {zone.zoneName}
              </option>
            ))}
          </select>
        </div>

        {/* Other inputs */}
        <input
          type="text"
          placeholder="Service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          required
        />

        <input
          type="number"
          placeholder="Cost per unit"
          value={costPerUnit}
          onChange={(e) => setCostPerUnit(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          required
        />

        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          required
        />

        <textarea
          placeholder="Delivery Details"
          value={deliveryDetails}
          onChange={(e) => setDeliveryDetails(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Estimate
        </button>

        <Link to="/" className="block mt-4 text-center text-blue-600 hover:underline">
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default CreateEstimate;


