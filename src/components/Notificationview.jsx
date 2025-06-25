import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User, Bell, Utensils, Search, Home } from "lucide-react";
import {
  notificationviewallAPI,
  notificationmarkasreadAPI,
} from "../Services/customerServices";

const NotificationView = () => {
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
    <div>
      <header className="bg-indigo-800 bg-opacity-90 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link to="/customer/chome" className="hover:underline">
                  <Home className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/employee/profileview" className="hover:underline">
                  <User className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/customer/notifications" className="hover:underline">
                  <Bell className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/customer/restaurantview" className="hover:underline">
                  <Utensils className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/customer/search" className="hover:underline">
                  <Search className="w-6 h-6" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

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
                  {/* <p className="text-lg font-semibold">
                    Recipient:{" "}
                    <span className="text-blue-600">
                      {notification.recipient || "Admin"}
                    </span>
                  </p> */}
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

export default NotificationView;
