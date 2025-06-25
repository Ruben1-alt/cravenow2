import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import backgroundImage from "../assets/images/managerduty.webp";
import { detailmenuAPI, menueditAPI } from "../Services/menuServices";

const menuEditSchema = yup.object().shape({
  name: yup.string().required("Item name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
});

const MenuEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => detailmenuAPI(id),
  });

  const { mutateAsync: editMenuItem, isLoading: isSubmitting } = useMutation({
    mutationFn: menueditAPI,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
    },
    validationSchema: menuEditSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        if (imageFile) {
          formData.append("image", imageFile);
        }

        await editMenuItem(formData);
        alert("✅ Menu item updated successfully!");
        navigate("/employee/employeehome");
      } catch (error) {
        alert(error?.response?.data?.message || "Update failed!");
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      });
      setPreview(data.image); // show current image
    }
  }, [data]);

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-gray-800"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header */}
      <header className="bg-gray-900 bg-opacity-90 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <h1 className="text-3xl font-bold tracking-wide">🍽️ CraveNow Manager</h1>
          <div className="flex space-x-4">
            <button onClick={() => navigate("/employee/employeehome")} className="hover:bg-teal-700 bg-teal-600 px-4 py-2 rounded-xl transition font-medium">🏠 Home</button>
            <button onClick={() => navigate("/employee/empprofileview")} className="hover:bg-gray-800 bg-gray-700 px-4 py-2 rounded-xl transition font-medium">🧑‍ Profile</button>
            <button onClick={() => navigate("/employee/attendancemark")} className="hover:bg-gray-800 bg-gray-700 px-4 py-2 rounded-xl transition font-medium">⏰ Attendance</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto mt-12 bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">✏️ Edit Menu Item</h2>

        {isLoading ? (
          <p className="text-center text-gray-600 text-lg">Loading item...</p>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                {...formik.getFieldProps("name")}
                className="w-full p-3 border rounded-md shadow-sm"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                {...formik.getFieldProps("description")}
                rows={3}
                className="w-full p-3 border rounded-md shadow-sm"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                {...formik.getFieldProps("price")}
                className="w-full p-3 border rounded-md shadow-sm"
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                {...formik.getFieldProps("stock")}
                className="w-full p-3 border rounded-md shadow-sm"
              />
              {formik.touched.stock && formik.errors.stock && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.stock}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-md"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mt-2"
                />
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 font-semibold text-white rounded-lg transition ${
                isSubmitting ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Item"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default MenuEdit;
