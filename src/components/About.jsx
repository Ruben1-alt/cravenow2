import React from "react";
import { Link } from "react-router-dom";
// import img from '../assets/images/about.webp';
import customerImg from '../assets/images/aboutcust.webp';
import restaurantImg from '../assets/images/aboutrest.webp';
import technologyImg from '../assets/images/aboutbuilt.webp';
import headingImg from '../assets/images/restaurant.webp';

const Navbar = () => (
  <nav className="bg-gray-900 text-white p-4 shadow-md fixed w-full z-10 top-0">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-extrabold">CraveNow</h1>
      <ul className="flex space-x-6 text-white font-medium">
        <Link to='/' className="hover:text-yellow-400 transition duration-300"><li>Home</li></Link>
        <Link to='/restaurants' className="hover:text-yellow-400 transition duration-300"><li>Restaurant</li></Link>
        <Link to='/services' className="hover:text-yellow-400 transition duration-300"><li>Services</li></Link>
        <Link to='/about' className="hover:text-yellow-400 transition duration-300"><li>About us</li></Link>
        <Link to='/login' className="hover:text-yellow-400 transition duration-300"><li>Login</li></Link>
      </ul>
    </div>
  </nav>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 pb-12 pt-20">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="relative bg-cover bg-center rounded-3xl overflow-hidden shadow-xl" style={{ backgroundImage: `url(${headingImg})`, height: "400px" }}>
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-5xl font-extrabold p-4 rounded-lg">About Us</h1>
          </div>
        </div>
        <div className="bg-white mt-8 p-8 rounded-2xl shadow-md">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            CraveNow is a next-generation web application designed to transform the dining experience for customers while equipping restaurants with powerful management tools. Whether you're a food lover looking for a seamless ordering experience or a restaurant aiming for efficiency, CraveNow provides a modern, responsive, and user-friendly solution.
          </p>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose CraveNow?</h2>
          <p className="text-gray-600 mb-6">
            CraveNow enhances dining convenience, streamlines restaurant operations, and delivers real-time insights to optimize service quality. Our platform is built with cutting-edge technology to ensure reliability, speed, and security.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <img src={customerImg} alt="Customer Experience" className="rounded-lg shadow-md mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">For Customers</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-3 text-left">
                <li><strong>Browse Menus:</strong> Explore categorized menus with rich descriptions and images.</li>
                <li><strong>Customize Orders:</strong> Choose portion sizes, add-ons, and dietary preferences.</li>
                <li><strong>Real-Time Order Tracking:</strong> Stay updated from placement to delivery.</li>
                <li><strong>Personalized Experience:</strong> Save favorites, view history, and manage payments.</li>
                <li><strong>Instant Notifications:</strong> Get updates on orders, promotions, and recommendations.</li>
                <li><strong>Secure Payments:</strong> Multiple payment options with robust encryption.</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <img src={restaurantImg} alt="Restaurant Management" className="rounded-lg shadow-md mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">For Restaurants</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-3 text-left">
                <li><strong>Comprehensive Dashboard:</strong> Manage orders, inventory, and payments effortlessly.</li>
                <li><strong>Business Insights:</strong> Access real-time analytics on sales and peak hours.</li>
                <li><strong>Automated Inventory Management:</strong> Get low-stock alerts to prevent shortages.</li>
                <li><strong>Multi-Location Support:</strong> Manage multiple branches with ease.</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <img src={technologyImg} alt="Technology" className="rounded-lg shadow-md mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">Built with Cutting-Edge Technology</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-3 text-left">
                <li><strong>Modern Stack:</strong> Powered by React.js, Node.js, and WebSocket for scalability.</li>
                <li><strong>Real-Time Updates:</strong> Instant communication for orders and inventory.</li>
              </ul>
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed mt-6 text-center">
            CraveNow is more than just an app—it's a complete solution that enhances customer satisfaction and optimizes restaurant efficiency. Join us in modernizing the dining experience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
