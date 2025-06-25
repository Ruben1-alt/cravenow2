import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import backgroundImage from "../assets/images/paymentv.webp";
import { paymentviewallAPI } from "../Services/adminServices";

const PaymentView = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: paymentviewallAPI,
  });

  const totalPages = Math.ceil(payments.length / paymentsPerPage);
  const startIndex = (currentPage - 1) * paymentsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + paymentsPerPage);

  return (
    <div
      className="bg-gray-100 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className="bg-gray-900 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">CraveNow Admin</h1>
          <div className="flex space-x-4">
            <button onClick={() => navigate('/admin/dashboard')} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition">📊 Panel</button>
            <button onClick={() => navigate('/admin/menureg')} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition">🍽️ Menu</button>
            <button onClick={() => navigate('/employee/employeereg')} className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition">🧑‍💼 Employee</button>
            <button onClick={() => navigate('/admin/paymentview')} className="bg-yellow-600 px-4 py-2 rounded-md hover:bg-yellow-700 transition">💳 Payment</button>
            <button onClick={() => navigate("/admin/notifications")} className="bg-white px-4 py-2 rounded-md text-black hover:bg-gray-200 transition">🔔</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 mt-6 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">💳 Customer Payment Status</h2>

        {isLoading ? (
          <p className="text-gray-500 text-center">Loading payments...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">Failed to load payment data.</p>
        ) : payments.length === 0 ? (
          <p className="text-gray-500 text-center">No payments recorded.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 border border-gray-300 shadow-md rounded-md">
                <thead className="text-xs text-gray-800 uppercase bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 border">Customer</th>
                    <th className="px-6 py-3 border">Currency</th>
                    <th className="px-6 py-3 border">Amount</th>
                    <th className="px-6 py-3 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPayments.map((payment) => (
                    <tr key={payment._id} className="bg-white hover:bg-gray-100 transition">
                      <td className="px-6 py-4 border">{payment.user?.username || "N/A"}</td>
                      <td className="px-6 py-4 border">{payment.currency}</td>
                      <td className="px-6 py-4 border font-semibold">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 border">
                        <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold 
                          ${payment.status === "Completed" ? "bg-green-500" :
                            payment.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md font-medium ${currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                ⬅️ Previous
              </button>

              <span className="text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md font-medium ${currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                Next ➡️
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentView;
