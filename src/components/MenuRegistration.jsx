import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import menuBackground from "../assets/images/menu.webp";
import { addmenuAPI } from "../Services/menuServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation Schema
const menuSchema = yup.object().shape({
  name: yup.string().required("Item name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().positive("Price must be positive").required("Price is required"),
  category: yup.string().required("Category is required"),
  availability: yup.boolean(),
  stock: yup.number().min(0, "Stock cannot be negative").required("Stock is required"),
  image: yup.mixed().required("Image is required"),
});

const MenuRegistration = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({ mutationFn: addmenuAPI });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      image: null,
      category: "",
      availability: true,
      stock: "",
    },
    validationSchema: menuSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("availability", values.availability ? "true" : "false");
      formData.append("stock", values.stock);

      if (values.image) {
        formData.append("image", values.image);
      }

      try {
        await mutateAsync(formData);
        toast.success(" Menu item added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        formik.resetForm();
      } catch (error) {
        toast.error(
          `❌ ${error?.response?.data?.message || "Something went wrong!"}`,
          { position: "top-center" }
        );
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${menuBackground})` }}
    >
      <ToastContainer />

      {/* Header */}
      <nav className="bg-gray-900 fixed top-0 w-full p-4 text-white shadow-md z-50">
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

      {/* Form Container */}
      <div
        className="absolute w-[30%] max-h-[80vh] overflow-y-auto backdrop-blur-2xl flex flex-col justify-start p-6 text-white rounded-lg shadow-lg"
        style={{ top: "15%", left: "35%" }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">Add Menu Item</h2>
          <p className="text-gray-300">Fill in the details below</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Item Name</label>
            <input
              type="text"
              name="name"
              {...formik.getFieldProps("name")}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 border border-gray-300 text-gray-900 placeholder-gray-500"
              placeholder="Enter item name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              name="description"
              {...formik.getFieldProps("description")}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 border border-gray-300 text-gray-900 placeholder-gray-500"
              placeholder="Enter description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Price</label>
            <input
              type="number"
              name="price"
              {...formik.getFieldProps("price")}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 border border-gray-300 text-gray-900 placeholder-gray-500"
              placeholder="Enter price"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.price}</p>
            )}
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) =>
                formik.setFieldValue("image", event.currentTarget.files[0])
              }
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 border border-gray-300 text-gray-900"
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.image}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Category</label>
            <select
              name="category"
              {...formik.getFieldProps("category")}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 border border-gray-300 text-gray-900"
            >
              <option value="">Select Category</option>
              {["Appetizer", "Main Course", "Dessert", "Beverage", "Side Dish"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.category}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Stock</label>
            <input
              type="number"
              name="stock"
              {...formik.getFieldProps("stock")}
              className="w-full px-4 py-2 rounded bg-white bg-opacity-30 border border-gray-300 text-gray-900 placeholder-gray-500"
              placeholder="Enter stock quantity"
            />
            {formik.touched.stock && formik.errors.stock && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.stock}</p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="availability"
              checked={formik.values.availability}
              onChange={(e) => formik.setFieldValue("availability", e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-gray-300">Available</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 text-white font-medium rounded-lg shadow-md transition-all duration-200 ${
              isLoading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Menu Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuRegistration;
