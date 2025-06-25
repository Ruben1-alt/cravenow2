import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Home, User, Bell, Utensils, Search } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cartviewAPI, orderAPI } from "../Services/customerServices";
import { Toaster, toast } from "react-hot-toast";

const ChoosePayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: cartviewAPI,
  });

  const orderMutation = useMutation({
    mutationFn: orderAPI,
    onError: (error) => {
      console.error("Order failed", error);
      toast.error(" Failed to place the order. Please try again.");
    },
  });

  const handleCashOnDelivery = async () => {
    const { address, contact } = deliveryInfo;
  
    if (!address || !contact) {
      toast.error("Please fill in your address and contact number.");
      return;
    }
  
    const payload = {
      paymentDetails: "Cash on Delivery",
      address,
      contact,
    };
  
    await orderMutation.mutateAsync(payload);
    toast.success(" Order placed successfully! Your food is on the way.");
  
    // ⏳ Wait briefly so user sees the toast
    setTimeout(() => {
      navigate("/customer/chome");
    }, 1500); // 1.5 seconds
  };
  
  const handleCardPayment = async () => {
    const { address, contact } = deliveryInfo;

    if (!address || !contact) {
      toast.error("Please fill in your address and contact number.");
      return;
    }

    const payload = {
      paymentDetails: "Card Payment",
      address,
      contact,
    };

    const order = await orderMutation.mutateAsync(payload);
    toast.success("✅ Proceeding to secure card payment...");
    navigate(`/customer/payment/${order.order._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Toasts will show up here */}
      <Toaster position="top-center" reverseOrder={false} />

      <header className="bg-indigo-900 text-white py-4 shadow-md">
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

      <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Choose Payment Method 💳
        </h2>

        {cart && cart.items.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Summary 🧾</h3>
            <ul className="space-y-2">
              {cart.items.map((item) => (
                <li key={item._id} className="flex justify-between border-b pb-2 text-gray-700">
                  <span>{item.menuItem.name} × {item.quantity}</span>
                  <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>Total:</span>
              <span>${cart?.totalAmount?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        )}

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Delivery Address</label>
            <textarea
              name="address"
              value={deliveryInfo.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="123 Main St, City, ZIP"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={deliveryInfo.contact}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="+1 234 567 8901"
            />
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleCashOnDelivery}
            disabled={orderMutation.isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
          >
            {orderMutation.isLoading ? "Placing Order..." : "💵 Cash on Delivery"}
          </button>

          <button
            onClick={handleCardPayment}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
          >
            💳 Pay with Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoosePayment;
