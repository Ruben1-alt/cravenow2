import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import backgroundImage from "../assets/images/empback.webp";
import { logoutAction } from "../REDUX/userSlice";
import { empprofileAPI } from "../Services/employeeServices"; // ✅ API for profile

const EmployeeHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    sessionStorage.removeItem("userToken");
    navigate("/login");
  };

  // ✅ Fetch employee profile using useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employeeProfile"],
    queryFn: empprofileAPI,
  });

  const employeeRole = data?.jobTitle?.toLowerCase(); // Normalize role to lowercase

  const renderRoleContent = () => {
    if (isLoading) return <p className="text-gray-700 mt-2">Loading your dashboard...</p>;
    if (isError) return <p className="text-red-600 mt-2">Failed to load profile. Please try again.</p>;

    switch (employeeRole) {
      case "chef / cook":
        return (
          <div>
            <h2 className="text-3xl font-bold text-blue-900">🍳 Chef Dashboard</h2>
            <p className="text-gray-700 mt-2">
              The chef is responsible for preparing high-quality meals according to customer orders, maintaining kitchen hygiene, ensuring food safety standards, and coordinating with waiters to manage order timing efficiently.
            </p>
            <button
              onClick={() => navigate("/employee/chefduty")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              View Duties
            </button>
          </div>
        );
      case "manager":
        return (
          <div>
            <h2 className="text-3xl font-bold text-blue-900">🧑‍💼 Manager Dashboard</h2>
            <p className="text-gray-700 mt-2">
              The manager oversees all restaurant operations, ensuring smooth workflow. Responsibilities include managing staff, handling inventory, addressing customer concerns, and ensuring overall efficiency in service.
            </p>
            <button
              onClick={() => navigate("/employee/managerduty")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              View Duties
            </button>
          </div>
        );
      case "delivery person":
        return (
          <div>
            <h2 className="text-3xl font-bold text-blue-900">🚚 Delivery Dashboard</h2>
            <p className="text-gray-700 mt-2">
              The delivery personnel ensures timely and safe delivery of food orders to customers. They are responsible for confirming deliveries, updating order statuses, and maintaining excellent customer service during interactions.
            </p>
            <button
              onClick={() => navigate("/employee/deliveryduty")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              View Duties
            </button>
          </div>
        );
      case "cashier":
        return (
          <div>
            <h2 className="text-3xl font-bold text-blue-900">💳 Cashier Dashboard</h2>
            <p className="text-gray-700 mt-2">
              The cashier is responsible for processing customer payments, generating receipts, tracking daily transactions, and ensuring accurate handling of cash and digital payments.
            </p>
            <button
              onClick={() => navigate("/employee/cashierduty")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              View Duties
            </button>
          </div>
        );
      case "waiter / server":
        return (
          <div>
            <h2 className="text-3xl font-bold text-blue-900">🍽️ Waiter Dashboard</h2>
            <p className="text-gray-700 mt-2">
              The waiter plays a crucial role in customer satisfaction by taking orders, serving food and drinks, ensuring tables are clean, and addressing customer needs promptly.
            </p>
            <button
              onClick={() => navigate("/employee/waiterduty")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              View Duties
            </button>
          </div>
        );
      case "cleaner":
        return (
          <div>
            <h2 className="text-3xl font-bold text-blue-900">🧹 Cleaner Dashboard</h2>
            <p className="text-gray-700 mt-2">
              The cleaner is responsible for maintaining hygiene and cleanliness in the restaurant. Duties include sanitizing tables, cleaning kitchen areas, disposing of waste properly, and reporting maintenance issues.
            </p>
          </div>
        );
      default:
        return <p className="text-gray-700 mt-2">Role not recognized. Please contact admin.</p>;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="bg-blue-900 bg-opacity-90 text-white w-full py-4 px-8 flex justify-between items-center shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold tracking-wider">CraveNow</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/employee/empprofileview")}
            className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-lg shadow-md transition"
          >
            🧑‍ Profile
          </button>
          <button
            onClick={() => navigate("/employee/attendancemark")}
            className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-lg shadow-md transition"
          >
            ⏰ Attendance
          </button>
          <button
            onClick={() => navigate("/employee/notifications")}
            className="bg-white-600 px-4 py-2 rounded-md hover:bg-pink-700 transition"
          >
            🔔
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mt-12 w-full max-w-5xl text-center">
        <h2 className="text-5xl font-extrabold text-blue-900 mb-4">Welcome to CraveNow!</h2>
        <p className="text-lg text-gray-600">
          Your personalized dashboard is here to help you excel at your role.
        </p>
      </div>

      <div className="mt-8 w-full max-w-6xl bg-white bg-opacity-95 p-8 rounded-lg shadow-xl">
        {renderRoleContent()}
      </div>
    </div>
  );
};

export default EmployeeHome;
