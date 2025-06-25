import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/deliveryback2.webp";
import {
  deliveryviewAPI,
  deliveryupdateAPI,
  deliveryotpAPI,
} from "../Services/employeeServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const DeliveryDuty = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["deliveryOrders"],
    queryFn: deliveryviewAPI,
  });

  const updateStatusMutation = useMutation({
    mutationFn: deliveryupdateAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["deliveryOrders"]);
    },
    onError: (error) => {
      console.error("Error updating status:", error);
      alert("Failed to update delivery status.");
    },
  });

  const otpMutation = useMutation({
    mutationFn: deliveryotpAPI,
    onSuccess: (response) => {
      const otp = response?.otp;
      alert(`OTP for delivery: ${otp}`);
    },
    onError: (error) => {
      console.error("Error generating OTP:", error);
      alert("Failed to generate OTP.");
    },
  });

  const orders = data || [];
console.log(orders);

  const handleStatusChange = (id, newStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleOTPClick = async(orderId) => {
    const id=orderId
    console.log(id);
    
    await otpMutation.mutate({ id: id });
  };

  if (isLoading)
    return <div className="text-center text-xl mt-10">Loading orders...</div>;

  if (isError)
    return (
      <div className="text-center text-xl text-red-600 mt-10">
        Failed to load delivery orders.
      </div>
    );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <nav className="bg-gray-900 p-4 text-white shadow-md bg-opacity-90">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CraveNow Delivery Boy</h1>
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

      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Delivery Management
          </h1>
          <div className="overflow-x-auto">
          {(orders.length===0)?(<p>No Deliveries currently available.......</p>):(
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6">Customer</th>
                  <th className="py-3 px-6">Address</th>
                  <th className="py-3 px-6">Phone</th>
                  <th className="py-3 px-6">Payment Status</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">OTP</th>
                </tr>
              </thead>
           
              <tbody>
               
                {orders.map((order) => (
                  <tr
                    key={order?.order?._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-6">{order?.order?.user?.username}</td>
                    <td className="py-3 px-6">{order?.order?.address}</td>
                    <td className="py-3 px-6">{order?.order?.contact}</td>
                    <td className="py-3 px-6 font-semibold text-green-600">
                      {order?.order?.paymentStatus}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <select
                        value={order.order?.status}
                        onChange={(e) =>
                          handleStatusChange(order.order?._id, e.target.value)
                        }
                        className="px-3 py-1 border rounded-lg bg-gray-50"
                      >
                        <option value="Awaiting Pickup">Awaiting Pickup</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>

                      </select>
                    </td>
                    <td className="py-3 px-6 text-center">
                    <button
  onClick={() => handleOTPClick(order?._id)}
  disabled={order.status === "Delivered"}
  className={`px-3 py-1 rounded-lg transition ${
    order.status === "Delivered"
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-blue-600 text-white hover:bg-blue-700"
  }`}
>
  Generate OTP
</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            
            </table>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDuty;
