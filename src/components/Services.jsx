import React from "react";
import { Link } from "react-router-dom";
import customerServiceImg from "../assets/images/servicecust.webp";
import restaurantServiceImg from "../assets/images/servicerest1.webp";
import techServiceImg from "../assets/images/servicetech.webp";
import headingImg from "../assets/images/services.webp";

const Navbar = () => (
  <nav className="bg-gray-900 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">CraveNow</h1>
      <ul className="flex space-x-6">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/restaurants" className="hover:text-yellow-400">Restaurant</Link>
        <Link to="/services" className="hover:text-yellow-400">Services</Link>
        <Link to="/about" className="hover:text-yellow-400">About us</Link>
        <Link to="/login" className="hover:text-yellow-400">Login</Link>
      </ul>
    </div>
  </nav>
);

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className="relative bg-cover bg-center rounded-3xl overflow-hidden shadow-xl h-72 flex items-center justify-center"
          style={{ backgroundImage: `url(${headingImg})` }}
        >
          <h1 className="text-white text-5xl font-extrabold bg-black bg-opacity-50 px-6 py-3 rounded-lg">
            Our Services
          </h1>
        </div>
        
        <div className="bg-white mt-12 p-12 rounded-2xl shadow-lg">
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
            CraveNow enhances the dining experience with seamless online ordering, innovative restaurant management,
            and advanced technology solutions tailored to modern needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <img src={customerServiceImg} alt="Customer Services" className="rounded-xl shadow-lg mx-auto mb-4 w-full h-56 object-cover" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Customer Services</h3>
              <ul className="text-gray-600 space-y-2 text-left mx-auto max-w-xs">
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Effortless online ordering</li>
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Personalized recommendations</li>
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Secure and diverse payments</li>
              </ul>
            </div>
            
            <div className="text-center">
              <img src={restaurantServiceImg} alt="Restaurant Services" className="rounded-xl shadow-lg mx-auto mb-4 w-full h-56 object-cover" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Restaurant Services</h3>
              <ul className="text-gray-600 space-y-2 text-left mx-auto max-w-xs">
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Management dashboard</li>
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Automated inventory tracking</li>
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Multi-location support</li>
              </ul>
            </div>
            
            <div className="text-center">
              <img src={techServiceImg} alt="Technology Services" className="rounded-xl shadow-lg mx-auto mb-4 w-full h-56 object-cover" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Technology Services</h3>
              <ul className="text-gray-600 space-y-2 text-left mx-auto max-w-xs">
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Advanced web technology</li>
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Real-time order tracking</li>
                <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Scalable secure infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;