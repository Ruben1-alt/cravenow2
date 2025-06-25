import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Home, Bell, User, Utensils } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { menuviewAPI } from "../Services/menuServices";

const SearchMenu = () => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ["menuItems"],
    queryFn: menuviewAPI,
  });

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredResults(menuItems || []);
    } else {
      const filtered = menuItems?.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [query, menuItems]);

  const handleItemClick = (item) => {
    if (item.stock > 0) {
      navigate(`/customer/menudet/${item._id}`);
    } else {
      alert(`${item.name} is out of stock!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-900 bg-opacity-95 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/customer/chome"><Home className="w-6 h-6 hover:text-gray-300" /></Link></li>
              <li><Link to="/employee/profileview"><User className="w-6 h-6 hover:text-gray-300" /></Link></li>
              <li><Link to="/customer/notifications"><Bell className="w-6 h-6 hover:text-gray-300" /></Link></li>
              <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6 hover:text-gray-300" /></Link></li>
              <li><Link to="/customer/search"><Search className="w-6 h-6 hover:text-gray-300" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Search Menu</h2>
            {/* <button
              onClick={() => navigate("/customer/chome")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Home className="w-5 h-5 mr-2" /> Home
            </button> */}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Search for a dish..."
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Search className="w-5 h-5 mr-2" /> Search
            </button>
          </div>

          {/* Results Section */}
          <div className="mt-6">
            {isLoading && <p className="text-gray-500">Loading menu...</p>}
            {error && <p className="text-red-500">Error fetching menu items</p>}

            {filteredResults?.length > 0 ? (
              filteredResults.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center p-3 mb-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition ${
                    item.stock <= 0 ? "bg-gray-300 cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-blue-600 font-medium">${item.price.toFixed(2)}</p>
                    {item.stock <= 0 && <p className="text-red-600 font-semibold">Out of stock</p>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-4 text-center">
                {query ? "No items match your search." : "No menu items available."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
