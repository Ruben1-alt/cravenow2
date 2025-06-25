import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/images/background1.jpg";
import { detailemployeeAPI, editemployeeAPI } from "../Services/adminServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job Title is required"),
  department: Yup.string().required("Department is required"),
  dateHired: Yup.date().required("Date Hired is required"),
  salary: Yup.number().positive().required("Salary is required"),
  status: Yup.string().oneOf(["active", "inactive", "on leave"]),
  performanceReview: Yup.string(),
});

const EmployeeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: employee, isLoading, error } = useQuery({
    queryKey: ["employeeDetails", id],
    queryFn: () => detailemployeeAPI(id),
  });

  const mutation = useMutation({
    mutationFn: (updatedData) => editemployeeAPI({ id, updatedData }),
    onSuccess: () => {
      toast.success("🎉 Employee details updated successfully!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/admin/employeeview");
      }, 2800);
    },
    onError: (err) => {
      console.error("Update failed:", err);
      toast.error("❌ Failed to update employee details. Please try again.");
    },
  });

  const formik = useFormik({
    initialValues: {
      jobTitle: employee?.jobTitle || "",
      department: employee?.department || "",
      dateHired: employee?.dateHired || "",
      salary: employee?.salary || "",
      status: employee?.status || "active",
      performanceReview: employee?.performanceReview || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

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
          Edit Employee
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Job Title</label>
            <select
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Job Title</option>
              <option value="Manager">Manager</option>
              <option value="Chef / Cook">Chef / Cook</option>
              <option value="Waiter / Server">Waiter / Server</option>
              <option value="Cashier">Cashier</option>
              <option value="Delivery Person">Delivery Person</option>
              <option value="Cleaner">Cleaner</option>
            </select>
            {formik.errors.jobTitle && (
              <p className="text-red-500">{formik.errors.jobTitle}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.department && (
              <p className="text-red-500">{formik.errors.department}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Date Hired</label>
            <input
              type="date"
              name="dateHired"
              value={formik.values.dateHired ? formik.values.dateHired.split("T")[0] : ""}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.dateHired && (
              <p className="text-red-500">{formik.errors.dateHired}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Salary ($)</label>
            <input
              type="number"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.salary && (
              <p className="text-red-500">{formik.errors.salary}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on leave">On Leave</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Performance Review</label>
            <textarea
              name="performanceReview"
              value={formik.values.performanceReview}
              onChange={formik.handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/employeeview")}
            className="w-full mt-4 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>

      {/* Toast Container for all toasts */}
      <ToastContainer />
    </div>
  );
};

export default EmployeeEdit;
