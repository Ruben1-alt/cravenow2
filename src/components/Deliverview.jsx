import React, { useState } from "react";

const DeliveryView = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      order: "Order123",
      driver: "John Doe",
      status: "Out for Delivery",
      estimatedDeliveryTime: "2025-03-10T14:30",
      deliveredAt: null,
    },
    {
      id: 2,
      order: "Order456",
      driver: "Jane Smith",
      status: "Delivered",
      estimatedDeliveryTime: "2025-03-09T12:00",
      deliveredAt: "2025-03-09T12:45",
    },
  ]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/delivery-bg.jpg')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🚚 Delivery Overview
        </h1>
        {deliveries.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            No deliveries available.
          </p>
        ) : (
          <ul className="space-y-6">
            {deliveries.map((delivery) => (
              <li
                key={delivery.id}
                className="p-6 border rounded-lg shadow-sm bg-gray-50"
              >
                <div className="text-gray-800">
                  <p className="text-lg">
                    📦 <strong>Order:</strong> {delivery.order}
                  </p>
                  <p className="text-lg">🚗 <strong>Driver:</strong> {delivery.driver}</p>
                  <p className="text-lg">
                    🔄 <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        delivery.status === "Delivered"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </p>
                  <p className="text-lg">
                    ⏳ <strong>Estimated Delivery:</strong>{" "}
                    {new Date(delivery.estimatedDeliveryTime).toLocaleString()}
                  </p>
                  <p className="text-lg">
                    ✅ <strong>Delivered At:</strong>{" "}
                    {delivery.deliveredAt
                      ? new Date(delivery.deliveredAt).toLocaleString()
                      : "Not Delivered Yet"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeliveryView;
