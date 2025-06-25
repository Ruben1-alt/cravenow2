import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import adminOrderBg from "../assets/images/adminorder.webp";
import { orderviewallAPI } from "../Services/adminServices";

const AdminOrderView = () => {
  const navigate = useNavigate();

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: orderviewallAPI,
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-6"
      style={{ backgroundImage: `url(${adminOrderBg})` }}
    >
      <div className="max-w-7xl mx-auto bg-white bg-opacity-90 p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            📋 Admin Order Management
          </h2>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          >
            ⬅ Back to Panel
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-600 text-lg">Loading orders...</p>
        ) : isError ? (
          <p className="text-center text-red-600 text-lg">
            Failed to fetch orders. Please try again.
          </p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No orders available.</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-blue-100 text-gray-800 text-sm uppercase tracking-wide">
                  <th className="px-5 py-3 text-left whitespace-nowrap">Customer</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap">Delivery ID</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap">OTP</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap w-48">Items</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap">Total</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap">Payment Method</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap w-48">Address</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap">Contact</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap">Status</th>
                  <th className="px-5 py-3 text-left whitespace-nowrap">Payment</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm divide-y divide-gray-200 bg-white">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4 align-top font-medium">{order.user.username}</td>
                    <td className="px-5 py-4 align-top">{order.delivery}</td>
                    <td className="px-5 py-4 align-top">{order.otp}</td>
                    <td className="px-5 py-4 align-top">
                      <ul className="space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.menuItem?.name} <span className="text-gray-500">(x{item.quantity})</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-4 align-top font-semibold text-blue-600">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 align-top">{order.paymentDetails}</td>
                    <td className="px-5 py-4 align-top">{order.address}</td>
                    <td className="px-5 py-4 align-top">{order.contact}</td>
                    <td className="px-5 py-4 align-top">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${
                          order.status === "Pending" ? "bg-yellow-500" : "bg-green-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold ${
                          order.paymentStatus === "Pending" ? "bg-red-500" : "bg-green-600"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderView;
