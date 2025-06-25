import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import signupBg from "../assets/images/signupp.webp";
import { loginUserAction } from "../REDUX/userSlice";
import { registerAPI } from "../Services/userServices";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const signupSchema = yup.object().shape({
  username: yup.string().min(5, "Username must be at least 5 characters").required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
  phone: yup.string(),
  address: yup.string(),
  role: yup.string().required("Role is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["UserSignup"],
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
      phone: "",
      address: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, action) => {
      try {
        const token = await mutateAsync(values);
        sessionStorage.setItem("userToken", token);
        const decodedData = jwtDecode(token);
        dispatch(loginUserAction(decodedData));
        action.resetForm();
        toast.success("🎉 Customer registered successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/login"), 3200); // Slight delay to allow toast display
      } catch (error) {
        console.error(error);
        toast.error("❌ Registration failed. Please try again.");
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${signupBg})` }}
    >
      {/* Toast container */}
      <ToastContainer />

      {/* Signup Form Box */}
      <div
        className="absolute w-[27%] h-auto backdrop-blur-2xl flex flex-col justify-center p-5 text-white rounded-lg shadow-lg"
        style={{ top: "1%", left: "40%" }}
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Create Your Account</h2>
        <p className="text-gray-300 text-center mb-4">Join us and experience seamless service</p>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          {["username", "email", "password", "confirmPassword", "phone", "address"].map((field, index) => {
            const isPasswordField = field === "password" || field === "confirmPassword";
            return (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-300 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={isPasswordField ? "password" : "text"}
                  name={field}
                  {...formik.getFieldProps(field)}
                  className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-30 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-red-400 text-xs mt-1">{formik.errors[field]}</p>
                )}
              </div>
            );
          })}

          <div>
            <label className="block text-sm font-medium text-gray-300">Role</label>
            <select
              name="role"
              {...formik.getFieldProps("role")}
              className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-30 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            >
              {["customer"].map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 text-white font-medium rounded-lg shadow-md transition-all duration-200 ${
              isLoading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-300 text-center mt-3">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-indigo-300 hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
