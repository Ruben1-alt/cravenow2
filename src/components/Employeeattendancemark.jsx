import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/attendance.webp";
import { useMutation } from "@tanstack/react-query";
import { attendencemarkAPI } from "../Services/employeeServices";

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  const [attendanceStatus, setAttendanceStatus] = useState("");

  const mutation = useMutation({
    mutationFn: attendencemarkAPI,
    onSuccess: (data) => {
      setAttendanceStatus(data.newAttendance.status);
    },     
    onError: (error) => {
      console.error("Error marking attendance:", error);
      alert("❌ Failed to mark attendance. Please try again.");
    },
  });

  const handleMarkAttendance = (status) => {
    mutation.mutate({ status });
    alert(`✅ Attendance marked as ${status}`);

  };

  return (
    <div
      className="min-h-screen flex flex-col items-center text-gray-900"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "50% auto",
        backgroundRepeat: "repeat",
        backgroundPosition: "center center",
      }}
    >
      {/* Navbar Header */}
      <header className="bg-blue-900 bg-opacity-90 text-white w-full py-4 px-8 flex justify-between items-center shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold tracking-wider">CraveNow</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/employee/employeehome")} className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-lg shadow-md transition">🏢 Home</button>
          <button onClick={() => navigate("/employee/empprofileview")} className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-lg shadow-md transition">🧑‍ Profile</button>
          <button onClick={() => navigate("/employee/attendancemark")} className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-lg shadow-md transition">⏰ Attendance</button>
          <button onClick={() => navigate('/employee/notifications')} className="bg-white-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
              🔔 
            </button>
        </div>
      </header>

      {/* Attendance Marking Section */}
      <div className="mt-10 w-full max-w-3xl text-center bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-300">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">✅ Mark Your Attendance</h1>
        <p className="text-lg text-gray-700 mb-6">Select your attendance status for today:</p>

        <div className="flex justify-center space-x-6">
          <button
            onClick={() => handleMarkAttendance("present")}
            disabled={mutation.isLoading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            ✅ Present
          </button>
          <button
            onClick={() => handleMarkAttendance("absent")}
            disabled={mutation.isLoading}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            ❌ Absent
          </button>
          <button
            onClick={() => handleMarkAttendance("on leave")}
            disabled={mutation.isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            🌴 On Leave
          </button>
        </div>

        {attendanceStatus && (
          <p className="mt-6 text-xl font-semibold text-blue-900 animate-fadeIn">
            📌 Your attendance: <span className="font-bold">{attendanceStatus}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendance;
