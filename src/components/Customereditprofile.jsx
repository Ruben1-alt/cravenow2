import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User, Bell, Utensils, Search, Home } from "lucide-react";
import backgroundImage from "../assets/images/custpro.webp";
import { custprofileAPI, custeditAPI, changepasswordAPI,  } from "../Services/customerServices";
import { Link } from "react-router-dom";

const CustomerEditProfile = () => {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["customerProfile"],
    queryFn: custprofileAPI,
  });

  const customerData = data?.user;

  const updateProfileMutation = useMutation({
    mutationFn: custeditAPI,
    onSuccess: () => {
      alert("Profile updated successfully!");
      navigate("/employee/profileview");
    },
    onError: () => {
      alert("Failed to update profile. Please try again.");
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changepasswordAPI,
    onSuccess: () => {
      alert("Password changed successfully!");
      setShowPasswordModal(false);
    },
    onError: (err) => {
      setPasswordError("Incorrect old password");
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: customerData?.username || "",
      phone: customerData?.phone || "",
      address: customerData?.address || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3).max(20).required(),
      phone: Yup.string().matches(/^\+?\d{10,15}$/, "Invalid phone number").required(),
      address: Yup.string().required(),
    }),
    onSubmit: (values) => {
      updateProfileMutation.mutate(values);
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string().min(6, "New password must be at least 6 characters").required(),
    }),
    onSubmit: (values) => {
      setPasswordError("");
      changePasswordMutation.mutate(values);
    },
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: `url(${backgroundImage}) center/cover no-repeat` }}>
      <header className="bg-indigo-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
            <li><Link to="/customer/chome" className="hover:underline"><Home className="w-6 h-6" /></Link></li>
              <li><Link to="/employee/profileview"><User className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/notifications"><Bell className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/search"><Search className="w-6 h-6" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Edit Profile</h1>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label>Username</label>
              <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} className="w-full p-3 border rounded-lg" />
            </div>
            <div>
              <label>Address</label>
              <textarea name="address" value={formik.values.address} onChange={formik.handleChange} className="w-full p-3 border rounded-lg h-24" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">Save Changes</button>
            <button type="button" onClick={() => setShowPasswordModal(true)} className="w-full bg-yellow-500 text-white py-3 rounded-lg">Change Password</button>
            <button type="button" onClick={() => navigate("/employee/profileview")} className="w-full bg-gray-500 text-white py-3 rounded-lg">Cancel</button>
          </form>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={passwordFormik.handleSubmit}>
              <div>
                <label>Old Password</label>
                <input type="password" name="oldPassword" value={passwordFormik.values.oldPassword} onChange={passwordFormik.handleChange} className="w-full p-3 border rounded-lg" />
              </div>
              <div>
                <label>New Password</label>
                <input type="password" name="newPassword" value={passwordFormik.values.newPassword} onChange={passwordFormik.handleChange} className="w-full p-3 border rounded-lg" />
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}<br/>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">Update Password</button>
              <button type="button" onClick={() => setShowPasswordModal(false)} className="w-full bg-gray-600 text-white py-2 rounded-lg mt-2">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerEditProfile;