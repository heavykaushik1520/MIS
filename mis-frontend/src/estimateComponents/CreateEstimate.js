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
  const [groupId, setGroupId] = useState("");

  // Dropdown data
  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const [brands, setBrands] = useState([]);
  const [zones, setZones] = useState([]);

  const fetchEntities = async (url, setter, label) => {
    const token = localStorage.getItem("token");
    console.log("Token used in request:", token);
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
    fetchEntities("http://localhost:8080/api/chains", setChains, "Chains");
    // fetchEntities("http://localhost:8080/api/groups", setGroups, "Groups"); // Changed API endpoint for groups
    fetchEntities(
      "http://localhost:8080/api/groups",
      (data) => setGroups(data.data || []),
      "Groups"
    );

    fetchEntities("http://localhost:8080/api/brands", setBrands, "Brands");
    fetchEntities("http://localhost:8080/api/zones", setZones, "Zones");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // const payload = {
    //   chainId: parseInt(chainId),
    //   groupName,
    //   brandName,
    //   zoneName,
    //   service,
    //   quantity: parseInt(quantity),
    //   costPerUnit: parseFloat(costPerUnit),
    //   totalCost: parseInt(quantity) * parseFloat(costPerUnit),
    //   deliveryDate,
    //   deliveryDetails,
    // };
    const payload = {
      chainId: parseInt(chainId),
      groupId: parseInt(groupId), // 👈 use groupId instead of groupName
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
      setGroupId("");
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
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">-- Select Group --</option>
            {groups.map(
              (group) =>
                group.isActive && (
                  <option key={group.groupId} value={group.groupId}>
                    {group.groupName}
                  </option>
                )
            )}
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

        <Link
          to="/"
          className="block mt-4 text-center text-blue-600 hover:underline"
        >
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default CreateEstimate;
