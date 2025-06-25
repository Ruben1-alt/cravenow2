import React, { useState } from 'react';

const CartRegistration = () => {
  const [formData, setFormData] = useState({
    user: '',
    items: [{ menuItem: '', quantity: 1 }],
    totalAmount: 0
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = name === 'quantity' ? parseInt(value) : value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { menuItem: '', quantity: 1 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Cart:", formData);
    alert("Cart Registered Successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Cart Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input type="text" name="user" value={formData.user} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <label className="block text-gray-700">Menu Item ID</label>
              <input type="text" name="menuItem" value={item.menuItem} onChange={(e) => handleItemChange(index, e)} className="w-full p-2 border rounded" required />
              <label className="block text-gray-700 mt-2">Quantity</label>
              <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} className="w-full p-2 border rounded" required min="1" />
            </div>
          ))}

          <button type="button" onClick={addItem} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-4">Add Item</button>
          
          <div className="mb-4">
            <label className="block text-gray-700">Total Amount</label>
            <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className="w-full p-2 border rounded" required min="0" step="0.01" />
          </div>

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">Register Cart</button>
        </form>
      </div>
    </div>
  );
};

export default CartRegistration;
