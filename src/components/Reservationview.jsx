import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Home, User, Bell, Utensils, Search, XCircle, CheckCircle } from "lucide-react";
import backgroundImage from "../assets/images/aboutrest.webp";
import { reservationviewAPI } from "../Services/customerServices";
import { deletereservationsAPI } from "../Services/employeeServices";

const ReservationView = () => {
  const queryClient = useQueryClient();
  const [toast, setToast] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reservations"],
    queryFn: reservationviewAPI,
  });

  const cancelMutation = useMutation({
    mutationFn: deletereservationsAPI,
    onSuccess: () => {
      setToast({ type: "success", message: "Reservation cancelled successfully." });
      queryClient.invalidateQueries(["reservations"]);
    },
    onError: () => {
      setToast({ type: "error", message: "Failed to cancel reservation." });
    },
  });

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      cancelMutation.mutate(id);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg- bg-opacity-60 z-0"></div>

      <header className="relative z-10 bg-indigo-900 bg-opacity-90 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/customer/chome"><Home className="w-6 h-6 hover:text-yellow-400" /></Link></li>
              <li><Link to="/employee/profileview"><User className="w-6 h-6 hover:text-yellow-400" /></Link></li>
              <li><Link to="/customer/notifications"><Bell className="w-6 h-6 hover:text-yellow-400" /></Link></li>
              <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6 hover:text-yellow-400" /></Link></li>
              <li><Link to="/customer/search"><Search className="w-6 h-6 hover:text-yellow-400" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center py-16 px-4">
        <div className="bg-white bg-opacity-95 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-3xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Reservations</h2>

          {toast && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
                toast.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span>{toast.message}</span>
              <button className="ml-auto text-sm" onClick={() => setToast(null)}>✖</button>
            </div>
          )}

          {isLoading ? (
            <p className="text-center text-gray-600">Loading reservations...</p>
          ) : isError ? (
            <p className="text-center text-red-500">Failed to load reservations.</p>
          ) : data?.length === 0 ? (
            <p className="text-center text-gray-500">No reservations found.</p>
          ) : (
            <ul className="space-y-6">
              {data?.map((reservation) => (
                <li
                  key={reservation._id}
                  className="p-6 rounded-lg shadow-md bg-gray-50 border border-gray-200"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                    <p><strong>Date:</strong> {reservation.date}</p>
                    <p><strong>Time:</strong> {reservation.time}</p>
                    <p><strong>Guests:</strong> {reservation.guests}</p>
                    <p><strong>Special Request:</strong> {reservation.specialRequest || "None"}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                          reservation.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : reservation.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleCancel(reservation._id)}
                    disabled={cancelMutation.isLoading}
                    className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
                  >
                    {cancelMutation.isLoading ? "Cancelling..." : "Cancel Reservation"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReservationView;
