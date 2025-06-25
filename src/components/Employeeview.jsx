import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import backgroundImage from "../assets/images/empreg.webp";
import { deleteemployeeAPI, viewemployeeAPI } from "../Services/adminServices";
import toast, { Toaster } from "react-hot-toast";

const EmployeeView = () => {
  const navigate = useNavigate();

  // Fetch employees from backend
  const { data: employees, isLoading, error, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: viewemployeeAPI,
  });

  // Delete employee mutation
  const deleteMutation = useMutation({
    mutationFn: deleteemployeeAPI,
    onSuccess: () => {
      toast.success("✅ Employee deleted successfully!", { duration: 3000 });
      refetch(); // Refresh employee list after deletion
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "❌ Error deleting employee");
    },
  });

  // Handle employee deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white bg-opacity-95 p-10 rounded-xl shadow-2xl w-full max-w-5xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Employee List</h1>
        
        {/* Loading and Error Handling */}
        {isLoading && <p className="text-center text-gray-600">Loading employees...</p>}
        {error && <p className="text-center text-red-600">Error fetching employees</p>}

        {!isLoading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Username</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Job Title</th>
                  <th className="border border-gray-300 px-4 py-2">Department</th>
                  <th className="border border-gray-300 px-4 py-2">Attendance</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees?.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee._id} className="bg-gray-100 hover:bg-gray-200 transition">
                      <td className="border border-gray-300 px-4 py-2 font-medium">{employee.user.username}</td>
                      <td className="border border-gray-300 px-4 py-2">{employee.user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{employee.jobTitle}</td>
                      <td className="border border-gray-300 px-4 py-2">{employee.department}</td>
                      <td className={`border border-gray-300 px-4 py-2 font-semibold ${
                        employee.attendance?.[0]?.status === "present" ? "text-green-600" :
                        employee.attendance?.[0]?.status === "absent" ? "text-red-600" :
                        employee.attendance?.[0]?.status === "on leave" ? "text-yellow-600" :
                        "text-gray-500"
                      }`}>
                        {employee.attendance?.[0]?.status ? employee.attendance[0].status : "Not Marked"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                          onClick={() => navigate(`/admin/employeeedit/${employee._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                          onClick={() => handleDelete(employee._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
                          onClick={() => navigate(`/admin/employeedet/${employee._id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-700 py-4">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-6 text-center">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                onClick={() => navigate("/employee/employeereg")}
              >
                ⬅️ Back to Employee Registration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeView;
