import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/waiterback.webp";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletereservationsAPI, getallreservationAPI, reservationeditAPI } from "../Services/employeeServices";

const WaiterDuty = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch reservations using useQuery
  const { data: reservations, isLoading, isError, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: getallreservationAPI,
  });

  // Mutation to update the reservation status
  const updateStatusMutation = useMutation({
    mutationFn: reservationeditAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
    },
  });

  // Mutation to delete a reservation
  const deleteReservationMutation = useMutation({
    mutationFn: deletereservationsAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
    },
  });

  // Update reservation status
  const updateStatus = (id, newStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  // Delete a reservation
  const deleteReservation = (id) => {
    deleteReservationMutation.mutate(id);
  };

  if (isLoading) return <div>Loading reservations...</div>;
  if (isError) return <div>Error loading reservations: {error.message}</div>;

  return (
    <div
      className="min-h-screen flex flex-col text-gray-900"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "45%",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <nav className="bg-gray-900 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CraveNow Waiter</h1>
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
            {/* <button className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition">🚪 Logout</button> */}
          </div>
        </div>
      </nav>

      {/* Reservations Management */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Manage Reservations</h1>
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation._id} className="p-4 border rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">{reservation.user?.username || reservation.user?.name || "Unknown User"}</p>
                  <p>Date: {reservation.date} | Time: {reservation.time}</p>
                  <p>Guests: {reservation.guests}</p>
                  <p>
                    Status:{" "}
                    <span className={`font-semibold ${
                      reservation.status === "Confirmed"
                        ? "text-green-600"
                        : reservation.status === "Cancelled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}>
                      {reservation.status}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={reservation.status}
                    onChange={(e) => updateStatus(reservation._id, e.target.value)}
                    className="p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => deleteReservation(reservation._id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
                  >
                    🗑️ Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterDuty;
