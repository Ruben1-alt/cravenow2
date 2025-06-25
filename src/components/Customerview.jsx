import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Bell, Utensils, Search, Home } from "lucide-react";
import { QueryClient, useQuery } from "@tanstack/react-query"; // Import React Query
import backgroundImage from "../assets/images/custpro.webp";
import { custprofileAPI } from "../Services/customerServices"; // Import API

const CustomerProfileView = () => {
  const navigate = useNavigate();

  // Fetch customer profile data
  const { data: customerData,isSuccess, isLoading, error } = useQuery({
    queryKey: ["customerProfile"],
    queryFn: custprofileAPI,
  });
  console.log(customerData);
  

  const handleLogout = () => {
    // Logout logic here
    console.log("User logged out");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) return <div className="text-center text-lg mt-10">Loading profile...</div>;
  if (error) return <div className="text-center text-lg text-red-600 mt-10">Error loading profile</div>;

  return (
    <div>
      <header className="bg-indigo-800 bg-opacity-90 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
            <li><Link to="/customer/chome" className="hover:underline"><Home className="w-6 h-6" /></Link></li>
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
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
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
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg border border-gray-300 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Customer Profile</h1>

          <div className="space-y-4">
            {/* Username */}
            <div className="border-b pb-2">
              <p className="text-gray-600 font-medium">Username</p>
              <p className="text-lg font-semibold">{customerData?.user.username || "N/A"}</p>
            </div>

            {/* Email */}
            <div className="border-b pb-2">
              <p className="text-gray-600 font-medium">Email</p>
              <p className="text-lg font-semibold">{customerData?.user.email || "N/A"}</p>
            </div>

            {/* Phone */}
            <div className="border-b pb-2">
              <p className="text-gray-600 font-medium">Phone Number</p>
              <p className="text-lg font-semibold">{customerData?.user.phone || "N/A"}</p>
            </div>

            {/* Address */}
            <div className="border-b pb-2">
              <p className="text-gray-600 font-medium">Address</p>
              <p className="text-lg font-semibold">{customerData?.user.address || "N/A"}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-4">
            <button
              onClick={() => navigate("/customer/custedit")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
            >
              Edit Profile
            </button>

            {/* <button
              onClick={() => navigate("/customer/chome")}
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition transform hover:scale-105"
            >
              Back to Home
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileView;
