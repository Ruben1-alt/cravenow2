import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/restreg.webp";

const RestaurantManagement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "CraveNow",
    location: "New York",
    cuisine: "Italian",
    contact: "9447834662",
    openingHours: "",
    deliveryAvailable: false,
    ratings: "",
    description: "",
  });
  // // Logout function
  // const handleLogout = () => {
  //   // Remove token from storage
  //   sessionStorage.removeItem("token");

  //   // Show logout message
  //   if (window.confirm("Are you sure you want to logout?")) 

  //   // Navigate to login page
  //   navigate("/login");
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Restaurant:", formData);
    alert("Restaurant Registered Successfully!");
  };

  return (
    <div
      className="bg-gray-100 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Admin Header */}
      <nav className="bg-gray-900 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">CraveNow Admin</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
            >
              📊 Panel
            </button>
            <button
              onClick={() => navigate("/admin/menureg")}
              className="bg-blue-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
            >
              🍽️Menu
            </button>
            <button
              onClick={() => navigate("/employee/employeereg")}
              className="bg-green-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
            >
              🧑‍💼Employee
            </button>
            <button
              onClick={() => navigate("/admin/paymentview")}
              className="bg-yellow-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
            >
              💳Payment
            </button>
            <button
              onClick={() => navigate("/admin/restadd")}
              className="bg-purple-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
            >
              🏢Restaurant
            </button>
            <button
              onClick={() => navigate("/admin/notifications")}
              className="bg-white-600 px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              🔔
            </button>
          </div>
          {/* <button onClick={handleLogout} className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md transition">
  🚪 Logout
</button> */}

        </div>
      </nav>

      {/* Restaurant Registration Form */}
      <div className="flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Cravenow Restaurant 
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-red-400 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-red-400 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Cuisine</label>
              <input
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-red-400 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-red-400 focus:outline-none"
                required
              />
            </div>

           

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantManagement;