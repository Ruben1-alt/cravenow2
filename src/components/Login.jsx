import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import loginBg from "../assets/images/loginn.webp";
import { loginAPI } from "../Services/userServices";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../REDUX/userSlice";
import { jwtDecode } from "jwt-decode";

// Validation Schema using Yup
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["UserLogin"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
        const token = await mutateAsync(values);
        sessionStorage.setItem("userToken", token);
        const decodedData = jwtDecode(token);
        dispatch(loginUserAction(decodedData));
        action.resetForm();

        setTimeout(() => {
          if (decodedData.role === "customer") {
            navigate("/customer/chome");
          } else if (decodedData.role === "employee") {
            navigate("/employee/employeehome");
          } else {
            navigate("/admin/dashboard");
          }
        }, 100);
      } catch (error) {
        setSuccessMessage(null);
        setErrorMessage(error?.response?.data?.message || "Invalid email or password.");
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Home Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          ← Home
        </button>
      </div>

      <div className="absolute w-[26%] h-[49%] backdrop-blur-2xl flex flex-col justify-center p-6 text-white" style={{ top: "30%", left: "38.5%" }}>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">Welcome Back</h2>
          <p className="mt-2">Login to access your account.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input + Forgot Link */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...formik.getFieldProps("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}

            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => navigate("/forgotpassword")}
                className="text-xs text-indigo-300 hover:text-indigo-100 underline"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? "bg-indigo-300 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">{errorMessage}</div>
        )}

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Sign up
            </button>
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
