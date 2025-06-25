import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import backgroundImage from "../assets/images/complaint.webp";
import { complaintviewallAPI } from "../Services/adminServices";

const ComplaintView = () => {
  const navigate = useNavigate();

  const { data: complaints, isLoading, isError } = useQuery({
    queryKey: ["complaints"],
    queryFn: complaintviewallAPI,
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 z-10"
      >
        ⬅ Back to Panel
      </button>

      <div className="flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl w-full max-w-5xl border border-gray-200 backdrop-blur-md">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-10 tracking-wide">
            🚨 All Complaints
          </h1>

          {isLoading ? (
            <p className="text-center text-gray-700">Loading complaints...</p>
          ) : isError ? (
            <p className="text-center text-red-600">Failed to load complaints.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 shadow-sm rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-indigo-100 text-gray-700 text-lg">
                    <th className="px-6 py-4 border-b text-left">Si.no</th>
                    <th className="px-6 py-4 border-b text-left">👤 User Name</th>
                    <th className="px-6 py-4 border-b text-left">📌 Subject</th>
                    <th className="px-6 py-4 border-b text-left">📝 Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 text-base">
  {complaints?.map((complaint, index) => (
    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="px-6 py-4 border-b text-left">{index + 1}</td>
      <td className="px-6 py-4 border-b text-left">{complaint.user?.username}</td>
      <td className="px-6 py-4 border-b text-left">{complaint.subject}</td>
      <td className="px-6 py-4 border-b text-left">{complaint.description}</td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintView;
