import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/managerduty.webp";
import { menuviewAPI } from "../Services/menuServices";

const ManagerDuty = () => {
  const navigate = useNavigate();

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menuItems"],
    queryFn: () => menuviewAPI(), // expects all menu items
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center text-gray-800"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header Navbar */}
      <header className="bg-gray-900 bg-opacity-90 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <h1 className="text-3xl font-bold tracking-wide">🍽️ CraveNow Manager</h1>
          <div className="flex space-x-4">
            <button onClick={() => navigate("/employee/employeehome")} className="hover:bg-teal-700 bg-teal-600 px-4 py-2 rounded-xl transition font-medium">🏠 Home</button>
            <button onClick={() => navigate("/employee/empprofileview")} className="hover:bg-gray-800 bg-gray-700 px-4 py-2 rounded-xl transition font-medium">🧑‍ Profile</button>
            <button onClick={() => navigate("/employee/attendancemark")} className="hover:bg-gray-800 bg-gray-700 px-4 py-2 rounded-xl transition font-medium">⏰ Attendance</button>
            <button
              onClick={() => navigate("/employee/notifications")}
              className="bg-white-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
            >
              🔔
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-5xl mx-auto py-12 px-4 md:px-0 bg-white bg-opacity-90 mt-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">📋 Menu Items</h2>

        {isLoading ? (
          <p className="text-center text-gray-600 text-lg">Loading menu items...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {menuItems?.map((item) => (
              <div key={item._id} className="bg-gray-50 rounded-xl shadow hover:shadow-lg p-6 transition-all border border-gray-200">
                {/* Image Display */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Name and Description */}
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-700 mt-1">{item.description}</p>
                </div>

                {/* Price, Stock and Edit Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 font-medium">💰 ₹{item.price}</p>
                    <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/employee/edit/${item._id}`)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManagerDuty;
