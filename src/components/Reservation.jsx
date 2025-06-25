import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, Bell, Utensils, Search } from "lucide-react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import backgroundImage from "../assets/images/reserveback.webp";
import { reserveregAPI } from "../Services/customerServices";

const ReservationBooking = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: reserveregAPI,
    onSuccess: () => {
      alert("✅ Reservation Booked Successfully!");
      navigate("/customer/chome");
      formik.resetForm();
    },
    onError: (error) => {
      alert("❌ Failed to book reservation.");
      console.error("Reservation Error:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      guests: "",
      specialRequest: "",
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
        status: "Pending",
      };
      mutation.mutate(payload);
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg- bg-opacity-50 z-0"></div>

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

      <main className="relative z-10 flex items-center justify-center py-20 px-4">
        <div className="bg-white bg-opacity-95 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Reserve a Table</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Number of Guests</label>
              <input
                type="number"
                name="guests"
                value={formik.values.guests}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Special Requests</label>
              <textarea
                name="specialRequest"
                value={formik.values.specialRequest}
                onChange={formik.handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Optional"
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isLoading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
                mutation.isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {mutation.isLoading ? "Booking..." : "Book Reservation"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ReservationBooking;
