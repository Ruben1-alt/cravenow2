import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/deliveryback1.webp";
import { useQuery, useMutation } from "@tanstack/react-query";
import { empprofileAPI } from "../Services/employeeServices";
import { changepasswordAPI } from "../Services/customerServices";

const EmployeeProfileView = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["employeeProfile"],
    queryFn: empprofileAPI,
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const changePasswordMutation = useMutation({
    mutationFn: changepasswordAPI,
    onSuccess: (response) => {
        alert("Password changed successfully!");
    },
    onError: () => {
      setErrorMsg("Failed to change password. Try again.");
    },
  });

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error loading profile.</p>;
  }

  const handleChangePassword = () => {
    setErrorMsg("");
    changePasswordMutation.mutate({ oldPassword, newPassword });
  };

  const employeeData = {
    username: data?.user?.username || "N/A",
    email: data?.user?.email || "N/A",
    role: data?.user?.role || "N/A",
    jobTitle: data?.jobTitle || "N/A",
    department: data?.department || "N/A",
    dateHired: data?.dateHired || "N/A",
    salary: `$${data?.salary?.toLocaleString()}` || "N/A",
    status: data?.status || "N/A",
    performanceReview: data?.performanceReview || "N/A",
  };

  return (
    <div
      className="min-h-screen flex flex-col text-gray-900"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "42%",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      <header className="bg-blue-900 bg-opacity-90 text-white w-full py-4 px-8 flex justify-between items-center shadow-md rounded-b-lg">
        <h1 className="text-4xl font-extrabold tracking-wide">CraveNow</h1>
        <div className="flex items-center space-x-4">
        <button onClick={() => navigate("/employee/employeehome")} className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-lg shadow-md transition">🏢 Home</button>
          <button onClick={() => navigate("/employee/empprofileview")} className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg shadow-md transition">🧑‍ Profile</button>
          <button onClick={() => navigate("/employee/attendancemark")} className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg shadow-md transition">⏰ Attendance</button>
          <button onClick={() => navigate('/employee/notifications')} className="bg-white-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
              🔔 
            </button>
        </div>
      </header>
      <div className="mt-12 w-full max-w-4xl text-center bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Employee Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {Object.entries(employeeData).map(([key, value]) => (
            <div key={key} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 uppercase font-semibold text-sm">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
              <p className="text-lg font-medium text-gray-900">{value}</p>
            </div>
          ))}
        </div>
        {/* <button
          onClick={() => navigate("/employee/employeehome")}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
        >
          Back to Home
        </button> */}
        <button
          onClick={() => setShowChangePassword(true)}
          className="w-full mt-4 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all shadow-md"
        >
          Change Password
        </button>
        {showChangePassword && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
            />
            {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
            <button
              onClick={handleChangePassword}
              className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md"
              disabled={changePasswordMutation.isLoading}
            >
              {changePasswordMutation.isLoading ? "Changing..." : "Submit"}
            </button>
            <button
              onClick={() => setShowChangePassword(false)}
              className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfileView;
