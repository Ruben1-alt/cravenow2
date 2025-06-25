import React, { useState } from 'react';

const NotificationRegistration = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    message: '',
    isRead: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Notification:", formData);
    alert("Notification Registered Successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Notification Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Recipient ID</label>
            <input type="text" name="recipient" value={formData.recipient} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" name="isRead" checked={formData.isRead} onChange={handleChange} className="mr-2" />
            <label className="text-gray-700">Mark as Read</label>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Register Notification</button>
        </form>
      </div>
    </div>
  );
};

export default NotificationRegistration;
