import React, { useState } from 'react';

const CreateInvoice = () => {
  const [estimatedId, setEstimatedId] = useState('');
  const [balance, setBalance] = useState('');
  const [dateOfPayment, setDateOfPayment] = useState('');
  const [emailId, setEmailId] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      estimatedId: parseInt(estimatedId),
      balance: parseFloat(balance),
      dateOfPayment: dateOfPayment,
      emailId: emailId
    };

    try {
      const response = await fetch('http://localhost:8080/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(invoiceData)
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }

      const data = await response.json();
      console.log("Invoice Created:", data);
      alert("✅ Invoice created successfully!");
      
      // Reset form
      setEstimatedId('');
      setBalance('');
      setDateOfPayment('');
      setEmailId('');

    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Error while creating invoice.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-base-200 shadow-xl rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Estimate ID</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={estimatedId}
            onChange={(e) => setEstimatedId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Balance</span>
          </label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Date of Payment</span>
          </label>
          <input
            type="datetime-local"
            className="input input-bordered w-full"
            value={dateOfPayment}
            onChange={(e) => setDateOfPayment(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Customer Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-full mt-4" type="submit">
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
