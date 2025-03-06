import React, {  useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http:///localhost:8080/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const result = await response.json();
      setMessage(result.setMessage);
    } catch (error) {
      setMessage("Something went wrong. Please try again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Forgot Password
        </h2>
        <p className="text-center text-gray-500">
          Enter your email to receive a temporary password
        </p>

        {message && (
          <p className="text-center mt-3 text-sm text-green-600">{message}</p>
        )}

        <form className="mt-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mt-2"
            required
          />
          <button type="submit" className="btn btn-primary w-full mt-4">
            Send Temporary Password
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
