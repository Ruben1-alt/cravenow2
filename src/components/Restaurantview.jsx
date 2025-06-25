import React from "react";
import { Link } from "react-router-dom";
import { User, Bell, Utensils, Search, Home } from "lucide-react";
import backgroundImage from "../assets/images/restview.webp";

const RestaurantView = () => {
  const restaurant = {
    name: "CraveNow",
    location: "New York",
    cuisine: "Italian",
    contact: "9447834662",
    openingHours: "9:00 AM - 10:00 PM",
    deliveryAvailable: true,
    ratings: 4.8,
    description: "A delightful place to enjoy authentic Italian cuisine with a modern touch."
  };

  return (
    <div>
      <header className="bg-indigo-800 bg-opacity-90 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">CraveNow</h1>
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
              {/* <li>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                  Logout
                </button>
              </li> */}
            </ul>
          </nav>
        </div>
      </header>

      <div
        className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="max-w-4xl w-full p-8 border rounded-xl shadow-lg bg-white bg-opacity-50 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-900">🍽️ {restaurant.name}</h2>
            <span className="text-gray-600 text-lg">{restaurant.description}</span>
          </div>
          <div className="text-gray-800 space-y-4">
            <p className="text-lg">📍 Location: {restaurant.location}</p>
            <p className="text-lg">🍛 Cuisine: {restaurant.cuisine}</p>
            <p className="text-lg">📞 Contact: {restaurant.contact}</p>
            <p className="text-lg">🕒 Opening Hours: {restaurant.openingHours}</p>
            <p className="text-lg">🚚 Delivery: {restaurant.deliveryAvailable ? "Available" : "Not Available"}</p>
            <p className="text-lg font-semibold text-yellow-500">⭐ Ratings: {restaurant.ratings} / 5</p>
          </div>
          <div className="mt-6 text-center">
            <Link to="/customer/chome" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantView;