import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetAPI } from "../Services/userServices";
import backgroundImage from "../assets/images/img3.jpg";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: resetAPI,
    mutationKey: ["Reset-Password"],
  });

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      await mutateAsync({
        email: email,
        token: token,
        newPassword: password,
      });
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form
        onSubmit={handleReset}
        className="bg-white bg-opacity-90 shadow-md p-8 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
        {message && (
          <p className="text-center text-red-500 mt-2 font-medium">{message}</p>
        )}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          ⬅ Back to Login
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
