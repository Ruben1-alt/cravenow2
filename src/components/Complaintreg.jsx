import React from "react";
import { Link } from "react-router-dom";
import { Home, User, Bell, Utensils, Search, ArrowLeft } from "lucide-react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import backgroundImage from "../assets/images/complaintback.webp";
import { complaintregAPI } from "../Services/customerServices";
import { Toaster, toast } from "react-hot-toast";

const ComplaintRegistration = () => {
  const mutation = useMutation({
    mutationFn: complaintregAPI,
    onSuccess: () => {
      toast.success("✅ Complaint registered successfully!");
      formik.resetForm();
    },
    onError: (error) => {
      toast.error("❌ Failed to register complaint. Please try again.");
      console.error("Complaint Error:", error);
    },
  });

  const formik = useFormik({
    initialValues: {
      user: "", // Might be populated via context/session
      subject: "",
      description: "",
    },
    onSubmit: (values) => {
      const payload = {
        ...values,
        status: "Pending",
        response: "",
      };
      mutation.mutate(payload);
    },
  });

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <header className="bg-indigo-900 bg-opacity-90 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/customer/chome"><Home className="w-6 h-6" /></Link></li>
              <li><Link to="/employee/profileview"><User className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/notifications"><Bell className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/search"><Search className="w-6 h-6" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-lg">

          {/* Back Button */}
          {/* <Link
            to="/customer/chome"
            className="inline-flex items-center gap-2 text-indigo-600 border border-indigo-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-indigo-600 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link> */}

          {/* Title and Subtitle */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Submit a Complaint
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            We're here to help! Let us know your concern.
          </p>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Description</label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 h-32 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isLoading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
            >
              {mutation.isLoading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ComplaintRegistration;
