import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/chefduty.webp";

const ChefDuty = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col text-gray-900"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "40%",
        backgroundRepeat: "repeat",
        backgroundPosition: "center"
      }}
    >
      {/* Navbar */}
      <nav className="bg-gray-900 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CraveNow Chef</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/employee/employeehome")}
              className="bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              🏠 Home
            </button>
            <button
              onClick={() => navigate("/employee/empprofileview")}
              className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              🧑‍ Profile
            </button>
            <button
              onClick={() => navigate("/employee/attendancemark")}
              className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              ⏰ Attendance
            </button>
            <button
            onClick={() => navigate("/employee/notifications")}
            className="bg-white-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
          >
            🔔
          </button>
          </div>
        </div>
      </nav>

      {/* Chef Duty Description Section */}
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">👨‍🍳 Chef Duty</h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            As a vital part of the CraveNow team, the Chef plays a key role in crafting exceptional dining experiences through precision, passion, and dedication. The chef is responsible for preparing and presenting each dish with consistency and excellence, adhering to high culinary standards and ensuring that every order is fulfilled on time. By closely collaborating with the kitchen staff and maintaining a seamless workflow, the Chef ensures that customers enjoy fresh, delicious meals, delivered promptly and with care. In CraveNow's fast-paced and innovative environment, the Chef is not only a culinary expert but also a cornerstone of quality and customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChefDuty;
