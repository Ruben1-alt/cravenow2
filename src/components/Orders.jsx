import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Home, User, Bell, Utensils, Search, Star, X } from "lucide-react";
import backgroundImage from "../assets/images/orders.webp";
import { orderviewAPI, cancelorderAPI } from "../Services/customerServices";

const Orders = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cancelInputs, setCancelInputs] = useState({});
  const [canceledOrders, setCanceledOrders] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: orderviewAPI,
  });

  const cancelOrderMutation = useMutation({
    mutationFn: cancelorderAPI,
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries(["orders"]);
      setCanceledOrders((prev) => [...prev, orderId]);
      alert("Order cancelled successfully.");
    },
    onError: () => {
      alert("Failed to cancel order. Please try again.");
    },
  });

  const orders = data?.orders;

  const handleCancelClick = (orderId) => {
    setCancelInputs((prev) => ({
      ...prev,
      [orderId]: { visible: !prev[orderId]?.visible, reason: "" },
    }));
  };

  const handleReasonChange = (orderId, value) => {
    setCancelInputs((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], reason: value },
    }));
  };

  const handleCancelSubmit = (orderId) => {
    const reason = cancelInputs[orderId]?.reason;
    if (!reason.trim()) return alert("Please enter a reason for cancellation.");
    cancelOrderMutation.mutate({ orderId, reason });
    setCancelInputs((prev) => ({
      ...prev,
      [orderId]: { visible: false, reason: "" },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-900 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/customer/chome"><Home className="w-6 h-6" /></Link></li>
              <li><Link to="/employee/profileview"><User className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/notifications"><Bell className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/search"><Search className="w-6 h-6" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="max-w-4xl w-full p-8 border rounded-xl shadow-xl bg-white bg-opacity-90">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-4xl font-extrabold text-gray-900">📦 Order</h2>
            <span className="text-gray-600 text-lg">Track and manage customer orders</span>
          </div>

          {isLoading ? (
            <p className="text-center text-gray-600">Loading orders...</p>
          ) : isError || !orders?.length ? (
            <p className="text-center text-gray-600">No orders available.</p>
          ) : (
            <ul className="space-y-6">
              {orders.map((order) => (
                <li key={order._id} className="p-6 border rounded-lg shadow-md bg-gray-50">
                  <div className="grid grid-cols-2 gap-6 text-gray-800">
                    <p><strong>User:</strong> {order.user?.username}</p>
                    <p><strong>Delivery ID:</strong> {order.delivery}</p>
                    <p><strong>OTP:</strong> {order.otp}</p>
                    <p><strong>Status:</strong> <span className={`font-semibold ${order.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>{order.status}</span></p>
                    <p><strong>Payment Status:</strong> <span className={`font-semibold ${order.paymentStatus === 'Pending' ? 'text-red-600' : 'text-green-600'}`}>{order.paymentStatus}</span></p>
                    <p><strong>Total Amount:</strong> <span className="text-blue-600 font-semibold">${order.totalAmount.toFixed(2)}</span></p>
                    <p><strong>Estimated Time:</strong> {order.estimatedPreparationTime} min</p>
                    <p><strong>Payment Method:</strong> {order.paymentDetails}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Contact:</strong> {order.contact}</p>
                  </div>

                  <h3 className="text-lg font-semibold mt-4 text-gray-900">Items Ordered:</h3>
                  <ul className="pl-5 space-y-2 text-gray-700">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{item.menuItem.name} <span className="text-gray-500">(x{item.quantity})</span></span>
                        <button
                          onClick={() =>
                            navigate(`/customer/review/${item.menuItem._id}`, {
                              state: { menuItemId: item.menuItem._id },
                            })
                          }
                          className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded flex items-center transition"
                        >
                          <Star className="w-4 h-4 mr-1" /> Review
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Cancel Order Section */}
                  {order.status !== "Delivered" && (
                    <div className="mt-6">
                      <button
                        onClick={() => handleCancelClick(order._id)}
                        className={`${
                          order.status === "Out for Delivery" || canceledOrders.includes(order._id)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        } text-white px-4 py-2 rounded-lg transition`}
                        disabled={order.status === "Out for Delivery" || canceledOrders.includes(order._id)}
                      >
                        {order.status === "Out for Delivery" ? "Cancellation Not Allowed" : "Cancel Order"}
                      </button>

                      {cancelInputs[order._id]?.visible && (
                        <div className="mt-4 bg-white p-4 rounded-md border border-gray-300 shadow-md animate-fade-in">
                          <label className="block mb-2 text-gray-700 font-medium">Reason for cancellation:</label>
                          <textarea
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            rows="3"
                            placeholder="Enter reason..."
                            value={cancelInputs[order._id]?.reason}
                            onChange={(e) => handleReasonChange(order._id, e.target.value)}
                          ></textarea>
                          <div className="mt-3 flex space-x-3">
                            <button
                              onClick={() => handleCancelSubmit(order._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                              disabled={cancelOrderMutation.isLoading}
                            >
                              {cancelOrderMutation.isLoading ? "Submitting..." : "Submit Cancellation"}
                            </button>
                            <button
                              onClick={() => handleCancelClick(order._id)}
                              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition flex items-center"
                            >
                              <X className="w-4 h-4 mr-1" /> Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
