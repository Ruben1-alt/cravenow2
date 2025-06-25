import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Home, User, Bell, Utensils, Search, Trash2 } from "lucide-react";
import {
  cartviewAPI,
  removecartAPI,
  clearcartAPI,
} from "../Services/customerServices";

const CartView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: cartviewAPI,
  });

  const removeMutation = useMutation({
    mutationFn: removecartAPI,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const clearCartMutation = useMutation({
    mutationFn: clearcartAPI,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const removeFromCart = async (itemId) => {
    if (window.confirm("Are you sure you want to remove this item from your cart?")) {
      await removeMutation.mutate(itemId._id);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      await clearCartMutation.mutate();
    }
  };

  const handleOrderNow = () => {
    if (!cart?.items || cart.items.length === 0) {
      alert("Your cart is empty! Add items before placing an order.");
      return;
    }

    navigate("/customer/choosepayment");
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-indigo-900 bg-opacity-95 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/customer/chome"><Home className="w-6 h-6" /></Link></li>
              <li><Link to="/employee/profileview"><User className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/notifications"><Bell className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/search"><Search className="w-6 h-6" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Cart Section */}
      <div className="max-w-4xl mx-auto p-8 border rounded-xl shadow-lg bg-white mt-6">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span role="img" aria-label="cart">🛒</span> Your Cart
          </h2>
          <span className="text-gray-600 text-lg">Review your selected items</span>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500 text-xl">Loading cart items...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-xl">Error fetching cart data.</p>
        ) : cart?.items.length === 0 ? (
          <p className="text-gray-500 text-center italic">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-6">
              {cart.items.map((item) => (
                <li key={item._id} className="p-6 border rounded-lg shadow-sm bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{item.menuItem.name}</p>
                    <p className="text-gray-600 italic">{item.menuItem.description}</p>
                    <p className="text-blue-700 font-semibold text-lg mt-1">
                      ${item.menuItem.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-900 font-bold text-xl">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.menuItem)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition shadow-md"
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-2xl font-bold text-gray-900">
                Total: ${cart.totalAmount.toFixed(2)}
              </p>
              <button
                onClick={handleClearCart}
                className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition shadow-md"
              >
                Clear Cart
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleOrderNow}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition shadow-md"
              >
                Order Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartView;
