import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion"; // For animations

const GroupDetails = () => {
  const [groupId, setGroupId] = useState("");
  const [group, setGroup] = useState(null); // Initialize as null for better handling
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (group) {
      console.log("Group State Updated:", group);
    }
  }, [group]);

  const fetchGroupById = async () => {
    setIsLoading(true);
    setError("");
    setGroup(null); // Reset group data on new fetch

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication required. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/groups/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data) {
        setGroup(data.data);
      } else {
        setError("Group not found.");
      }
    } catch (err) {
      console.error("Error fetching group:", err);
      setError(err.message || "Failed to fetch group details.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const detailsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="p-8 bg-base-200 shadow-2xl rounded-2xl w-full max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={detailsVariants}
    >
      <h2 className="text-3xl font-semibold mb-6 text-primary text-center">
        Group Details
      </h2>

      <motion.div
        className="flex items-center gap-4 mb-8"
        variants={inputVariants}
      >
        <input
          type="text"
          placeholder="Enter Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="input input-bordered input-primary w-full"
        />
        <button
          onClick={fetchGroupById}
          className="btn btn-primary btn-lg rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </motion.div>

      {isLoading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {group && (
        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg border border-base-300"
          initial="hidden"
          animate="visible"
          variants={detailsVariants}
        >
          <p className="text-xl font-semibold mb-2">
            Name: <span className="text-primary">{group.groupName}</span>
          </p>
          <p className="mb-2">
            Status:
            <span
              className={`badge ${
                group.isActive ? "badge-success" : "badge-error"
              } ml-2`}
            >
              {group.isActive ? "Active" : "Inactive"}
            </span>
          </p>
          <p className="mb-2">
            Created At:{" "}
            {group.createdAt
              ? format(new Date(group.createdAt), "yyyy-MM-dd HH:mm:ss")
              : "N/A"}
          </p>
          <p>
            Updated At:{" "}
            {group.updatedAt
              ? format(new Date(group.updatedAt), "yyyy-MM-dd HH:mm:ss")
              : "N/A"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GroupDetails;