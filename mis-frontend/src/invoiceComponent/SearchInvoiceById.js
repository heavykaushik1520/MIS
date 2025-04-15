import React, { useState } from "react";

const SearchInvoiceById = () => {
  const [invoiceId, setInvoiceId] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInvoice = async (e) => {
    e.preventDefault();
    setError("");
    setInvoice(null);
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8080/api/invoices/${invoiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Invoice not found");

      const data = await response.json();
      setInvoice(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8080/api/invoices/pdf/${invoice.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${invoice.invoiceNo}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to download PDF");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-900 to-black text-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-secondary">📄 Search Invoice by ID</h2>

      <form onSubmit={fetchInvoice} className="flex gap-4 justify-center mb-6">
        <input
          type="number"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
          placeholder="Enter Invoice ID"
          required
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {loading && <p className="text-center text-accent">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {invoice && (
        <div className="bg-base-200 p-6 rounded-lg shadow-md border border-accent animate-fade-in space-y-4">
          <h3 className="text-2xl font-semibold text-accent">🧾 Invoice #{invoice.invoiceNo}</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p>🛠️ <strong>Service:</strong> {invoice.serviceDetails}</p>
              <p>📦 <strong>Quantity:</strong> {invoice.qty}</p>
              <p>💸 <strong>Cost/Qty:</strong> ₹{invoice.costPerQty}</p>
              <p className="text-success"><strong>Total:</strong> ₹{invoice.amountPayable}</p>
              <p className="text-warning"><strong>Balance:</strong> ₹{invoice.balance}</p>
            </div>
            <div>
              <p>🔗 <strong>Chain ID:</strong> {invoice.chainId}</p>
              <p>🚚 <strong>Delivery:</strong> {invoice.deliveryDetails}</p>
              <p>📧 <strong>Email:</strong> {invoice.emailId}</p>
              <p>💳 <strong>Payment:</strong> {new Date(invoice.dateOfPayment).toLocaleDateString()}</p>
              <p>🗓️ <strong>Service:</strong> {new Date(invoice.dateOfService).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={downloadPdf}>⬇️ Download PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInvoiceById;
