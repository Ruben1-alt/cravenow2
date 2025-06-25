import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { User, Bell, Utensils, Search, Home } from "lucide-react";
import backgroundImage from "../assets/images/menuback.webp";
import { menuviewAPI } from "../Services/menuServices";

const Menu = () => {
  const navigate = useNavigate();

  // Fetch menu items
  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ["menuItems"],
    queryFn: menuviewAPI,
  });

  const handleItemClick = (item) => {
    if (item.stock > 0) {
      navigate(`/customer/menudet/${item._id}`);
    } else {
      alert(`${item.name} is out of stock!`);
    }
  };

  if (isLoading) return <div className="text-center text-lg mt-10">Loading menu...</div>;
  if (error) return <div className="text-center text-lg text-red-600 mt-10">Error loading menu</div>;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="bg-indigo-800 bg-opacity-90 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/customer/chome" className="hover:underline"><Home className="w-6 h-6" /></Link></li>
              <li><Link to="/employee/profileview" className="hover:underline"><User className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/notifications" className="hover:underline"><Bell className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/restaurantview" className="hover:underline"><Utensils className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/search" className="hover:underline"><Search className="w-6 h-6" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex items-center justify-center p-6">
        <div className="max-w-4xl w-full p-8 border rounded-xl shadow-xl bg-white bg-opacity-80 backdrop-blur-lg">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <h2 className="text-4xl font-extrabold text-gray-900">🍽️ Menu Items</h2>
            <span className="text-gray-600 text-lg">Explore our delicious offerings</span>
          </div>
          {menuItems.length === 0 ? (
            <p className="text-gray-600 text-center">No menu items available.</p>
          ) : (
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`p-6 border rounded-lg shadow-md bg-gray-50 cursor-pointer ${item.stock <= 0 ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'hover:shadow-lg hover:scale-105'} transition`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="text-gray-800 flex-1">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                      {item.stock <= 0 && <p className="text-red-600 font-semibold">Out of stock</p>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
