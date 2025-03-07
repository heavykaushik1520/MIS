import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    role: "ADMIN",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate("/login");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
        <p className="text-center text-gray-500">Create an account</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="passwordHash"
              placeholder="Enter your password"
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">Role</label>
            <select
              name="role"
              onChange={handleChange}
              className="select select-bordered w-full mt-1"
            >
              <option value="ADMIN">Admin</option>
              <option value="SALES_PERSON">Sales Person</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
