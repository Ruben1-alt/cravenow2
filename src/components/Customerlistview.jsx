import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteCustomerAPI, getCustomersAPI } from "../Services/adminServices";
import { useNavigate } from "react-router-dom";
import background from "../assets/images/customerlist.webp";

const CustomerListView = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ Fetch Customers
  const { data:customers , isLoading, error } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomersAPI,
  });
  // const customers=data.userCount
console.log(customers);

  // ✅ Delete Customer Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCustomerAPI,
    onSuccess: () => window.location.reload(),
  });

  if (isLoading) {
    return <div className="text-center text-white">Loading Customers...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading customers</div>;
  }

 // ✅ Filter Customers Based on Search and Role
const filteredCustomers = customers?.filter(
  (customer) =>
    customer.role === "customer" && 
    customer.username.toLowerCase().includes(search.toLowerCase())
);


  return (
    <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center p-5"
    style={{ backgroundImage: `url(${background})` }}
  >
  
      <div className="w-full max-w-4xl bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Customer List</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="text-center border">
                    <td className="p-2 border">{customer.username}</td>
                    <td className="p-2 border">{customer.email}</td>
                    <td className="p-2 border">{customer.phone || "N/A"}</td>
                      {/* <button
                        onClick={() => navigate(`/admin/customer/${customer._id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        View
                      </button> */}
                      {/* <button
                        onClick={() => deleteMutation.mutate(customer._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button> */}
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

         {/* Back to Panel Button - Outside the Box */}
      <button
        onClick={() => navigate("/admin/dashboard")} // Adjust route as needed
        className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 z-10"
      >
        ⬅ Back to Panel
      </button>

      </div>
    </div>
  );
};

export default CustomerListView;
