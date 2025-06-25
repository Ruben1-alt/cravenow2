import React, { useState } from "react";
import backgroundImage from "../assets/images/background1.jpg"; // Ensure you have this image in your assets

const DeliveryRegistration = () => {
  const [formData, setFormData] = useState({
    order: "",
    driver: "",
    status: "Awaiting Pickup",
    estimatedDeliveryTime: "",
    deliveredAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Delivery Registered:", formData);
    alert("Delivery Registered Successfully!");
    setFormData({
      order: "",
      driver: "",
      status: "Awaiting Pickup",
      estimatedDeliveryTime: "",
      deliveredAt: "",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Delivery Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Order ID</label>
            <input
              type="text"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Driver ID</label>
            <input
              type="text"
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Awaiting Pickup">Awaiting Pickup</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Estimated Delivery Time</label>
            <input
              type="datetime-local"
              name="estimatedDeliveryTime"
              value={formData.estimatedDeliveryTime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Delivered At</label>
            <input
              type="datetime-local"
              name="deliveredAt"
              value={formData.deliveredAt}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register Delivery
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryRegistration;
