import React, { useEffect, useState } from "react";

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      const fetchInvoices = async () => {
        try {
          const res = await fetch("http://localhost:8080/api/invoices", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const data = await res.json();
          setInvoices(data);
        } catch (err) {
          alert("Failed to fetch invoices");
        } finally {
          setLoading(false);
        }
      };
  
      fetchInvoices();
    }, [token]);
  
    const downloadPdf = async (id, invoiceNo) => {
      try {
        const res = await fetch(`http://localhost:8080/api/invoices/pdf/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${invoiceNo}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch {
        alert("Failed to download PDF");
      }
    };
  
    return (
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-900 to-black text-white rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-secondary">📑 All Invoices</h2>
  
        {loading ? (
          <p className="text-center text-accent">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-sm md:text-base">
              <thead className="bg-base-300 text-secondary text-md">
                <tr>
                  <th>Invoice No</th>
                  <th>Service</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Balance</th>
                  <th>Date</th>
                  <th>Email</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>{inv.invoiceNo}</td>
                    <td>{inv.serviceDetails}</td>
                    <td>{inv.qty}</td>
                    <td>₹{inv.amountPayable}</td>
                    <td className="text-warning">₹{inv.balance}</td>
                    <td>{new Date(inv.dateOfPayment).toLocaleDateString()}</td>
                    <td>{inv.emailId}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline btn-success"
                        onClick={() => downloadPdf(inv.id, inv.invoiceNo)}
                      >
                        ⬇️ PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
};

export default InvoiceList;
