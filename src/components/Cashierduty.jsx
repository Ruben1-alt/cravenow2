import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { paymentviewallAPI } from "../Services/adminServices";
import backgroundImage from "../assets/images/cashierduty.webp";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CashierDuty = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: paymentviewallAPI,
  });

  const monthlyTotals = payments?.reduce((acc, payment) => {
    const month = new Date(payment.createdAt).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + payment.amount;
    return acc;
  }, {}) || {};

  const chartData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Payments ($)",
        data: Object.values(monthlyTotals),
        backgroundColor: "rgba(72, 187, 120, 0.6)",
        borderRadius: 6,
      },
    ],
  };

  const totalPages = Math.ceil((payments?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments?.slice(startIndex, startIndex + itemsPerPage) || [];

  return (
    <div
      className="min-h-screen flex flex-col text-gray-900"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "50%",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      <nav className="bg-gray-900 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CraveNow Cashier</h1>
          <div className="flex space-x-4">
            <button onClick={() => navigate("/employee/employeehome")} className="bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition">🏠 Home</button>
            <button onClick={() => navigate("/employee/empprofileview")} className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition">🧑‍ Profile</button>
            <button onClick={() => navigate("/employee/attendancemark")} className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition">⏰ Attendance</button>
            <button
            onClick={() => navigate("/employee/notifications")}
            className="bg-white-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
          >
            🔔
          </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">💳 Customer Payment Records</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bar Chart */}
          <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📊 Monthly Payment Overview</h3>
            <Bar data={chartData} />
          </div>

          {/* Payment List with Pagination */}
          <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            {isLoading ? (
              <p className="text-gray-600 text-center">Loading payment records...</p>
            ) : payments?.length === 0 ? (
              <p className="text-gray-600 text-center">No payment data found.</p>
            ) : (
              <>
                <table className="w-full border border-gray-300 rounded-lg shadow-sm mb-4">
                  <thead>
                    <tr className="bg-gray-200 text-gray-800">
                      <th className="border border-gray-300 p-3 text-left">Customer</th>
                      <th className="border border-gray-300 p-3 text-left">Amount</th>
                      <th className="border border-gray-300 p-3 text-left">Status</th>
                      <th className="border border-gray-300 p-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPayments.map((txn) => (
                      <tr key={txn._id} className="border border-gray-300 text-gray-700">
                        <td className="p-3">{txn.user?.username}</td>
                        <td className="p-3 font-bold">${txn.amount.toFixed(2)}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-lg text-white ${txn.status === "Completed" ? "bg-green-500" : txn.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="p-3">{new Date(txn.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center mt-2">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ◀ Previous
                  </button>
                  <span className="text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next ▶
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDuty;
