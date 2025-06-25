import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Home, User, Bell, Utensils, Search, Minus, Plus } from "lucide-react";
import backgroundImage from "../assets/images/menuback.webp";
import { detailmenuAPI } from "../Services/menuServices";
import { addtocartAPI } from "../Services/customerServices";

const MenuDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { data: menuItem, isLoading, error } = useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => detailmenuAPI(id),
  });

  const addToCartMutation = useMutation({
    mutationFn: addtocartAPI,
    onSuccess: () => {
      alert(`✅ ${menuItem.name} added to cart!`);
      navigate("/customer/chome"); // ✅ Navigate to homepage after adding to cart
    },
    onError: () => {
      alert("Failed to add item to cart. Please try again.");
    },
  });
  
  const handleAddToCart = () => {
    addToCartMutation.mutate({ id, quantity });
  };

  const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, menuItem.stock));  // Limit to stock
  const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1)); // Ensure at least 1 item

  if (isLoading) return <p className="text-center text-white text-2xl mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-2xl mt-10">Error loading menu item.</p>;

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="max-w-lg w-full p-8 border rounded-xl shadow-2xl bg-white bg-opacity-90 text-center">
          <img src={menuItem.image} alt={menuItem.name} className="w-full h-64 object-cover rounded-md shadow-md" />
          <h2 className="text-3xl font-extrabold text-gray-900 mt-4">{menuItem.name}</h2>
          <p className="text-gray-600 text-lg mt-2">{menuItem.description}</p>
          <p className="text-blue-600 text-2xl font-semibold mt-2">${menuItem.price.toFixed(2)}</p>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-full transition-all duration-300 ease-in-out"
            >
              <Minus className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 h-10 text-center text-lg font-semibold border rounded-md"
            />
            <button
              onClick={increaseQuantity}
              disabled={quantity >= menuItem.stock}  // Disable if quantity is greater than or equal to stock
              className={`bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-full transition-all duration-300 ease-in-out ${quantity >= menuItem.stock ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={() => navigate(`/customer/reviewview/${id}`, { state: { menuItemId: id } })}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              ⭐ Review
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              ⬅ Back to Menu
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
