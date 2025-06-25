import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { Home, User, Bell, Utensils, Search } from "lucide-react";
import backgroundImage from "../assets/images/review-bg.webp";
import { reviewregAPI } from "../Services/customerServices";
import { toast, Toaster } from "react-hot-toast";

const ReviewRegistration = () => {
  const location = useLocation();
  const menuItemId = location.state?.menuItemId;

  if (!menuItemId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-center text-xl font-semibold">
          ❌ Menu item not found. Please return to orders and try again.
        </p>
      </div>
    );
  }

  const mutation = useMutation({
    mutationFn: reviewregAPI,
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      formik.resetForm();
    },
    onError: (error) => {
      toast.error("Failed to submit review. Please try again.");
      console.error("Review submission error:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
      categories: "",
    },
    onSubmit: (values) => {
      const formattedCategories = values.categories
        .split(",")
        .map((cat) => cat.trim());

      const payload = {
        comment: values.comment,
        rating: values.rating,
        categories: formattedCategories,
        menuItemId,
      };

      mutation.mutate(payload);
    },
  });

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <header className="bg-indigo-900 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold tracking-wide">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/customer/chome"><Home className="w-6 h-6 hover:text-gray-300" /></Link></li>
              <li><Link to="/employee/profileview"><User className="w-6 h-6 hover:text-gray-300" /></Link></li>
              <li><Link to="/customer/notifications"><Bell className="w-6 h-6 hover:text-gray-300" /></Link></li>
              <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6 hover:text-gray-300" /></Link></li>
              <li><Link to="/customer/search"><Search className="w-6 h-6 hover:text-gray-300" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div
        className="relative min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg- bg-opacity-40"></div>

        {/* Card */}
        <div className="relative z-10 bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <Link
  to="/customer/orders"
  className="inline-flex items-center gap-2 text-blue-600 border border-blue-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-600 hover:text-white transition duration-300 mb-6"
>
  ← Back to Orders
</Link>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Submit a Review
          </h1>
          <p className="text-center text-gray-500 text-sm mb-6">
            We'd love to hear your feedback!
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Comment */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Comment</label>
              <textarea
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Write your thoughts..."
                rows="4"
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Rating (0–10)</label>
              <input
                type="number"
                name="rating"
                value={formik.values.rating}
                onChange={formik.handleChange}
                min="0"
                max="10"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Categories (comma-separated)
              </label>
              <input
                type="text"
                name="categories"
                value={formik.values.categories}
                onChange={formik.handleChange}
                placeholder="e.g., Service, Ambience, Food Quality"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {mutation.isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewRegistration;
