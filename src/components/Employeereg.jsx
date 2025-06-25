import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/empreg.webp";
import { addemployeeAPI } from "../Services/adminServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema
const employeeSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  jobTitle: yup.string().required("Job title is required"),
  department: yup.string().required("Department is required"),
  dateHired: yup.date().required("Date hired is required"),
  salary: yup.number().positive("Salary must be positive").required("Salary is required"),
  status: yup.string().required("Status is required"),
  performanceReview: yup.string(),
});

const jobTitles = ["Manager", "Chef / Cook", "Waiter / Server", "Cashier", "Delivery Person", "Cleaner"];
const departments = ["Kitchen", "Service", "Management", "Delivery", "Finance"];
const statuses = ["Active", "Inactive", "On Leave"];

const EmployeeRegistration = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({ mutationFn: addemployeeAPI });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      jobTitle: "",
      department: "",
      dateHired: "",
      salary: "",
      status: "active",
      performanceReview: "",
    },
    validationSchema: employeeSchema,
    onSubmit: async (values) => {
      try {
        await mutateAsync(values);
        toast.success("🎉 Employee Registered Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        formik.resetForm();
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong!", {
          position: "top-center",
          autoClose: 4000,
          theme: "colored",
        });
      }
    },
  });

  return (
    <div>
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Header */}
      <nav className="bg-gray-900 fixed top-0 w-full p-4 text-white shadow-md z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">CraveNow Admin</h1>
          <div className="flex space-x-3">
            {[
              { label: "📊 Panel", path: "/admin/dashboard", color: "red" },
              { label: "🍽️ Menu", path: "/admin/menureg", color: "blue" },
              { label: "🧑‍💼 Employee", path: "/employee/employeereg", color: "green" },
              { label: "💳 Payment", path: "/admin/paymentview", color: "yellow" },
              { label: "🔔", path: "/admin/notifications", color: "white" },
            ].map((btn) => (
              <button
                key={btn.path}
                onClick={() => navigate(btn.path)}
                className={`bg-${btn.color}-600 px-3 py-2 rounded-md hover:bg-pink-700 transition`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <div
  className="flex items-center justify-center min-h-[90vh] pt-24 bg-cover bg-center p-4"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  <div className="bg-white bg-opacity-95 p-4 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
    <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
      Employee Registration
    </h2>
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {Object.keys(formik.initialValues).map((key) => (
        <div key={key}>
          <label className="block text-gray-700 font-medium">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          {key === "jobTitle" || key === "status" ? (
            <select
              name={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              {key === "jobTitle" && (
                <>
                  <option value="" disabled>Select Job Title</option>
                  {jobTitles.map((title) => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </>
              )}
              {key === "status" && (
                <>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on leave">On Leave</option>
                </>
              )}
            </select>
          ) : key === "performanceReview" ? (
            <textarea
              name={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={2}
            />
          ) : (
            <input
              type={
                key === "password"
                  ? "password"
                  : key === "email"
                  ? "email"
                  : key === "dateHired"
                  ? "date"
                  : key === "salary"
                  ? "number"
                  : "text"
              }
              name={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          )}
          {formik.touched[key] && formik.errors[key] && (
            <p className="text-red-400 text-xs mt-1">{formik.errors[key]}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register Employee"}
      </button>
      <button
        type="button"
        onClick={() => navigate("/admin/employeeview")}
        className="w-full mt-2 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all"
      >
        View Employees
      </button>
    </form>
  </div>
</div>

    </div>
  );
};

export default EmployeeRegistration;
