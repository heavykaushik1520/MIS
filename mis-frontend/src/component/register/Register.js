import React from "react";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    role: "ADMIN",
  });

  const handleChange = (e) => {
    console.log(`Updating ${e.target.name} = ${e.target.value}`); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      alert("Failed to register");
      console.error(err);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="passwordHash"
          placeholder="Password"
          onChange={handleChange}
        ></input>
        {/* <select name='role' onChange={handleChange}></select> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
