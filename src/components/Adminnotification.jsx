import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  notificationviewallAPI,
  notificationmarkasreadAPI,
} from "../Services/customerServices";

const AdminNotificationView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationviewallAPI,
  });

  // Mutation to mark as read & delete notification
  const markAsReadMutation = useMutation({
    mutationFn:notificationmarkasreadAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const handleMarkAsRead = (notificationId) => {
    markAsReadMutation.mutate({id:notificationId});
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar Header */}
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl font-semibold">CraveNow Admin Panel</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-red-600 px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              📊 Panel
            </button>
            <button
              onClick={() => navigate("/admin/menureg")}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              🍽️ Menu
            </button>
            <button
              onClick={() => navigate("/employee/employeereg")}
              className="bg-green-600 px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              🧑‍💼 Employee
            </button>
            <button
              onClick={() => navigate("/admin/paymentview")}
              className="bg-yellow-600 px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              💳 Payment
            </button>
            {/* <button
              onClick={() => navigate("/admin/restadd")}
              className="bg-purple-600 px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              🏢 Restaurant
            </button> */}
            <button
              onClick={() => navigate("/admin/notifications")}
              className="bg-white-600 px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              🔔 
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8 mt-10 border rounded-xl shadow-xl bg-white">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
            <span role="img" aria-label="notification">🔔</span> Notifications
          </h2>
          <span className="text-gray-600 text-lg">Stay updated with important alerts</span>
        </div>

        {isLoading ? (
          <p className="text-gray-500 text-center italic text-lg">Loading notifications...</p>
        ) : isError ? (
          <p className="text-red-500 text-center italic text-lg">Failed to load notifications.</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 text-center italic text-lg">No notifications available.</p>
        ) : (
          <ul className="space-y-6">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`p-6 border rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                  notification.isRead ? "bg-gray-100" : "bg-gray-50"
                }`}
              >
                <div className="text-gray-800">
                  <p className="text-lg font-semibold">
                    Recipient:{" "}
                    <span className="text-blue-600">
                      {notification.recipient || "Admin"}
                    </span>
                  </p>
                  <p className="text-md mt-2 text-gray-700">{notification.message}</p>

                  {/* If unread, show "Mark as Read" button */}
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      disabled={markAsReadMutation.isLoading}
                    >
                      ✅ Mark as Read
                    </button>
                  )}

                  {/* Optional: show status */}
                  {notification.isRead && (
                    <p className="mt-3 text-green-600 font-medium">✔️ Read</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminNotificationView;
