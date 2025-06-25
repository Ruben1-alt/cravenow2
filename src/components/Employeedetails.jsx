import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import backgroundImage from "../assets/images/empreg.webp";
import { detailemployeeAPI } from "../Services/adminServices";

const EmployeeDetails = ({ id }) => {
  const navigate = useNavigate();

  // Fetch employee details using useQuery
  const { data: employee, isLoading, error } = useQuery({
    queryKey: ["employeeDetails", id], // Include ID in query key
    queryFn: () => detailemployeeAPI(id), // Pass a function instead of calling it
  });
console.log(employee)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Failed to load employee details. Please try again later.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-95 p-10 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Employee Details
        </h1>

        <div className="space-y-4 text-lg text-gray-800">
          <p><strong>User ID:</strong> {employee?.user.username || "N/A"}</p>
          <p><strong>Job Title:</strong> {employee?.jobTitle || "N/A"}</p>
          <p><strong>Department:</strong> {employee?.department || "N/A"}</p>
          <p><strong>Date Hired:</strong> {employee?.dateHired || "N/A"}</p>
          <p><strong>Salary:</strong> ${employee?.salary || "N/A"}</p>
          <p><strong>Status:</strong> {employee?.status || "N/A"}</p>
          <p><strong>Performance Review:</strong> {employee?.performanceReview || "N/A"}</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
